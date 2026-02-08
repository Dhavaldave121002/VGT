<?php
require_once 'db_connect.php';

try {
    // Add subject column to contacts
    $pdo->exec("ALTER TABLE contacts ADD COLUMN IF NOT EXISTS subject VARCHAR(255) AFTER phone");
    echo "Added subject to contacts\n";

    // Add subject column to meetings
    $pdo->exec("ALTER TABLE meetings ADD COLUMN IF NOT EXISTS subject VARCHAR(255) AFTER phone");
    echo "Added subject to meetings\n";

} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
?>
