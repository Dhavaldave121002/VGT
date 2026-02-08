<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once 'db_connect.php';

$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    case 'GET':
        try {
            // Check if table exists
            $check = $pdo->query("SHOW TABLES LIKE 'tech_stack'");
            if($check->rowCount() == 0) {
                 $sql = "CREATE TABLE tech_stack (
                    id INT(11) AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(255) NOT NULL,
                    icon VARCHAR(100),
                    color VARCHAR(100),
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )";
                $pdo->exec($sql);
            }

            $stmt = $pdo->prepare("SELECT * FROM tech_stack ORDER BY id DESC");
            $stmt->execute();
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            // Cast ID to int
            $data = [];
            foreach($result as $row) {
                $row['id'] = (int)$row['id'];
                $data[] = $row;
            }
            
            echo json_encode($data);
        } catch(PDOException $e) {
             echo json_encode(["error" => $e->getMessage()]);
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
            $icon = $data['icon'] ?? '';
            $color = $data['color'] ?? '';

            $stmt = $pdo->prepare("INSERT INTO tech_stack (name, icon, color) VALUES (?, ?, ?)");
            $success = $stmt->execute([$name, $icon, $color]);

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
            $id = $data['id'];
            $name = $data['name'] ?? '';
            $icon = $data['icon'] ?? '';
            $color = $data['color'] ?? '';

            $stmt = $pdo->prepare("UPDATE tech_stack SET name = ?, icon = ?, color = ? WHERE id = ?");
            $success = $stmt->execute([$name, $icon, $color, $id]);

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
            $stmt = $pdo->prepare("DELETE FROM tech_stack WHERE id = ?");
            $success = $stmt->execute([$_GET['id']]);
            echo json_encode(["success" => $success]);
        } catch(PDOException $e) {
            echo json_encode(["error" => $e->getMessage()]);
        }
        break;
}
?>
