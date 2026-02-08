<?php
require_once 'db_connect.php';
$stmt = $pdo->query("DESCRIBE pricing_faqs");
$cols = $stmt->fetchAll(PDO::FETCH_ASSOC);
print_r($cols);
?>
