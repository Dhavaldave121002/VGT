<?php
require_once 'config.php';

echo "=== Legal Policies Data Migration ===\n\n";

try {
    // Check if old legal table exists
    $stmt = $conn->query("SHOW TABLES LIKE 'legal'");
    $oldTableExists = $stmt->rowCount() > 0;
    echo "Old 'legal' table exists: " . ($oldTableExists ? "YES" : "NO") . "\n";
    
    // Check if site_config table exists
    $stmt = $conn->query("SHOW TABLES LIKE 'site_config'");
    $newTableExists = $stmt->rowCount() > 0;
    echo "New 'site_config' table exists: " . ($newTableExists ? "YES" : "NO") . "\n\n";
    
    if ($oldTableExists) {
        // Read data from old table
        $stmt = $conn->query("SELECT * FROM legal ORDER BY id");
        $oldData = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        echo "Found " . count($oldData) . " records in old 'legal' table:\n";
        foreach ($oldData as $row) {
            echo "  - ID: {$row['id']}, Type: {$row['type']}\n";
        }
        echo "\n";
        
        // Group by type
        $grouped = [];
        foreach ($oldData as $row) {
            $type = strtolower($row['type']);
            if (!isset($grouped[$type])) {
                $grouped[$type] = [];
            }
            
            // Parse the content to extract title and content
            $content = $row['content'];
            preg_match('/<h2>(.*?)<\/h2>/', $content, $titleMatch);
            preg_match('/<p>(.*?)<\/p>/', $content, $contentMatch);
            
            $title = $titleMatch[1] ?? 'Section ' . (count($grouped[$type]) + 1);
            $text = $contentMatch[1] ?? strip_tags($content);
            
            $grouped[$type][] = [
                'id' => $row['id'],
                'title' => $title,
                'content' => $text
            ];
        }
        
        echo "Migrating to new format...\n";
        
        // Migrate each type to site_config
        foreach ($grouped as $type => $sections) {
            $key = 'legal_' . $type;
            $value = json_encode([
                'sections' => $sections,
                'lastUpdated' => date('Y-m-d')
            ]);
            
            $stmt = $conn->prepare("INSERT INTO site_config (config_key, config_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE config_value = ?");
            $stmt->execute([$key, $value, $value]);
            
            echo "  ✓ Migrated '{$type}' policy (" . count($sections) . " sections)\n";
        }
        
        echo "\nMigration complete!\n";
        echo "\nYou can now safely drop the old 'legal' table if desired.\n";
        echo "SQL: DROP TABLE legal;\n";
    } else {
        echo "No old data to migrate.\n";
    }
    
} catch (PDOException $e) {
    echo "ERROR: " . $e->getMessage() . "\n";
}
?>
