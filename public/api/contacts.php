<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS');
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
            $pdo->exec("CREATE TABLE IF NOT EXISTS contacts (
                id INT(11) AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255),
                email VARCHAR(255),
                subject VARCHAR(255),
                message TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )");

            $stmt = $pdo->query("SELECT * FROM contacts ORDER BY created_at DESC");
            $records = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($records);
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
            $stmt = $pdo->prepare("INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)");
            $success = $stmt->execute([
                $data['name'],
                $data['email'],
                $data['subject'],
                $data['message']
            ]);
            echo json_encode(["success" => $success, "id" => $pdo->lastInsertId()]);
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
            $stmt = $pdo->prepare("DELETE FROM contacts WHERE id = ?");
            $success = $stmt->execute([$_GET['id']]);
            echo json_encode(["success" => $success]);
        } catch(PDOException $e) {
            echo json_encode(["error" => $e->getMessage()]);
        }
        break;
}
?>
