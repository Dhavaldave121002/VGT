<?php
ini_set('display_errors', 0);
error_reporting(E_ALL);

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
            // Check/Create Table
            $pdo->exec("CREATE TABLE IF NOT EXISTS site_config (
                id INT(11) AUTO_INCREMENT PRIMARY KEY,
                config_key VARCHAR(255) UNIQUE NOT NULL,
                config_value LONGTEXT,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )");

            if (!isset($_GET['key'])) {
                echo json_encode(["error" => "Missing key parameter"]);
                break;
            }

            $key = $_GET['key'];
            $stmt = $pdo->prepare("SELECT config_value FROM site_config WHERE config_key = ?");
            $stmt->execute([$key]);
            $result = $stmt->fetch(PDO::FETCH_ASSOC);
            
            if ($result) {
                // Return the stored JSON value
                echo $result['config_value'];
            } else {
                echo json_encode(null);
            }
        } catch(PDOException $e) {
             echo json_encode(["error" => $e->getMessage()]);
        }
        break;

    case 'POST':
    case 'PUT':
        $data = json_decode(file_get_contents("php://input"), true);
        if (!$data || !isset($data['key']) || !isset($data['value'])) {
            echo json_encode(["error" => "Invalid data - key and value required"]);
            break;
        }

        try {
            $key = $data['key'];
            $value = json_encode($data['value']); // Store as JSON string

            // Use INSERT ... ON DUPLICATE KEY UPDATE for upsert
            $stmt = $pdo->prepare("INSERT INTO site_config (config_key, config_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE config_value = ?, updated_at = CURRENT_TIMESTAMP");
            $success = $stmt->execute([$key, $value, $value]);

            echo json_encode(["success" => $success]);
        } catch(PDOException $e) {
            echo json_encode(["error" => $e->getMessage()]);
        }
        break;

    case 'DELETE':
        if (!isset($_GET['key'])) {
            echo json_encode(["error" => "Missing key parameter"]);
            break;
        }

        try {
            $stmt = $pdo->prepare("DELETE FROM site_config WHERE config_key = ?");
            $success = $stmt->execute([$_GET['key']]);
            echo json_encode(["success" => $success]);
        } catch(PDOException $e) {
            echo json_encode(["error" => $e->getMessage()]);
        }
        break;
}
?>
