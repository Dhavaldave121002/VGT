<?php
/**
 * api.php - ULTRA ROBUST CORS FIX
 */
ob_start(); // Buffer output to prevent accidental header issues

// Allow from any origin - More robust for local dev
if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // cache for 1 day
}

// Access-Control headers are received during OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");         

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

    exit(0);
}

header("Content-Type: application/json; charset=UTF-8");

require_once 'db_connect.php';

$method = $_SERVER['REQUEST_METHOD'];
$entity = isset($_GET['entity']) ? $_GET['entity'] : '';
$id = isset($_GET['id']) ? $_GET['id'] : null;

if (!$entity) {
    echo json_encode(['error' => 'No entity specified']);
    exit;
}

// Map entities to table names if necessary, or use directly
$table = preg_replace('/[^a-z0-9_]/', '', $entity); // Sanitize

try {
    switch ($method) {
        case 'GET':
            if ($id) {
                // If it's a string, it might be a key_name (for config_store)
                $pk = (is_numeric($id)) ? 'id' : (($table === 'config_store') ? 'key_name' : 'id');
                $stmt = $pdo->prepare("SELECT * FROM $table WHERE $pk = ?");
                $stmt->execute([$id]);
                $data = $stmt->fetch();
                echo json_encode($data ?: []);
            } else {
                // Check if id column exists for sorting
                $sort = "ORDER BY id DESC";
                try {
                    $pdo->query("SELECT id FROM $table LIMIT 1");
                } catch (Exception $e) {
                    $sort = ""; // No id column
                }
                $stmt = $pdo->query("SELECT * FROM $table $sort");
                $data = $stmt->fetchAll();
                echo json_encode($data);
            }
            break;

        case 'POST':
            $input = json_decode(file_get_contents('php://input'), true);
            if (!$input) {
                echo json_encode(['error' => 'Invalid JSON input']);
                exit;
            }

            // Special Case: config_store upsert
            if ($table === 'config_store' && isset($input['key_name']) && empty($input['id'])) {
                try {
                    $stmt = $pdo->prepare("SELECT id FROM config_store WHERE key_name = ?");
                    $stmt->execute([$input['key_name']]);
                    $existing = $stmt->fetch();
                    if ($existing) {
                        $input['id'] = $existing['id'];
                    }
                } catch (Exception $e) {}
            }

            if (isset($input['id']) && !empty($input['id'])) {
                // UPDATE
                $fields = [];
                $values = [];
                foreach ($input as $key => $value) {
                    if ($key === 'id' || $key === 'created_at') continue; // Skip ID and immutable fields
                    $fields[] = "$key = ?";
                    $values[] = is_array($value) ? json_encode($value) : $value; // Handle arrays (like features) as JSON strings
                }
                $values[] = $input['id'];
                
                $sql = "UPDATE $table SET " . implode(', ', $fields) . " WHERE id = ?";
                $stmt = $pdo->prepare($sql);
                $stmt->execute($values);
                echo json_encode(['success' => true, 'message' => 'Updated successfully', 'id' => $input['id']]);

            } else {
                // INSERT
                $keys = [];
                $placeholders = [];
                $values = [];
                
                foreach ($input as $key => $value) {
                    if ($key === 'id') continue; // Auto-increment
                    $keys[] = $key;
                    $placeholders[] = '?';
                    $values[] = is_array($value) ? json_encode($value) : $value;
                }
                
                $sql = "INSERT INTO $table (" . implode(', ', $keys) . ") VALUES (" . implode(', ', $placeholders) . ")";
                $stmt = $pdo->prepare($sql);
                $stmt->execute($values);
                echo json_encode(['success' => true, 'message' => 'Created successfully', 'id' => $pdo->lastInsertId()]);
            }
            break;

        case 'DELETE':
            if (!$id) {
                echo json_encode(['error' => 'ID required for deletion']);
                exit;
            }
            $stmt = $pdo->prepare("DELETE FROM $table WHERE id = ?");
            $stmt->execute([$id]);
            echo json_encode(['success' => true, 'message' => 'Deleted successfully']);
            break;

        default:
            echo json_encode(['error' => 'Method not supported']);
            break;
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
}
?>
