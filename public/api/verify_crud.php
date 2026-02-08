<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
require_once 'db_connect.php';

$action = $_GET['action'] ?? 'check';
$entity = $_GET['entity'] ?? 'testimonials';

if ($action === 'check') {
    $stmt = $pdo->query("SELECT * FROM $entity ORDER BY id DESC LIMIT 5");
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
}
?>
