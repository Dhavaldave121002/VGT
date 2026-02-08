<?php
require_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    case 'GET':
        // Get all users
        try {
            // Check if table exists first (optional, but good for first run)
            $check = $conn->query("SHOW TABLES LIKE 'users'");
            if($check->rowCount() == 0) {
                // Initial Table Setup if missing
                $sql = "CREATE TABLE users (
                    id INT(11) AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(255) NOT NULL,
                    email VARCHAR(255) NOT NULL,
                    actualEmail VARCHAR(255) NULL,
                    password VARCHAR(255) NOT NULL,
                    role VARCHAR(50) DEFAULT 'Editor',
                    clearance VARCHAR(50) DEFAULT 'L3',
                    status VARCHAR(50) DEFAULT 'Offline',
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )";
                $conn->exec($sql);
                
                // Create Default Admin if empty
                $stmt = $conn->prepare("INSERT INTO users (name, email, actualEmail, password, role, clearance, status) VALUES (?, ?, ?, ?, ?, ?, ?)");
                $stmt->execute(['Admin', 'admin@vgt.tech', 'connectvertexglobal2209@gmail.com', 'admin123', 'Super Admin', 'L5', 'Online']);
            }

            $stmt = $conn->prepare("SELECT * FROM users ORDER BY created_at DESC");
            $stmt->execute();
            $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            // Cast IDs to int
            foreach ($users as &$user) {
                $user['id'] = (int)$user['id'];
            }
            
            echo json_encode($users);
        } catch(PDOException $e) {
             // Fallback or error
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
            $stmt = $conn->prepare("INSERT INTO users (name, email, actualEmail, password, role, clearance, status) VALUES (?, ?, ?, ?, ?, ?, ?)");
            $success = $stmt->execute([
                $data['name'],
                $data['email'], // System email
                $data['actualEmail'],
                $data['password'],
                $data['role'],
                $data['clearance'],
                $data['status'] ?? 'Offline'
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
            $stmt = $conn->prepare("UPDATE users SET name = ?, email = ?, actualEmail = ?, password = ?, role = ?, clearance = ?, status = ? WHERE id = ?");
            $success = $stmt->execute([
                $data['name'],
                $data['email'],
                $data['actualEmail'],
                $data['password'],
                $data['role'],
                $data['clearance'],
                $data['status'],
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
            $stmt = $conn->prepare("DELETE FROM users WHERE id = ?");
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
