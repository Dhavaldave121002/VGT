<?php
require_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    case 'GET':
        // Get all team members
        try {
            // Check if table exists
            $check = $conn->query("SHOW TABLES LIKE 'teams'");
            if($check->rowCount() == 0) {
                // Initial Table Setup if missing
                $sql = "CREATE TABLE teams (
                    id INT(11) AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(255) NOT NULL,
                    role VARCHAR(255) NOT NULL,
                    bio TEXT,
                    image VARCHAR(500),
                    social_links TEXT, /* JSON string */
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )";
                $conn->exec($sql);
            }

            $stmt = $conn->prepare("SELECT * FROM teams ORDER BY created_at DESC");
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
            $stmt = $conn->prepare("INSERT INTO teams (name, role, bio, image, social_links) VALUES (?, ?, ?, ?, ?)");
            $success = $stmt->execute([
                $data['name'],
                $data['role'],
                $data['bio'],
                $data['image'],
                $data['social_links'] // Expecting JSON string from frontend
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
            $stmt = $conn->prepare("UPDATE teams SET name = ?, role = ?, bio = ?, image = ?, social_links = ? WHERE id = ?");
            $success = $stmt->execute([
                $data['name'],
                $data['role'],
                $data['bio'],
                $data['image'],
                $data['social_links'],
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
            $stmt = $conn->prepare("DELETE FROM teams WHERE id = ?");
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
