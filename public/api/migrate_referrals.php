<?php
/**
 * Migration Script for Referral System
 * Creates referrals and leads tables
 */

require_once 'db_connect.php';

try {
    // Create referrals table
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS referrals (
            id INT AUTO_INCREMENT PRIMARY KEY,
            code VARCHAR(50) UNIQUE NOT NULL,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            tier VARCHAR(50) DEFAULT 'Bridge',
            status VARCHAR(50) DEFAULT 'Active',
            total_earnings DECIMAL(10,2) DEFAULT 0.00,
            referral_count INT DEFAULT 0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    ");
    
    echo "✓ Created 'referrals' table\n";

    // Create leads table
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS leads (
            id INT AUTO_INCREMENT PRIMARY KEY,
            referral_code VARCHAR(50) NOT NULL,
            name VARCHAR(255) NOT NULL,
            phone VARCHAR(20) NOT NULL,
            email VARCHAR(255),
            service VARCHAR(255) NOT NULL,
            plan TEXT,
            status VARCHAR(50) DEFAULT 'New',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            INDEX idx_referral_code (referral_code),
            INDEX idx_status (status)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    ");
    
    echo "✓ Created 'leads' table\n";

    echo "\n✅ Migration completed successfully!\n";
    echo "Database tables created:\n";
    echo "  - referrals (for partner codes)\n";
    echo "  - leads (for referral submissions)\n";

} catch (PDOException $e) {
    echo "❌ Migration failed: " . $e->getMessage() . "\n";
    exit(1);
}
