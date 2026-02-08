<?php
require_once 'db_connect.php';

try {
    // 1. Add 'bio' to teams if missing
    $checkBio = $pdo->query("SHOW COLUMNS FROM teams LIKE 'bio'");
    if (!$checkBio->fetch()) {
        $pdo->exec("ALTER TABLE teams ADD COLUMN bio TEXT AFTER role");
        echo "Added 'bio' column to teams.\n";
    }

    // 2. Ensure image columns are LONGTEXT for Base64 (already done in previous steps but verifying)
    $tables = [
        'blogs' => 'image',
        'projects' => 'img',
        'teams' => 'image',
        'testimonials' => 'avatar'
    ];

    foreach ($tables as $table => $column) {
        $checkCol = $pdo->query("SHOW COLUMNS FROM $table LIKE '$column'");
        $colInfo = $checkCol->fetch();
        if ($colInfo && stripos($colInfo['Type'], 'longtext') === false) {
            $pdo->exec("ALTER TABLE $table MODIFY COLUMN $column LONGTEXT");
            echo "Modified $table.$column to LONGTEXT.\n";
        }
    }

    echo "Migration completed successfully.\n";

} catch (Exception $e) {
    echo "Migration failed: " . $e->getMessage() . "\n";
}
?>
