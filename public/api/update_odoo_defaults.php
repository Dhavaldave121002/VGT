<?php
require_once 'db_connect.php';

// Odoo Data from Odoo.jsx
$odooData = [
    'name' => 'Odoo Customization',
    'features' => [
        ['title' => 'ERP Setup & Config', 'icon' => 'bi-gear-wide-connected', 'desc' => 'Seamless Odoo ERP installation tailored to your unique business architecture.'],
        ['title' => 'Module Development', 'icon' => 'bi-puzzle', 'desc' => 'Creating custom Odoo modules and enhancing existing features for better utility.'],
        ['title' => 'Workflow Automation', 'icon' => 'bi-robot', 'desc' => 'Optimizing business processes with intelligent, automated Odoo workflows.'],
        ['title' => 'ERP Integration', 'icon' => 'bi-link-45deg', 'desc' => 'Connecting your website and external platforms directly with your Odoo ecosystem.'],
        ['title' => 'Data Migration', 'icon' => 'bi-database-up', 'desc' => 'Securely moving your business data into Odoo with zero loss and full integrity.'],
        ['title' => 'Training & Support', 'icon' => 'bi-headset', 'desc' => 'Comprehensive user training and ongoing Odoo maintenance for peak performance.'],
    ],
    'techStack' => [
        ['name' => 'Python', 'icon' => 'bi-filetype-py', 'color' => 'text-yellow-400'],
        ['name' => 'Odoo Framework', 'icon' => 'bi-box-seam', 'color' => 'text-purple-500'],
        ['name' => 'PostgreSQL', 'icon' => 'bi-database', 'color' => 'text-blue-400'],
        ['name' => 'XML/QWeb', 'icon' => 'bi-file-earmark-code', 'color' => 'text-orange-400'],
        ['name' => 'JavaScript', 'icon' => 'bi-filetype-js', 'color' => 'text-yellow-300'],
        ['name' => 'Docker', 'icon' => 'bi-box-seam', 'color' => 'text-blue-500']
    ],
    'faqs' => [
        ['q' => "What is Odoo?", 'a' => "Odoo is an all-in-one business software that includes CRM, website/e-commerce, billing, accounting, manufacturing, warehouse - and project management, and inventory."],
        ['q' => "Can Odoo be customized for my industry?", 'a' => "Absolutely. Odoo's modular structure allows us to customize everything from workflows to reports specifically for your industry's needs."],
        ['q' => "Odoo Online vs Odoo.sh?", 'a' => "Odoo Online is SaaS-based and doesn't allow custom code. Odoo.sh is a cloud platform that allows full customization and Git integration."]
    ],
    'process' => [
        ['num' => '01', 'title' => 'Consultation', 'desc' => 'Analyze your business workflows to map out Odoo requirements.', 'icon' => 'bi-chat-dots'],
        ['num' => '02', 'title' => 'Configuration', 'desc' => 'Setting up the core Odoo environment and standard modules.', 'icon' => 'bi-sliders'],
        ['num' => '03', 'title' => 'Customization', 'desc' => 'Developing bespoke modules and automating your specific business logic.', 'icon' => 'bi-tools'],
        ['num' => '04', 'title' => 'Quality Check', 'desc' => 'Testing data integrity and workflow accuracy across the system.', 'icon' => 'bi-patch-check'],
        ['num' => '05', 'title' => 'Deployment', 'desc' => 'Go-live and staff training for a smooth transition to your new ERP.', 'icon' => 'bi-rocket']
    ],
    'protocolDetails' => []
];

$key = 'service_config_odoo';
$json = json_encode($odooData);

// Update or Insert
$stmt = $pdo->prepare("INSERT INTO site_config (config_key, config_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE config_value = ?");
if ($stmt->execute([$key, $json, $json])) {
    echo "Odoo Defaults Updated Successfully with Rich Content.";
} else {
    echo "Error updating Odoo defaults.";
}
?>
