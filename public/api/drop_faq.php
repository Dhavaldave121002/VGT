<?php
require_once 'db_connect.php';
try {
    $pdo->exec("DROP TABLE pricing_faqs");
    echo "Table dropped.";
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
?>
