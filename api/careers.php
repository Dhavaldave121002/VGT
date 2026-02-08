<?php
require_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    case 'GET':
        // Get all careers/jobs
        try {
            // Check if table exists
            $check = $conn->query("SHOW TABLES LIKE 'careers'");
            if($check->rowCount() == 0) {
                // Initial Table Setup if missing
                $sql = "CREATE TABLE careers (
                    id INT(11) AUTO_INCREMENT PRIMARY KEY,
                    title VARCHAR(255) NOT NULL,
                    department VARCHAR(255) NOT NULL,
                    type VARCHAR(100) NOT NULL,
                    status VARCHAR(50) DEFAULT 'Active',
                    applicants INT(11) DEFAULT 0,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )";
                $conn->exec($sql);

                // Seed Data
                $stmt = $conn->prepare("INSERT INTO careers (title, department, type, status, applicants) VALUES (?, ?, ?, ?, ?)");
                $stmt->execute(['Senior React Developer', 'Engineering', 'Full-time', 'Active', 12]);
                $stmt->execute(['UI/UX Designer', 'Design', 'Remote', 'Active', 8]);
                $stmt->execute(['Backend Architect', 'Engineering', 'Full-time', 'Closed', 24]);
            }

            $stmt = $conn->prepare("SELECT * FROM careers ORDER BY created_at DESC");
            $stmt->execute();
            $records = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            // Cast IDs and Ints
            foreach ($records as &$record) {
                $record['id'] = (int)$record['id'];
                $record['applicants'] = (int)$record['applicants'];
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
            $stmt = $conn->prepare("INSERT INTO careers (title, department, type, status, applicants) VALUES (?, ?, ?, ?, ?)");
            $success = $stmt->execute([
                $data['title'],
                $data['department'],
                $data['type'],
                $data['status'] ?? 'Active',
                $data['applicants'] ?? 0
            ]);

            echo json_encode(["success" => $success, "id" => $conn->lastInsertId()]);
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
            $stmt = $conn->prepare("UPDATE careers SET title = ?, department = ?, type = ?, status = ?, applicants = ? WHERE id = ?");
            $success = $stmt->execute([
                $data['title'],
                $data['department'],
                $data['type'],
                $data['status'],
                $data['applicants'],
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
            $stmt = $conn->prepare("DELETE FROM careers WHERE id = ?");
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
