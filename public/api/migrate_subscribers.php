<?php
require_once 'db_connect.php';

$subscribers = [
    ['email' => 'enterprise@partner.com', 'status' => 'Active', 'time' => '-2 days'],
    ['email' => 'investor@venturecap.com', 'status' => 'Active', 'time' => '-5 days'],
    ['email' => 'founder@startup.io', 'status' => 'Active', 'time' => '-1 week'],
    ['email' => 'newsletter@techweekly.com', 'status' => 'Active', 'time' => '-2 weeks'],
    ['email' => 'demo@vertexglobal.tech', 'status' => 'Active', 'time' => '-1 month']
];

echo "Starting Subscriber Migration...\n";

// Ensure table exists
$pdo->exec("DROP TABLE IF EXISTS subscribers");
$pdo->exec("CREATE TABLE IF NOT EXISTS subscribers (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    status VARCHAR(50) DEFAULT 'Active',
    subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)");

$stmt = $pdo->query("SELECT COUNT(*) FROM subscribers");
if ($stmt->fetchColumn() == 0) {
    $insert = $pdo->prepare("INSERT INTO subscribers (email, status, subscribed_at) VALUES (?, ?, ?)");
    foreach ($subscribers as $sub) {
        $date = date('Y-m-d H:i:s', strtotime($sub['time']));
        $insert->execute([$sub['email'], $sub['status'], $date]);
        echo "  - Inserted " . $sub['email'] . "\n";
    }
    echo "Subscribers Inserted Successfully.\n";
} else {
    echo "Subscribers already exist. Skipping.\n";
}
?>
