<?php
require_once 'db_connect.php';

header("Content-Type: text/plain");

function runSQL($pdo, $sql, $label) {
    try {
        $pdo->exec($sql);
        echo "[SUCCESS] $label\n";
    } catch (PDOException $e) {
        if (strpos($e->getMessage(), 'already exists') !== false || strpos($e->getMessage(), 'Duplicate column name') !== false) {
            echo "[INFO] $label (Already updated)\n";
        } else {
            echo "[ERROR] $label: " . $e->getMessage() . "\n";
        }
    }
}

function columnExists($pdo, $table, $column) {
    try {
        $stmt = $pdo->query("SHOW COLUMNS FROM `$table` LIKE '$column'");
        return $stmt->rowCount() > 0;
    } catch (Exception $e) {
        return false;
    }
}

echo "Starting Database Migration...\n\n";

// 1. Update jobs table
echo "Updating 'jobs' table...\n";
$cols = ['seniority' => 'VARCHAR(100)', 'about' => 'TEXT', 'skills' => 'TEXT', 'responsibilities' => 'TEXT', 'qualifications' => 'TEXT'];
foreach ($cols as $col => $type) {
    if (!columnExists($pdo, 'jobs', $col)) {
        runSQL($pdo, "ALTER TABLE jobs ADD COLUMN $col $type", "Add $col to jobs");
    }
}

// 2. Handle applications table
echo "\nUpdating 'job_applications' table...\n";
$stmt = $pdo->query("SHOW TABLES LIKE 'applications'");
if ($stmt->rowCount() > 0) {
    runSQL($pdo, "RENAME TABLE applications TO job_applications", "Rename applications to job_applications");
}

$cols = [
    'jobId' => 'INT', 
    'jobTitle' => 'VARCHAR(255)', 
    'jobType' => 'VARCHAR(100)', 
    'message' => 'TEXT', 
    'resumeData' => 'LONGTEXT', 
    'resumeFileName' => 'VARCHAR(255)', 
    'submittedAt' => 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
];
foreach ($cols as $col => $type) {
    if (!columnExists($pdo, 'job_applications', $col)) {
        runSQL($pdo, "ALTER TABLE job_applications ADD COLUMN $col $type", "Add $col to job_applications");
    }
}

// 3. Update config_store table
echo "\nUpdating 'config_store' table...\n";
if (!columnExists($pdo, 'config_store', 'id')) {
    runSQL($pdo, "ALTER TABLE config_store ADD COLUMN id INT AUTO_INCREMENT PRIMARY KEY FIRST", "Add id to config_store");
    try {
        $pdo->exec("ALTER TABLE config_store ADD UNIQUE(key_name)");
    } catch(Exception $e) {}
}

// 4. Update leads table
echo "\nUpdating 'leads' table...\n";
$cols = ['name' => 'VARCHAR(255)', 'phone' => 'VARCHAR(20)', 'email' => 'VARCHAR(255)', 'service' => 'VARCHAR(100)', 'plan' => 'TEXT'];
foreach ($cols as $col => $type) {
    if (!columnExists($pdo, 'leads', $col)) {
        runSQL($pdo, "ALTER TABLE leads ADD COLUMN $col $type", "Add $col to leads");
    }
}

// Handle renames if old columns exist
$renames = [
    'leads' => ['clientName' => 'name', 'clientPhone' => 'phone', 'projectType' => 'service'],
    'job_applications' => ['applicant_name' => 'name', 'job_id' => 'jobId', 'submitted_at' => 'submittedAt']
];

foreach ($renames as $table => $mapping) {
    foreach ($mapping as $old => $new) {
        if (columnExists($pdo, $table, $old) && !columnExists($pdo, $table, $new)) {
            runSQL($pdo, "ALTER TABLE `$table` CHANGE COLUMN `$old` `$new` " . ($table === 'leads' && $new === 'service' ? 'VARCHAR(100)' : 'VARCHAR(255)'), "Rename $old to $new in $table");
        }
    }
}

// 5. Update referrals table
echo "\nUpdating 'referrals' table...\n";
if (columnExists($pdo, 'referrals', 'created_at') && !columnExists($pdo, 'referrals', 'createdAt')) {
    runSQL($pdo, "ALTER TABLE referrals CHANGE COLUMN created_at createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP", "Rename created_at to createdAt in referrals");
}
// Standardize tiers
runSQL($pdo, "UPDATE referrals SET tier = 'Nexus' WHERE tier = 'Gold' OR tier = 'Platinum'", "Standardize Nexus tier");
runSQL($pdo, "UPDATE referrals SET tier = 'Bridge' WHERE tier = 'Silver' OR tier = 'Bronze' OR tier = 'Starter'", "Standardize Bridge tier");

// 6. GLOBAL TIMESTAMP STANDARDIZATION
echo "\nRunning Global Timestamp Standardization...\n";
$tables = ['users', 'blogs', 'projects', 'services', 'pricing', 'pricing_faqs', 'teams', 'testimonials', 'timeline', 'brands', 'jobs', 'subscribers'];
foreach ($tables as $table) {
    if (columnExists($pdo, $table, 'created_at') && !columnExists($pdo, $table, 'createdAt')) {
        runSQL($pdo, "ALTER TABLE `$table` CHANGE COLUMN `created_at` `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP", "Rename created_at to createdAt in $table");
    }
}

echo "\nMigration Complete!\n";
?>
