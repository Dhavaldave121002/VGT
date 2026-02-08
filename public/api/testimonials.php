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
        // Get all testimonials
        try {
            // Check if table exists
            $check = $pdo->query("SHOW TABLES LIKE 'testimonials'");
            if($check->rowCount() == 0) {
                // Initial Table Setup if missing
                $sql = "CREATE TABLE testimonials (
                    id INT(11) AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(255) NOT NULL,
                    role VARCHAR(255) NOT NULL,
                    message TEXT NOT NULL,
                    avatar VARCHAR(500) NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )";
                $pdo->exec($sql);
            }

            $stmt = $pdo->prepare("SELECT * FROM testimonials ORDER BY created_at DESC");
            $stmt->execute();
            $records = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            // Cast IDs
            foreach ($records as &$record) {
                $record['id'] = (int)$record['id'];
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
            $stmt = $pdo->prepare("INSERT INTO testimonials (name, role, message, avatar) VALUES (?, ?, ?, ?)");
            $success = $stmt->execute([
                $data['name'],
                $data['role'],
                $data['message'],
                $data['avatar'] ?? ''
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
            $stmt = $pdo->prepare("UPDATE testimonials SET name = ?, role = ?, message = ?, avatar = ? WHERE id = ?");
            $success = $stmt->execute([
                $data['name'],
                $data['role'],
                $data['message'],
                $data['avatar'] ?? '',
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
            $stmt = $pdo->prepare("DELETE FROM testimonials WHERE id = ?");
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
