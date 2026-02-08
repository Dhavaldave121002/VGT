<?php
require_once 'db_connect.php';

// --- DATA DEFINITIONS ---

$pricingData = [
    'website' => [
        'plans' => [
            ['name' => 'Starter', 'price' => '$2,500', 'desc' => 'Perfect for small businesses establishing a digital presence.', 'features' => ['Unique 5-Page Design', 'Mobile-Responsive', 'Google Search Setup', 'Contact Form Integration', 'Fast Loading Speed'], 'is_popular' => 0],
            ['name' => 'Business', 'price' => '$5,000', 'desc' => 'Comprehensive solution for growing companies.', 'features' => ['Easy-to-Edit Dashboard', '15 Pages', 'Rank Higher Package', 'Blog / News Section', 'Visitor Analytics', 'Social Media Sync'], 'is_popular' => 1],
            ['name' => 'Enterprise', 'price' => 'Custom', 'desc' => 'Full-scale digital platforms with custom functionality.', 'features' => ['Fully Custom Functionality', 'Unlimited Pages', 'Priority VIP Support', 'Guaranteed Uptime', 'Advanced Security Suite', 'Dedicated Manager'], 'is_popular' => 0]
        ],
        'faqs' => [
            ['q' => "What is included in the Starter plan?", 'a' => "The Starter plan includes a custom-designed 5-page website, mobile responsiveness, basic SEO setup, and a contact form. It's ideal for brochures or portfolio sites."],
            ['q' => "Can I upgrade later?", 'a' => "Yes, you can upgrade your plan at any time. We'll simply charge the difference and implement the additional features."],
            ['q' => "Do you use templates?", 'a' => "No, all our websites are custom-designed to match your brand identity. We do not use generic templates."],
            ['q' => "What are the payment terms?", 'a' => "We typically require a 50% deposit to start, with the remaining 50% due upon launch."]
        ],
        'comparison' => [
            [
                'category' => 'Development',
                'items' => [
                    ['name' => 'Number of Pages', 'values' => ['5', '15', 'Unlimited']],
                    ['name' => 'Responsive Design', 'values' => [true, true, true]],
                    ['name' => 'CMS Integration', 'values' => [false, 'WordPress/Strapi', 'Custom/Headless']],
                    ['name' => 'Custom Animations', 'values' => ['Basic', 'Advanced', 'Premium 3D']],
                ]
            ],
            [
                'category' => 'Marketing & SEO',
                'items' => [
                    ['name' => 'SEO Setup', 'values' => ['Basic', 'Advanced', 'Enterprise']],
                    ['name' => 'Google Analytics', 'values' => [true, true, true]],
                    ['name' => 'Social Media Integration', 'values' => [true, true, true]],
                    ['name' => 'Conversion Optimization', 'values' => [false, true, true]],
                ]
            ],
            [
                'category' => 'Support',
                'items' => [
                    ['name' => 'Post-Launch Support', 'values' => ['2 Weeks', '1 Month', '3 Months']],
                    ['name' => 'Training Session', 'values' => [false, '1 Hour', 'Unlimited']],
                    ['name' => 'Dedicated Manager', 'values' => [false, true, true]],
                ]
            ]
        ]
    ],
    'application' => [
        'plans' => [
            ['name' => 'MVP Launch', 'price' => '$10,000', 'desc' => 'Validate your idea with a core product built for speed.', 'features' => ['Core Feature Set', 'Mobile Responsive', 'Admin Dashboard', '3 Months Support', 'Basic Analytics'], 'is_popular' => 0],
            ['name' => 'Scale & Grow', 'price' => '$25,000', 'desc' => 'Secure, high-performance platform for growing user bases.', 'features' => ['Advanced Features', 'API Integration', 'Real-time Datasets', 'Role-Based Access', 'Automated Testing Suite'], 'is_popular' => 1],
            ['name' => 'Enterprise Platform', 'price' => 'Custom', 'desc' => 'Mission-critical infrastructure for large organizations.', 'features' => ['Microservices Architecture', '99.9% SLA', 'On-premise / Hybrid', 'Full Security Audit', '24/7 Dedicated Support'], 'is_popular' => 0]
        ],
        'faqs' => [
            ['q' => "What is an MVP?", 'a' => "MVP stands for Minimum Viable Product. It includes the essential features needed to launch your idea and gather user feedback without over-investing initially."],
            ['q' => "Do I own the code?", 'a' => "Yes, once the project is fully paid for, you own 100% of the source code and intellectual property."],
            ['q' => "How do you handle hosting?", 'a' => "We can set up hosting on your preferred cloud provider (AWS, Google Cloud, etc.) and hand over the credentials, or manage it for you."]
        ],
        'comparison' => [
            ['category' => 'Architecture', 'items' => [['name' => 'Tech Stack', 'values' => ['React/Node', 'MERN/Next.js', 'Custom Stack']], ['name' => 'Database', 'values' => ['Shared MongoDB', 'Dedicated Cluster', 'Multi-Region']]]],
            ['category' => 'Functionality', 'items' => [['name' => 'User Auth', 'values' => ['Email/Pass', 'Social Login', 'SSO/MFA']], ['name' => 'Real-time', 'values' => [false, 'Socket.io', 'Advanced']]]],
        ]
    ],
    'odoo' => [
        'plans' => [
            ['name' => 'Essentials', 'price' => '$5,000', 'desc' => 'Core Odoo setup for startups and small businesses.', 'features' => ['Standard Modules Config', 'Standard CRM & Sales', 'Basic Invoicing', '3 Users Included', 'Remote Training'], 'is_popular' => 0],
            ['name' => 'Business Pro', 'price' => '$12,000', 'desc' => 'Customized ERP solution for growing enterprises.', 'features' => ['Custom Module (1 Unit)', 'Inventory & Manufacturing', 'Advanced Accounting', 'Multi-Company Support', 'On-site Training'], 'is_popular' => 1],
            ['name' => 'Infinite Suite', 'price' => 'Custom', 'desc' => 'Full-scale digital transformation with total Odoo mastery.', 'features' => ['Infinite Customization', 'Legacy Data Migration', 'External API Sync', 'Dedicated ERP Manager', '24/7 Priority Support'], 'is_popular' => 0]
        ],
        'faqs' => [
            ['q' => "Odoo Online vs Odoo.sh?", 'a' => "Odoo Online is SaaS-based and doesn't allow custom code. Odoo.sh is a cloud platform that allows full customization and Git integration."],
            ['q' => "How long does implementation take?", 'a' => "A standard implementation takes 4-8 weeks, while complex migrations can take 3-6 months depending on data volume."],
            ['q' => "Do I own my Odoo data?", 'a' => "Yes, you have full ownership of your data and can export it at any time."]
        ],
        'comparison' => [
            ['category' => 'Architecture', 'items' => [['name' => 'Hosting', 'values' => ['Odoo Online', 'Odoo.sh', 'Dedicated']], ['name' => 'Support', 'values' => ['Ticketing', 'Priority', 'Manager']]]],
            ['category' => 'Modules', 'items' => [['name' => 'Custom Modules', 'values' => [false, '1 Unit', 'Infinite']], ['name' => 'Accounting', 'values' => ['Standard', 'Advanced', 'Multi-Country']]]],
        ]
    ],
    'uiux' => [
        'plans' => [
            ['name' => 'Research', 'price' => '$3,000', 'desc' => 'Deep dive into user persona and market analysis.', 'features' => ['User Personas', 'Journey Mapping', 'Competitor Analysis', 'Wireframing', 'UX Audit'], 'is_popular' => 0],
            ['name' => 'Design System', 'price' => '$7,500', 'desc' => 'Complete visual identity and component library.', 'features' => ['High Fidelity Mockups', 'Interactive Prototypes', 'Design System', 'Iconography Set', 'Developer Handoff'], 'is_popular' => 1],
            ['name' => 'Full Product', 'price' => '$15,000', 'desc' => 'End-to-end product design from concept to ready.', 'features' => ['Full App Design', 'Animatons & Micro-interactions', 'User Testing', 'Iterative Revisions', 'Ongoing Support'], 'is_popular' => 0]
        ],
        'faqs' => [
            ['q' => "How many revisions do I get?", 'a' => "We offer 3 rounds of revisions per milestone to ensure the design matches your vision perfectly."],
            ['q' => "What tools do you use?", 'a' => "We primarily use Figma for design and prototyping, ensuring seamless collaboration and developer handoff."],
            ['q' => "Do you provide source files?", 'a' => "Yes, you receive full access to the Figma files and all asset exports."]
        ],
        'comparison' => [
            ['category' => 'Deliverables', 'items' => [['name' => 'Figma Source', 'values' => [true, true, true]], ['name' => 'Prototype', 'values' => ['Clickable', 'Interactive', 'High-Fidelity']]]]
        ]
    ],
    'social' => [
        'plans' => [
            ['name' => 'Starter', 'price' => '$1,500/mo', 'desc' => 'Consistent presence on key platforms.', 'features' => ['12 Posts / Month', '2 Platforms', 'Community Management', 'Monthly Report', 'Content Calendar'], 'is_popular' => 0],
            ['name' => 'Growth', 'price' => '$3,500/mo', 'desc' => 'Aggressive growth strategy with ad management.', 'features' => ['20 Posts / Month', '4 Platforms', 'Ad Campaign Mgmt', 'Video Content (Reels)', 'Weekly Reporting'], 'is_popular' => 1],
            ['name' => 'Domination', 'price' => '$7,000/mo', 'desc' => 'Full agency takeover of your social brand.', 'features' => ['Daily Posting', 'All Platforms', 'Influencer Outreach', 'Viral Content Strategy', '24/7 Monitoring'], 'is_popular' => 0]
        ],
        'faqs' => [
            ['q' => "Do I need to provide content?", 'a' => "We can work with your existing assets or create everything from scratch including copy and graphics."],
            ['q' => "Is ad spend included?", 'a' => "No, ad spend is paid directly to the platforms (Meta, LinkedIn, etc.), but we manage the budget and optimization included in the fee."]
        ],
        'comparison' => [
            ['category' => 'Content', 'items' => [['name' => 'Posts/Mo', 'values' => ['12', '20', '30+']], ['name' => 'Video', 'values' => [false, '4 Reels', 'Unlimited']]]]
        ]
    ]
];

