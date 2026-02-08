<?php
require_once 'db_connect.php';

echo "DEBUG: Dropping pricing_faqs...\n";
try {
    $pdo->exec("DROP TABLE pricing_faqs"); 
} catch(Exception $e) { echo "Drop failed (might not exist): " . $e->getMessage() . "\n"; }

echo "DEBUG: Creating pricing_faqs...\n";
$pdo->exec("CREATE TABLE pricing_faqs (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    type VARCHAR(50),
    q TEXT,
    a TEXT
)");

// Verify columns
echo "DEBUG: Verifying columns...\n";
$stmt = $pdo->query("DESCRIBE pricing_faqs");
$cols = $stmt->fetchAll(PDO::FETCH_ASSOC);
foreach($cols as $c) { echo "Col: " . $c['Field'] . "\n"; }

include 'migrate_pricing.php'; // Run the original script now that table is clean?
// No, migrate_pricing.php has the DROP command inside it! 
// If I allow it to run, it will DROP it again!
// I should just COPY the logic here or make migrate_pricing use the table I just made (by commenting out its DROP/CREATE).

?>
