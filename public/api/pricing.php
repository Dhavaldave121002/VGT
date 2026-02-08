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
        try {
            // Check table
            $pdo->exec("CREATE TABLE IF NOT EXISTS pricing_plans (
                id INT(11) AUTO_INCREMENT PRIMARY KEY,
                type VARCHAR(50) NOT NULL,
                plan_name VARCHAR(255) NOT NULL,
                price VARCHAR(100) NOT NULL,
                description TEXT,
                features LONGTEXT, -- JSON Array
                is_popular BOOLEAN DEFAULT 0,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )");

            $stmt = $pdo->prepare("SELECT * FROM pricing_plans ORDER BY id ASC");
            $stmt->execute();
            $records = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            foreach ($records as &$record) {
                $record['id'] = (int)$record['id'];
                $record['is_popular'] = (bool)$record['is_popular'];
                // features are stored as stringified JSON in DB, but frontend expects JSON? 
                // Wait, frontend PricingManager line 46: JSON.parse(p.features)
                // So we send it as string? Or should we decode it here?
                // The frontend code expects it to be a string or array?
                // "features: typeof p.features === 'string' ? JSON.parse(p.features) : p.features"
                // So it handles both. Let's send it as is (string) or decode it.
                // If I json_encode the whole record, the 'features' field (if it's a JSON string) will be escaped string.
                // Better to decode it here so the API returns a proper JSON object for features.
                /*
                if ($record['features']) {
                    $json = json_decode($record['features']);
                    if (json_last_error() === JSON_ERROR_NONE) {
                        $record['features'] = $json;
                    }
                }
                */
                // Actually, let's keep it simple. If I store it as text, it comes out as text.
                // Frontend handles parsing.
            }
            
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
            // Features should be array, we store as JSON string
            $features = is_array($data['features']) ? json_encode($data['features']) : $data['features'];

            $stmt = $pdo->prepare("INSERT INTO pricing_plans (type, plan_name, price, description, features, is_popular) VALUES (?, ?, ?, ?, ?, ?)");
            $success = $stmt->execute([
                $data['type'],
                $data['plan_name'],
                $data['price'],
                $data['description'],
                $features,
                $data['is_popular'] ?? 0
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
            $features = is_array($data['features']) ? json_encode($data['features']) : $data['features'];

            $stmt = $pdo->prepare("UPDATE pricing_plans SET type = ?, plan_name = ?, price = ?, description = ?, features = ?, is_popular = ? WHERE id = ?");
            $success = $stmt->execute([
                $data['type'],
                $data['plan_name'],
                $data['price'],
                $data['description'],
                $features,
                $data['is_popular'] ?? 0,
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
            $stmt = $pdo->prepare("DELETE FROM pricing_plans WHERE id = ?");
            $success = $stmt->execute([$_GET['id']]);
            echo json_encode(["success" => $success]);
        } catch(PDOException $e) {
            echo json_encode(["error" => $e->getMessage()]);
        }
        break;
}
?>
