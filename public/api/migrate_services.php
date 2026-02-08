<?php
/**
 * Migration Script to Populate Service Configuration Defaults
 * - Reads hardcoded defaults from Frontend (replicated here)
 * - Inserts them into `site_config` table if not already present
 */

require_once 'db_connect.php';

// --- DEFAULTS FROM COMPONENTS ---

$defaultTechStack = [
    ['name' => 'React', 'icon' => 'bi-filetype-jsx', 'color' => 'text-cyan-400'],
    ['name' => 'Node.js', 'icon' => 'bi-filetype-js', 'color' => 'text-green-500'],
    ['name' => 'Python', 'icon' => 'bi-filetype-py', 'color' => 'text-yellow-400'],
    ['name' => 'AWS', 'icon' => 'bi-cloud', 'color' => 'text-orange-500'],
    ['name' => 'Docker', 'icon' => 'bi-box-seam', 'color' => 'text-blue-500'],
    ['name' => 'MongoDB', 'icon' => 'bi-database', 'color' => 'text-green-600'],
    ['name' => 'Next.js', 'icon' => 'bi-layers', 'color' => 'text-white'],
    ['name' => 'TypeScript', 'icon' => 'bi-filetype-tsx', 'color' => 'text-blue-400'],
];

$defaultFaqs = [
    ['q' => "How long does a typical project take?", 'a' => "Timelines vary by complexity. A standard website takes 2-4 weeks, while custom SaaS applications can take 8-12 weeks. We provide a detailed Gantt chart during the discovery phase."],
    ['q' => "Do you provide post-launch support?", 'a' => "Yes, we offer complimentary 30-day support after launch. We also have dedicated monthly maintenance packages to keep your software secure and up-to-date."],
    ['q' => "What technologies do you use?", 'a' => "We specialize in the MERN stack (MongoDB, Express, React, Node.js) for web apps, and React Native/Flutter for mobile. We choose the best tool for your specific scalability needs."],
    ['q' => "Can you help with legacy code?", 'a' => "Absolutely. We can audit, refactor, and modernize your existing codebase to improve performance and security without interrupting your business operations."],
];

$defaultProcess = [
    [
        'num' => '01',
        'title' => 'Discovery & Strategy',
        'desc' => 'We start by understanding your business goals, target audience, and specific requirements to build a solid roadmap.',
        'icon' => 'bi-search'
    ],
    [
        'num' => '02',
        'title' => 'UX/UI Design',
        'desc' => 'Our designers create intuitive, high-fidelity wireframes and prototypes that align with your brand identity.',
        'icon' => 'bi-palette'
    ],
    [
        'num' => '03',
        'title' => 'Agile Development',
        'desc' => 'We build your solution using modern tech stacks with regular sprints, ensuring code quality and scalability.',
        'icon' => 'bi-code-slash'
    ],
    [
        'num' => '04',
        'title' => 'Testing & Launch',
        'desc' => 'Rigorous QA testing ensures a bug-free launch. We deploy your application and provide ongoing support.',
        'icon' => 'bi-rocket-takeoff'
    ]
];

// --- SPECIFIC SERVICE FEATURES ---

