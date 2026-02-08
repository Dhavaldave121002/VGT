<?php
require_once 'config.php';

// Test 1: Check if site_config table exists
try {
    $stmt = $conn->query("SHOW TABLES LIKE 'site_config'");
    $exists = $stmt->rowCount() > 0;
    echo "site_config table exists: " . ($exists ? "YES" : "NO") . "\n";
    
    if ($exists) {
        // Test 2: Try to insert test data
        $testKey = 'test_legal_privacy';
        $testValue = json_encode(['sections' => [['id' => 1, 'title' => 'Test', 'content' => 'Test content']], 'lastUpdated' => date('Y-m-d')]);
        
        $stmt = $conn->prepare("INSERT INTO site_config (config_key, config_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE config_value = ?");
        $stmt->execute([$testKey, $testValue, $testValue]);
        echo "Test insert: SUCCESS\n";
        
        // Test 3: Retrieve it back
        $stmt = $conn->prepare("SELECT config_value FROM site_config WHERE config_key = ?");
        $stmt->execute([$testKey]);
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($result) {
            echo "Test retrieve: SUCCESS\n";
            echo "Retrieved data: " . $result['config_value'] . "\n";
        } else {
            echo "Test retrieve: FAILED\n";
        }
        
        // Clean up
        $stmt = $conn->prepare("DELETE FROM site_config WHERE config_key = ?");
        $stmt->execute([$testKey]);
        echo "Test cleanup: SUCCESS\n";
    }
} catch (PDOException $e) {
    echo "ERROR: " . $e->getMessage() . "\n";
}
?>