echo "Starting Pricing Migration...\n";

// Ensure tables exist
$pdo->exec("CREATE TABLE IF NOT EXISTS pricing_plans (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    type VARCHAR(50) NOT NULL,
    plan_name VARCHAR(255) NOT NULL,
    price VARCHAR(100) NOT NULL,
    description TEXT,
    features LONGTEXT,
    is_popular BOOLEAN DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)");

$pdo->exec("DROP TABLE IF EXISTS pricing_faqs");
$pdo->exec("CREATE TABLE IF NOT EXISTS pricing_faqs (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    type VARCHAR(50) NOT NULL,
    q TEXT NOT NULL,
    a TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)");

$pdo->exec("CREATE TABLE IF NOT EXISTS site_config (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    config_key VARCHAR(255) UNIQUE NOT NULL,
    config_value LONGTEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)");

foreach ($pricingData as $type => $data) {
    echo "Processing $type...\n";

    // 1. Plans
    $stmt = $pdo->prepare("SELECT COUNT(*) FROM pricing_plans WHERE type = ?");
    $stmt->execute([$type]);
    if ($stmt->fetchColumn() == 0) {
        $insert = $pdo->prepare("INSERT INTO pricing_plans (type, plan_name, price, description, features, is_popular) VALUES (?, ?, ?, ?, ?, ?)");
        foreach ($data['plans'] as $plan) {
            $insert->execute([
                $type,
                $plan['name'],
                $plan['price'],
                $plan['desc'],
                json_encode($plan['features']),
                $plan['is_popular']
            ]);
        }
        echo "  - Inserted plans for $type\n";
    } else {
        echo "  - Plans already exist for $type. Skipping.\n";
    }

    // 2. FAQs
    $stmt = $pdo->prepare("SELECT COUNT(*) FROM pricing_faqs WHERE type = ?");
    $stmt->execute([$type]);
    if ($stmt->fetchColumn() == 0) {
        $insert = $pdo->prepare("INSERT INTO pricing_faqs (type, q, a) VALUES (?, ?, ?)");
        foreach ($data['faqs'] as $faq) {
            $insert->execute([
                $type,
                $faq['q'],
                $faq['a']
            ]);
        }
        echo "  - Inserted FAQs for $type\n";
    } else {
        echo "  - FAQs already exist for $type. Skipping.\n";
    }

    // 3. Comparison
    $configKey = "pricing_comparison_$type";
    $stmt = $pdo->prepare("SELECT COUNT(*) FROM site_config WHERE config_key = ?");
    $stmt->execute([$configKey]);
    if ($stmt->fetchColumn() == 0) {
        $insert = $pdo->prepare("INSERT INTO site_config (config_key, config_value) VALUES (?, ?)");
        $insert->execute([$configKey, json_encode($data['comparison'])]);
        echo "  - Inserted Comparison Matrix for $type\n";
    } else {
        echo "  - Comparison Matrix already exists for $type. Skipping.\n";
    }
}

echo "Pricing Migration Complete.\n";
?>
