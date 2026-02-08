<?php
/**
 * Referrals API Endpoint
 * Handles CRUD operations for partner referral codes
 */

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

try {
    switch ($method) {
        case 'GET':
            // Fetch all referrals
            $stmt = $pdo->query("SELECT * FROM referrals ORDER BY created_at DESC");
            $referrals = $stmt->fetchAll();
            echo json_encode($referrals);
            break;

        case 'POST':
            // Create new referral
            $data = json_decode(file_get_contents('php://input'), true);
            
            if (!isset($data['code']) || !isset($data['name']) || !isset($data['email'])) {
                http_response_code(400);
                echo json_encode(['success' => false, 'error' => 'Missing required fields']);
                exit;
            }

            $stmt = $pdo->prepare("
                INSERT INTO referrals (code, name, email, tier, status, total_earnings, referral_count) 
                VALUES (:code, :name, :email, :tier, :status, :total_earnings, :referral_count)
            ");
            
            $stmt->execute([
                ':code' => $data['code'],
                ':name' => $data['name'],
                ':email' => $data['email'],
                ':tier' => $data['tier'] ?? 'Bridge',
                ':status' => $data['status'] ?? 'Active',
                ':total_earnings' => $data['total_earnings'] ?? 0,
                ':referral_count' => $data['referral_count'] ?? 0
            ]);

            echo json_encode([
                'success' => true,
                'id' => $pdo->lastInsertId(),
                'data' => ['code' => $data['code']]
            ]);
            break;

        case 'PUT':
            // Update existing referral
            $data = json_decode(file_get_contents('php://input'), true);
            
            if (!isset($data['id'])) {
                http_response_code(400);
                echo json_encode(['success' => false, 'error' => 'Missing ID']);
                exit;
            }

            $fields = [];
            $params = [':id' => $data['id']];

            if (isset($data['tier'])) {
                $fields[] = "tier = :tier";
                $params[':tier'] = $data['tier'];
            }
            if (isset($data['status'])) {
                $fields[] = "status = :status";
                $params[':status'] = $data['status'];
            }
            if (isset($data['total_earnings'])) {
                $fields[] = "total_earnings = :total_earnings";
                $params[':total_earnings'] = $data['total_earnings'];
            }
            if (isset($data['referral_count'])) {
                $fields[] = "referral_count = :referral_count";
                $params[':referral_count'] = $data['referral_count'];
            }

            if (empty($fields)) {
                http_response_code(400);
                echo json_encode(['success' => false, 'error' => 'No fields to update']);
                exit;
            }

            $sql = "UPDATE referrals SET " . implode(', ', $fields) . " WHERE id = :id";
            $stmt = $pdo->prepare($sql);
            $stmt->execute($params);

            echo json_encode(['success' => true]);
            break;

        case 'DELETE':
            // Delete referral
            $id = $_GET['id'] ?? null;
            
            if (!$id) {
                http_response_code(400);
                echo json_encode(['success' => false, 'error' => 'Missing ID']);
                exit;
            }

            $stmt = $pdo->prepare("DELETE FROM referrals WHERE id = :id");
            $stmt->execute([':id' => $id]);

            echo json_encode(['success' => true]);
            break;

        default:
            http_response_code(405);
            echo json_encode(['error' => 'Method not allowed']);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
