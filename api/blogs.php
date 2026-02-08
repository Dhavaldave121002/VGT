<?php
require_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    case 'GET':
        if (isset($_GET['id'])) {
            // Get single blog
            $stmt = $conn->prepare("SELECT * FROM blogs WHERE id = ?");
            $stmt->execute([$_GET['id']]);
            $blog = $stmt->fetch(PDO::FETCH_ASSOC);
            echo json_encode($blog);
        } else {
            // Get all blogs
            $stmt = $conn->prepare("SELECT * FROM blogs ORDER BY created_at DESC");
            $stmt->execute();
            $blogs = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            // Cast IDs to int for frontend consistency
            foreach ($blogs as &$blog) {
                $blog['id'] = (int)$blog['id'];
            }
            
            echo json_encode($blogs);
        }
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"), true);
        if (!$data) {
            echo json_encode(["error" => "Invalid data"]);
            break;
        }

        $stmt = $conn->prepare("INSERT INTO blogs (title, category, date, excerpt, content, image) VALUES (?, ?, ?, ?, ?, ?)");
        $success = $stmt->execute([
            $data['title'],
            $data['category'] ?? 'Technology',
            $data['date'] ?? date('M d, Y'),
            $data['excerpt'] ?? '',
            $data['content'] ?? '',
            $data['image'] ?? ''
        ]);

        echo json_encode(["success" => $success, "id" => $conn->lastInsertId()]);
        break;

    case 'PUT':
        $data = json_decode(file_get_contents("php://input"), true);
        if (!$data || !isset($data['id'])) {
            echo json_encode(["error" => "Invalid data or missing ID"]);
            break;
        }

        $stmt = $conn->prepare("UPDATE blogs SET title = ?, category = ?, date = ?, excerpt = ?, content = ?, image = ? WHERE id = ?");
        $success = $stmt->execute([
            $data['title'],
            $data['category'],
            $data['date'],
            $data['excerpt'],
            $data['content'],
            $data['image'],
            $data['id']
        ]);

        echo json_encode(["success" => $success]);
        break;

    case 'DELETE':
        if (!isset($_GET['id'])) {
            echo json_encode(["error" => "Missing ID"]);
            break;
        }

        $stmt = $conn->prepare("DELETE FROM blogs WHERE id = ?");
        $success = $stmt->execute([$_GET['id']]);
        echo json_encode(["success" => $success]);
        break;

    default:
        echo json_encode(["error" => "Method not allowed"]);
        break;
}
?>
