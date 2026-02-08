<?php
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
            $stmt = $pdo->prepare("SELECT * FROM jobs ORDER BY created_at DESC");
            $stmt->execute();
            $records = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            foreach ($records as &$record) {
                // Cast ID
                $record['id'] = (int)$record['id'];
                
                // Decode JSON fields if they are strings (Database stores them as JSON string)
                // If they are null, return empty array equivalent
                $record['skills'] = $record['skills'] ?? '[]'; 
                $record['responsibilities'] = $record['responsibilities'] ?? '[]';
                $record['qualifications'] = $record['qualifications'] ?? '[]';
                
                // Map 'about' if missing, just in case
                if (empty($record['about']) && !empty($record['description'])) {
                    $record['about'] = $record['description'];
                }
            }
            
            echo json_encode($records);
        } catch(PDOException $e) {
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
            $stmt = $pdo->prepare("INSERT INTO jobs (title, type, location, seniority, about, skills, responsibilities, qualifications) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
            
            // Encode arrays to JSON strings
            $skills = is_array($data['skills'] ?? []) ? json_encode($data['skills']) : ($data['skills'] ?? '[]');
            $resp = is_array($data['responsibilities'] ?? []) ? json_encode($data['responsibilities']) : ($data['responsibilities'] ?? '[]');
            $qual = is_array($data['qualifications'] ?? []) ? json_encode($data['qualifications']) : ($data['qualifications'] ?? '[]');
            
            $success = $stmt->execute([
                $data['title'],
                $data['type'],
                $data['location'],
                $data['seniority'],
                $data['about'] ?? '',
                $skills,
                $resp,
                $qual
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
            // Check rows to see if we update by ID
            // Using same fields as POST
            
            $sql = "UPDATE jobs SET title = ?, type = ?, location = ?, seniority = ?, about = ?, skills = ?, responsibilities = ?, qualifications = ? WHERE id = ?";
            $stmt = $pdo->prepare($sql);
            
            $skills = is_array($data['skills'] ?? []) ? json_encode($data['skills']) : ($data['skills'] ?? '[]');
            $resp = is_array($data['responsibilities'] ?? []) ? json_encode($data['responsibilities']) : ($data['responsibilities'] ?? '[]');
            $qual = is_array($data['qualifications'] ?? []) ? json_encode($data['qualifications']) : ($data['qualifications'] ?? '[]');

            $success = $stmt->execute([
                $data['title'],
                $data['type'],
                $data['location'],
                $data['seniority'],
                $data['about'] ?? '',
                $skills,
                $resp,
                $qual,
                $data['id']
            ]);

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
            $stmt = $pdo->prepare("DELETE FROM jobs WHERE id = ?");
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
