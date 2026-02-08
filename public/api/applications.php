<?php
// Disable error reporting to output to client (prevents JSON corruption)
ini_set('display_errors', 0);
error_reporting(E_ALL);

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once 'db_connect.php';

$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    case 'GET':
        try {
            // Direct query to the existing table
            $stmt = $pdo->prepare("SELECT * FROM job_applications ORDER BY id DESC");
            $stmt->execute();
            $records = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            $mappedRecords = [];
            foreach ($records as $record) {
                // Safely extract fields with defaults
                $mappedRecords[] = [
                    'id' => (int)$record['id'],
                    'name' => $record['name'],
                    'email' => $record['email'] ?? '',
                    'phone' => $record['phone'] ?? '',
                    'jobTitle' => $record['jobTitle'] ?? 'General Application', 
                    'jobType' => $record['jobType'] ?? '',
                    'status' => $record['status'] ?? 'New',
                    'message' => $record['message'] ?? '',
                    'submittedAt' => $record['submittedAt'] ?? date('Y-m-d H:i:s'),
                    'resumeData' => $record['resumeData'] ?? null,
                    'resumeFileName' => $record['resumeFileName'] ?? null
                ];
            }
            
            echo json_encode($mappedRecords);
        } catch(PDOException $e) {
             // Return array to avoid frontend crash, but log error if possible
             echo json_encode([]);
        }
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"), true);
        if (!$data) {
            echo json_encode(["error" => "Invalid data"]);
            break;
        }

        try {
            $name = $data['name'] ?? '';
            $email = $data['email'] ?? '';
            $phone = $data['phone'] ?? '';
            $jobId = $data['jobId'] ?? 0;
            $jobTitle = $data['jobTitle'] ?? '';
            $jobType = $data['jobType'] ?? '';
            $message = $data['message'] ?? '';
            $resumeData = $data['resumeData'] ?? null;
            $resumeFileName = $data['resumeFileName'] ?? null;
            $status = $data['status'] ?? 'New';
            $submittedAt = $data['submittedAt'] ?? date('Y-m-d H:i:s');
            
            // Handle File Upload (Base64 to File System) to avoid max_allowed_packet
            if ($resumeData && strpos($resumeData, 'base64,') !== false) {
                // Extract base64 data
                list($type, $dataContent) = explode(';', $resumeData);
                list(, $dataContent)      = explode(',', $dataContent);
                $decodedData = base64_decode($dataContent);
                
                if ($decodedData !== false) {
                     // Ensure upload directory exists
                     $uploadDir = '../uploads/resumes/';
                     if (!file_exists($uploadDir)) {
                         mkdir($uploadDir, 0777, true);
                     }
                     
                     // Create unique filename
                     $filename = uniqid() . '_' . str_replace(' ', '_', $resumeFileName);
                     $filePath = $uploadDir . $filename;
                     
                     if (file_put_contents($filePath, $decodedData)) {
                         // Store relative path in DB
                         $resumeData = 'uploads/resumes/' . $filename;
                     } else {
                         // Fallback or error log
                         $resumeData = null; 
                     }
                }
            } elseif ($resumeData && strlen($resumeData) > 255) {
                // If it's still a long string but not base64 formatted (unlikely from frontend)
                // or if it was already a path, leave it. 
                // But if it's raw base64 without prefix:
                $decodedData = base64_decode($resumeData, true);
                if($decodedData) {
                     $uploadDir = '../uploads/resumes/';
                     if (!file_exists($uploadDir)) {
                         mkdir($uploadDir, 0777, true);
                     }
                     $filename = uniqid() . '_' . ($resumeFileName ? str_replace(' ', '_', $resumeFileName) : 'resume.file');
                     $filePath = $uploadDir . $filename;
                     file_put_contents($filePath, $decodedData);
                     $resumeData = 'uploads/resumes/' . $filename;
                }
            }

            $stmt = $pdo->prepare("INSERT INTO job_applications (jobId, jobTitle, jobType, name, email, phone, message, resumeData, resumeFileName, status, submittedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
            $success = $stmt->execute([
                $jobId, $jobTitle, $jobType, $name, $email, $phone, $message, $resumeData, $resumeFileName, $status, $submittedAt
            ]);

            echo json_encode(["success" => $success, "id" => $pdo->lastInsertId()]);
        } catch(PDOException $e) {
            echo json_encode(["error" => $e->getMessage()]);
        }
        break;

    case 'PUT':
        $data = json_decode(file_get_contents("php://input"), true);
        if (!$data || !isset($data['id'])) {
            echo json_encode(["error" => "Invalid data or missing ID"]);
            break;
        }

        try {
            $fields = [];
            $params = [];
            
            $allowed = ['jobId', 'jobTitle', 'jobType', 'name', 'email', 'phone', 'message', 'status', 'resumeData', 'resumeFileName', 'submittedAt'];
            
            foreach ($allowed as $field) {
                if (isset($data[$field])) {
                    $fields[] = "$field = ?";
                    $params[] = $data[$field];
                }
            }

            if (empty($fields)) {
                 echo json_encode(["success" => true, "message" => "No fields to update"]);
                 break;
            }

            $params[] = $data['id'];
            $sql = "UPDATE job_applications SET " . implode(", ", $fields) . " WHERE id = ?";
            
            $stmt = $pdo->prepare($sql);
            $success = $stmt->execute($params);

            echo json_encode(["success" => $success]);
        } catch(PDOException $e) {
             echo json_encode(["error" => $e->getMessage()]);
        }
        break;

    case 'DELETE':
        if (!isset($_GET['id'])) {
            echo json_encode(["error" => "Missing ID"]);
            break;
        }

        try {
            $stmt = $pdo->prepare("DELETE FROM job_applications WHERE id = ?");
            $success = $stmt->execute([$_GET['id']]);
            echo json_encode(["success" => $success]);
        } catch(PDOException $e) {
            echo json_encode(["error" => $e->getMessage()]);
        }
        break;

    default:
        echo json_encode(["error" => "Method not allowed"]);
        break;
}
?>