$services = [
    'informative' => [
        'name' => 'Informative Website',
        'features' => [
            ['title' => 'Responsive Design', 'icon' => 'bi-phone', 'desc' => 'Looks stunning on every device, from mobile to 4K desktops.'],
            ['title' => 'Search Engine Ready', 'icon' => 'bi-graph-up', 'desc' => 'Built to rank higher on Google so customers can find you.'],
            ['title' => 'Easy Management', 'icon' => 'bi-window-sidebar', 'desc' => 'Update text and images yourself with no coding needed.'],
            ['title' => 'Fast Performance', 'icon' => 'bi-lightning-charge', 'desc' => 'Loads instantly to keep visitors happy.'],
            ['title' => 'Secure & Reliable', 'icon' => 'bi-shield-check', 'desc' => 'Protected against threats with industry-best security.'],
            ['title' => 'Visitor Insights', 'icon' => 'bi-bar-chart', 'desc' => 'See who visits your site and what they do.'],
        ]
    ],
    'ecommerce' => [
        'name' => 'E-Commerce',
        'features' => [
            ['title' => 'Secure Checkouts', 'icon' => 'bi-shield-lock', 'desc' => 'PCI-DSS compliant payment processing for peace of mind.'],
            ['title' => 'Inventory Management', 'icon' => 'bi-box-seam', 'desc' => 'Real-time stock tracking and automated alerts.'],
            ['title' => 'Sales Analytics', 'icon' => 'bi-graph-up-arrow', 'desc' => 'Detailed dashboards for revenue, conversion, and traffic.'],
            ['title' => 'Mobile First', 'icon' => 'bi-phone', 'desc' => 'Optimized shopping experience for mobile users.'],
            ['title' => 'SEO Rankings', 'icon' => 'bi-search', 'desc' => 'Product schema markup to help you rank on Google Shopping.'],
            ['title' => 'Global Selling', 'icon' => 'bi-globe', 'desc' => 'Multi-currency and multi-language support built-in.'],
        ]
    ],
    'application' => [
        'name' => 'Mobile Application',
        'features' => [
            ['title' => 'Scalable Platforms', 'icon' => 'bi-cloud', 'desc' => 'Growth-ready systems that handle thousands of users effortlessly.'],
            ['title' => 'Seamless Connections', 'icon' => 'bi-code-square', 'desc' => 'We connect your apps to other services for smooth data flow.'],
            ['title' => 'Instant Updates', 'icon' => 'bi-arrow-repeat', 'desc' => 'See changes immediately without refreshing the page.'],
            ['title' => 'Bank-Grade Security', 'icon' => 'bi-shield-lock', 'desc' => 'Top-tier encryption and protections to keep data safe.'],
            ['title' => 'Modular Design', 'icon' => 'bi-diagram-2', 'desc' => 'Built in blocks, so we can upgrade parts without breaking the whole.'],
            ['title' => 'Automated Releases', 'icon' => 'bi-infinity', 'desc' => 'We deploy updates faster and with fewer errors.'],
        ]
    ],
    'uiux' => [
        'name' => 'UI/UX Design',
        'features' => [
            ['title' => 'User Research', 'icon' => 'bi-people', 'desc' => 'We study your audience to know exactly what they want.'],
            ['title' => 'Blueprints', 'icon' => 'bi-grid-1x2', 'desc' => 'Simple sketches to test ideas before building.'],
            ['title' => 'Visual Design', 'icon' => 'bi-palette', 'desc' => 'Stunning, on-brand looks that wow your customers.'],
            ['title' => 'Design Library', 'icon' => 'bi-collection', 'desc' => 'A set of reusable elements to keep everything consistent.'],
            ['title' => 'Interactions', 'icon' => 'bi-cursor', 'desc' => 'Fun animations and feedback that make the app feel alive.'],
            ['title' => 'User Testing', 'icon' => 'bi-clipboard-check', 'desc' => 'Real people test the design to ensure it is easy to use.'],
        ]
    ],
    // Defaults for others to avoid empty pages
    'maintenance' => [
        'name' => 'Maintenance',
        'features' => [
            ['title' => '24/7 Monitoring', 'icon' => 'bi-activity', 'desc' => 'We keep an eye on your site round the clock.'],
            ['title' => 'Regular Backups', 'icon' => 'bi-hdd', 'desc' => 'Daily backups to ensure your data is never lost.'],
            ['title' => 'Security Patches', 'icon' => 'bi-shield', 'desc' => 'Applying latest updates to close vulnerabilities.'],
            ['title' => 'Performance Tuning', 'icon' => 'bi-speedometer2', 'desc' => 'Optimization to keep your site loading fast.'],
        ]
    ],
    'dynamic' => [
        'name' => 'Dynamic Solutions',
        'features' => [
            ['title' => 'Custom Logic', 'icon' => 'bi-cpu', 'desc' => 'Tailored algorithms to solve unique business problems.'],
            ['title' => 'Real-time Data', 'icon' => 'bi-graph-up', 'desc' => 'Live updates and dashboards for instant insights.'],
            ['title' => 'API Integration', 'icon' => 'bi-plug', 'desc' => 'Connecting your third-party tools seamlessly.'],
        ]
    ],
    'odoo' => [
        'name' => 'Odoo Customization',
        'features' => [
            ['title' => 'Module Development', 'icon' => 'bi-box', 'desc' => 'Custom modules to extend Odoo capabilities.'],
            ['title' => 'Workflow Automation', 'icon' => 'bi-gear', 'desc' => 'Automating repetitive tasks to save time.'],
            ['title' => 'Report Customization', 'icon' => 'bi-file-text', 'desc' => 'Tailored PDF and Excel reports for your business.'],
        ]
    ],
    'social' => [
        'name' => 'Social Media Marketing',
        'features' => [
            ['title' => 'Strategy Planning', 'icon' => 'bi-map', 'desc' => 'Data-driven strategies to reach your audience.'],
            ['title' => 'Content Creation', 'icon' => 'bi-pen', 'desc' => 'Engaging posts and visuals that resonate.'],
            ['title' => 'Ad Management', 'icon' => 'bi-megaphone', 'desc' => 'Optimized ad campaigns for maximum ROI.'],
        ]
    ],
    'redesign' => [
        'name' => 'Website Redesign',
        'features' => [
            ['title' => 'Modern UI', 'icon' => 'bi-palette', 'desc' => 'Fresh, contemporary look for your brand.'],
            ['title' => 'Mobile Optimization', 'icon' => 'bi-phone', 'desc' => 'Ensure perfect experience on all devices.'],
            ['title' => 'Conversion Focus', 'icon' => 'bi-funnel', 'desc' => 'Design changes aimed at increasing sales/leads.'],
        ]
    ]
];

echo "Starting Service Defaults Migration...\n";

// Ensure table exists
$pdo->exec("CREATE TABLE IF NOT EXISTS site_config (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    config_key VARCHAR(255) UNIQUE NOT NULL,
    config_value LONGTEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)");

foreach ($services as $key => $data) {
    echo "Processing $key...\n";
    $configKey = "service_config_$key";
    
    // Check if exists
    $stmt = $pdo->prepare("SELECT COUNT(*) FROM site_config WHERE config_key = ?");
    $stmt->execute([$configKey]);
    $exists = $stmt->fetchColumn();
    
    if (!$exists) {
        // Build full object
        $fullData = [
            'name' => $data['name'],
            'features' => $data['features'],
            'techStack' => $defaultTechStack,
            'faqs' => $defaultFaqs,
            'process' => $defaultProcess,
            'protocolDetails' => [] // Specific to redesign, empty for others is fine
        ];
        
        $json = json_encode($fullData);
        
        $insert = $pdo->prepare("INSERT INTO site_config (config_key, config_value) VALUES (?, ?)");
        if ($insert->execute([$configKey, $json])) {
            echo "  - Inserted defaults for $key\n";
        } else {
            echo "  - Error inserting $key\n";
        }
    } else {
        echo "  - Config for $key already exists. Skipping to preserve user edits.\n";
    }
}

echo "Migration Complete.\n";
?>
