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
            // Direct query, no schema checks to avoid "Table already exists" or permission issues
            $stmt = $conn->prepare("SELECT * FROM projects ORDER BY id DESC");
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
            $title = $data['title'] ?? '';
            $type = $data['type'] ?? '';
            $category = $data['category'] ?? $type;
            $img = $data['img'] ?? '';
            $logo = $data['logo'] ?? '';
            $liveUrl = $data['liveUrl'] ?? '';

            $stmt = $conn->prepare("INSERT INTO projects (title, type, category, img, logo, liveUrl) VALUES (?, ?, ?, ?, ?, ?)");
            $success = $stmt->execute([$title, $type, $category, $img, $logo, $liveUrl]);

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
            $title = $data['title'] ?? '';
            $type = $data['type'] ?? '';
            $category = $data['category'] ?? $type;
            $img = $data['img'] ?? '';
            $logo = $data['logo'] ?? '';
            $liveUrl = $data['liveUrl'] ?? '';

            $stmt = $conn->prepare("UPDATE projects SET title = ?, type = ?, category = ?, img = ?, logo = ?, liveUrl = ? WHERE id = ?");
            $success = $stmt->execute([$title, $type, $category, $img, $logo, $liveUrl, $id]);

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
            $stmt = $conn->prepare("DELETE FROM projects WHERE id = ?");
            $success = $stmt->execute([$_GET['id']]);
            echo json_encode(["success" => $success]);
        } catch(PDOException $e) {
            echo json_encode(["error" => $e->getMessage()]);
        }
        break;
}
?>
