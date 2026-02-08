<?php
require_once 'db_connect.php';

try {
    echo "--- Contacts Table ---\n";
    $stmt = $pdo->query("SELECT * FROM contacts");
    $contacts = $stmt->fetchAll();
    echo "Count: " . count($contacts) . "\n";
    if (count($contacts) > 0) {
        print_r($contacts[0]);
    }

    echo "\n--- Meetings Table ---\n";
    $stmt = $pdo->query("SELECT * FROM meetings");
    $meetings = $stmt->fetchAll();
    echo "Count: " . count($meetings) . "\n";
    if (count($meetings) > 0) {
        print_r($meetings[0]);
    }

} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
?>
