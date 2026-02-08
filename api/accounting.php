<?php
require_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    case 'GET':
        // Get all accounting records
        try {
            // Check if table exists first (optional, but good for first run)
            $check = $conn->query("SHOW TABLES LIKE 'accounting'");
            if($check->rowCount() == 0) {
                // Initial Table Setup if missing
                $sql = "CREATE TABLE accounting (
                    id INT(11) AUTO_INCREMENT PRIMARY KEY,
                    date DATE NOT NULL,
                    description VARCHAR(255) NOT NULL,
                    type VARCHAR(50) NOT NULL, /* Income or Expense */
                    amount DECIMAL(15, 2) NOT NULL,
                    category VARCHAR(100) DEFAULT 'General',
                    fy VARCHAR(20) DEFAULT '2025-2026',
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )";
                $conn->exec($sql);
            }

            $stmt = $conn->prepare("SELECT * FROM accounting ORDER BY date DESC");
            $stmt->execute();
            $records = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            // Cast IDs and numeric values
            foreach ($records as &$record) {
                $record['id'] = (int)$record['id'];
                $record['amount'] = (float)$record['amount'];
                // Frontend uses 'desc', DB uses 'description'. Map it.
                $record['desc'] = $record['description']; 
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
            $stmt = $conn->prepare("INSERT INTO accounting (date, description, type, amount, category, fy) VALUES (?, ?, ?, ?, ?, ?)");
            $success = $stmt->execute([
                $data['date'],
                $data['desc'], // Frontend sends 'desc'
                $data['type'],
                $data['amount'],
                $data['category'],
                $data['fy']
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
            $stmt = $conn->prepare("UPDATE accounting SET date = ?, description = ?, type = ?, amount = ?, category = ?, fy = ? WHERE id = ?");
            $success = $stmt->execute([
                $data['date'],
                $data['desc'],
                $data['type'],
                $data['amount'],
                $data['category'],
                $data['fy'],
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
            $stmt = $conn->prepare("DELETE FROM accounting WHERE id = ?");
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
