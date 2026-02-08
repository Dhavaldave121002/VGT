<?php
ini_set('display_errors', 0);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

require_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    case 'GET':
        try {
            // Check/Create Table
            $conn->exec("CREATE TABLE IF NOT EXISTS leads (
                id INT(11) AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                service VARCHAR(255),
                date VARCHAR(50),
                status VARCHAR(50) DEFAULT 'New',
                priority VARCHAR(50) DEFAULT 'Medium',
                email VARCHAR(255),
                plan VARCHAR(100),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )");

            $stmt = $conn->prepare("SELECT * FROM leads ORDER BY id DESC");
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
            $service = $data['service'] ?? '';
            $date = $data['date'] ?? date('M d, Y');
            $status = $data['status'] ?? 'New';
            $priority = $data['priority'] ?? 'Medium';
            $email = $data['email'] ?? '';
            $plan = $data['plan'] ?? null;

            $stmt = $conn->prepare("INSERT INTO leads (name, service, date, status, priority, email, plan) VALUES (?, ?, ?, ?, ?, ?, ?)");
            $success = $stmt->execute([$name, $service, $date, $status, $priority, $email, $plan]);

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
            $id = $data['id'];
            $name = $data['name'] ?? '';
            $service = $data['service'] ?? '';
            $date = $data['date'] ?? '';
            $status = $data['status'] ?? 'New';
            $priority = $data['priority'] ?? 'Medium';
            $email = $data['email'] ?? '';
            $plan = $data['plan'] ?? null;

            $stmt = $conn->prepare("UPDATE leads SET name = ?, service = ?, date = ?, status = ?, priority = ?, email = ?, plan = ? WHERE id = ?");
            $success = $stmt->execute([$name, $service, $date, $status, $priority, $email, $plan, $id]);

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
            $stmt = $conn->prepare("DELETE FROM leads WHERE id = ?");
            $success = $stmt->execute([$_GET['id']]);
            echo json_encode(["success" => $success]);
        } catch(PDOException $e) {
            echo json_encode(["error" => $e->getMessage()]);
        }
        break;
}
?>
