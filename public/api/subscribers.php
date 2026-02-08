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
            $pdo->exec("CREATE TABLE IF NOT EXISTS subscribers (
                id INT(11) AUTO_INCREMENT PRIMARY KEY,
                email VARCHAR(255) NOT NULL UNIQUE,
                status VARCHAR(50) DEFAULT 'Active',
                subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )");

            $stmt = $pdo->query("SELECT * FROM subscribers ORDER BY subscribed_at DESC");
            $records = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($records);
        } catch(PDOException $e) {
             echo json_encode(["error" => $e->getMessage()]);
        }
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"), true);
        if (!$data || !isset($data['email'])) {
            echo json_encode(["error" => "Email required"]);
            break;
        }

        try {
            // Check existence
            $check = $pdo->prepare("SELECT id FROM subscribers WHERE email = ?");
            $check->execute([$data['email']]);
            if ($check->fetch()) {
                // Already subscribed, maybe update status?
                $update = $pdo->prepare("UPDATE subscribers SET status = 'Active', subscribed_at = CURRENT_TIMESTAMP WHERE email = ?");
                $update->execute([$data['email']]);
                echo json_encode(["success" => true, "message" => "Subscription reactivated"]);
            } else {
                $stmt = $pdo->prepare("INSERT INTO subscribers (email, status) VALUES (?, ?)");
                $success = $stmt->execute([
                    $data['email'],
                    $data['status'] ?? 'Active'
                ]);
                echo json_encode(["success" => $success, "id" => $pdo->lastInsertId()]);
            }
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
            $stmt = $pdo->prepare("DELETE FROM subscribers WHERE id = ?");
            $success = $stmt->execute([$_GET['id']]);
            echo json_encode(["success" => $success]);
        } catch(PDOException $e) {
            echo json_encode(["error" => $e->getMessage()]);
        }
        break;
}
?>
