-- Database: vertex_db
CREATE DATABASE IF NOT EXISTS vertex_db;
USE vertex_db;

-- Table: users
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    actualEmail VARCHAR(255),
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'Editor',
    clearance VARCHAR(10) DEFAULT 'L3',
    status VARCHAR(20) DEFAULT 'Offline',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Default Users
INSERT IGNORE INTO users (id, name, role, email, actualEmail, password, status, clearance) VALUES
(1, 'Admin Root', 'Super Admin', 'admin@vgt.tech', 'connectvertexglobal2209@gmail.com', 'admin', 'Online', 'L5'),
(2, 'Dhaval Dave', 'Super Admin', 'dhaval@vgt.tech', 'dhavaldave121002@gmail.com', 'vgtw1210', 'Offline', 'L5');

-- Table: blogs
CREATE TABLE IF NOT EXISTS blogs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) DEFAULT 'Technology',
    date VARCHAR(50),
    excerpt TEXT,
    content LONGTEXT,
    image LONGTEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Default Blogs
INSERT IGNORE INTO blogs (id, title, category, date, excerpt, content, image) VALUES
(1, 'The Future of AI in Web Development', 'Technology', 'Oct 24, 2024', 'Artificial Intelligence is revolutionizing how we build and interact with the web.', 'Full content about AI in web dev...', 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800'),
(2, 'Mastering React Performance', 'Development', 'Nov 12, 2024', 'Tips and tricks to make your React applications fly.', 'Full content about React performance...', 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800');


-- Table: projects (Portfolio)
CREATE TABLE IF NOT EXISTS projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    type VARCHAR(100),
    img LONGTEXT,
    logo LONGTEXT,
    liveUrl VARCHAR(255),
    category VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Default Projects
INSERT IGNORE INTO projects (id, title, type, category, img, logo, liveUrl) VALUES
(1, 'Crypto Wallet v2', 'FinTech', 'FinTech', 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?q=80&w=800', 'https://cdn-icons-png.flaticon.com/512/825/825540.png', '#'),
(2, 'Neon E-Commerce', 'E-Commerce', 'E-Commerce', 'https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=800', 'https://cdn-icons-png.flaticon.com/512/3081/3081559.png', '#'),
(3, 'HealthTrack App', 'Healthcare', 'Healthcare', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800', 'https://cdn-icons-png.flaticon.com/512/2966/2966327.png', '#');

-- Table: tech_stack
CREATE TABLE IF NOT EXISTS tech_stack (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    icon VARCHAR(100),
    color VARCHAR(50)
);

-- Default Tech Stack
INSERT IGNORE INTO tech_stack (id, name, icon, color) VALUES
(1, 'React', 'FaReact', 'text-blue-400'),
(2, 'Node.js', 'FaNodeJs', 'text-green-500'),
(3, 'Python', 'FaPython', 'text-yellow-400'),
(4, 'AWS', 'FaAws', 'text-orange-500');

-- Table: services
CREATE TABLE IF NOT EXISTS services (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: pricing
CREATE TABLE IF NOT EXISTS pricing (
    id INT AUTO_INCREMENT PRIMARY KEY,
    type VARCHAR(50) DEFAULT 'website',
    plan_name VARCHAR(100) NOT NULL,
    price VARCHAR(50),
    description TEXT,
    features TEXT, 
    is_popular BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Default Pricing Plans
INSERT IGNORE INTO pricing (id, type, plan_name, price, description, features, is_popular) VALUES
(1, 'website', 'Starter', '$2,500', 'Perfect for small businesses establishing a digital presence.', '["Unique 5-Page Design", "Mobile-Responsive", "Google Search Setup", "Contact Form Integration", "Fast Loading Speed"]', 0),
(2, 'website', 'Business', '$5,000', 'Comprehensive solution for growing companies.', '["Easy-to-Edit Dashboard", "15 Pages", "Rank Higher Package", "Blog / News Section", "Visitor Analytics", "Social Media Sync"]', 1),
(3, 'website', 'Enterprise', 'Custom', 'Full-scale digital platforms with custom functionality.', '["Fully Custom Functionality", "Unlimited Pages", "Priority VIP Support", "Guaranteed Uptime", "Advanced Security Suite", "Dedicated Manager"]', 0);

-- Table: pricing_faqs
CREATE TABLE IF NOT EXISTS pricing_faqs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    type VARCHAR(50) DEFAULT 'website',
    question TEXT,
    answer TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Default Pricing FAQs
INSERT IGNORE INTO pricing_faqs (id, type, question, answer) VALUES
(1, 'website', 'Is hosting included?', 'We offer hosting packages separately, but the initial setup is included.'),
(2, 'website', 'Can I edit the content myself?', 'Yes, all our business and enterprise plans come with a CMS for easy editing.');

-- Table: config_store
CREATE TABLE IF NOT EXISTS config_store (
    id INT AUTO_INCREMENT PRIMARY KEY,
    key_name VARCHAR(100) UNIQUE,
    value LONGTEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table: teams
CREATE TABLE IF NOT EXISTS teams (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(100),
    bio TEXT,
    image LONGTEXT,
    social_links TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Default Team
INSERT IGNORE INTO teams (id, name, role, image, social_links) VALUES
(1, 'James Anderson', 'CEO & Founder', 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400', '{"linkedin":"#","twitter":"#","instagram":"#","facebook":"#"}'),
(2, 'Sarah Lin', 'CTO', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400', '{"linkedin":"#","twitter":"#","instagram":"#","facebook":"#"}'),
(3, 'Michael Chen', 'Lead Developer', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400', '{"linkedin":"#","twitter":"#","instagram":"#","facebook":"#"}'),
(4, 'Emily Davis', 'Head of Design', 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400', '{"linkedin":"#","twitter":"#","instagram":"#","facebook":"#"}');


-- Table: testimonials
CREATE TABLE IF NOT EXISTS testimonials (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(100),
    message TEXT,
    rating INT DEFAULT 5,
    avatar LONGTEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Default Testimonials
INSERT IGNORE INTO testimonials (id, name, role, message, avatar) VALUES
(1, 'Sarah Johnson', 'CTO, FinTech Solutions', 'Vertex Global Tech transformed our legacy infrastructure into a state-of-the-art cloud native platform. The performance gains were immediate and substantial.', 'https://randomuser.me/api/portraits/women/44.jpg'),
(2, 'Michael Chen', 'Founder, GreenEnergy', 'Their attention to detail in UI/UX design is unmatched. Our conversion rates increased by 40% after the redesign. Highly recommended!', 'https://randomuser.me/api/portraits/men/32.jpg'),
(3, 'Emily Davis', 'Director of Marketing, OmniShop', 'Professional, responsive, and incredibly talented. They delivered our e-commerce application ahead of schedule and under budget.', 'https://randomuser.me/api/portraits/women/68.jpg');

-- Table: timeline
CREATE TABLE IF NOT EXISTS timeline (
    id INT AUTO_INCREMENT PRIMARY KEY,
    year VARCHAR(10),
    title VARCHAR(255),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Default Timeline
INSERT IGNORE INTO timeline (id, year, title, description) VALUES
(1, '2025', 'The Genesis', 'Vertex Global Tech launches its next-gen digital ecosystem platform.'),
(2, '2026', 'Global Scale', 'Expanding operations to key international markets in Europe and Asia.'),
(3, '2027', 'AI Integration', 'Full-scale deployment of proprietary AI models across all client services.');

-- Table: brands (New)
CREATE TABLE IF NOT EXISTS brands (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    icon VARCHAR(100),
    color VARCHAR(50),
    bg VARCHAR(50),
    border VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Default Brands
INSERT IGNORE INTO brands (id, name, icon, color, bg, border) VALUES
(1, 'TechNova', 'cpu', 'text-blue-400', 'bg-blue-500/10', 'border-blue-500/20'),
(2, 'FinStream', 'graph-up-arrow', 'text-emerald-400', 'bg-emerald-500/10', 'border-emerald-500/20'),
(3, 'CloudScale', 'cloud-check', 'text-cyan-400', 'bg-cyan-500/10', 'border-cyan-500/20'),
(4, 'SecureNet', 'shield-lock', 'text-purple-400', 'bg-purple-500/10', 'border-purple-500/20'),
(5, 'DataFlow', 'diagram-3', 'text-orange-400', 'bg-orange-500/10', 'border-orange-500/20'),
(6, 'UrbanArch', 'buildings', 'text-yellow-400', 'bg-yellow-500/10', 'border-yellow-500/20'),
(7, 'HealthPlus', 'heart-pulse', 'text-rose-400', 'bg-rose-500/10', 'border-rose-500/20'),
(8, 'EduVerse', 'mortarboard', 'text-pink-400', 'bg-pink-500/10', 'border-pink-500/20');

-- Table: jobs
CREATE TABLE IF NOT EXISTS jobs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    type VARCHAR(50),
    location VARCHAR(100),
    seniority VARCHAR(100),
    about TEXT,
    skills TEXT,
    responsibilities TEXT,
    qualifications TEXT,
    description TEXT,
    requirements TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Default Jobs
INSERT IGNORE INTO jobs (id, title, type, location, seniority, about, skills, responsibilities, qualifications) VALUES
(1, 'Senior React Developer', 'Full-time', 'Remote', 'Senior', 'We are looking for an experienced React developer to lead our frontend team.', '["React", "Node.js", "TypeScript"]', '["Develop features", "Lead team"]', '["5+ years experience"]'),
(2, 'UI/UX Designer', 'Contract', 'Hybrid', 'Mid-level', 'Create stunning visual experiences for our enterprise clients.', '["Figma", "Design Systems"]', '["Create wireframes", "User research"]', '["Strong portfolio"]');

-- Table: job_applications
CREATE TABLE IF NOT EXISTS job_applications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    jobId INT,
    jobTitle VARCHAR(255),
    jobType VARCHAR(100),
    name VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(20),
    message TEXT,
    resumeData LONGTEXT,
    resumeFileName VARCHAR(255),
    status VARCHAR(50) DEFAULT 'New',
    submittedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Default Applications
INSERT IGNORE INTO job_applications (id, jobId, jobTitle, name, email, phone, status) VALUES
(1, 1, 'Senior React Developer', 'John Doe', 'john.doe@example.com', '1234567890', 'New'),
(2, 2, 'UI/UX Designer', 'Jane Smith', 'jane.smith@example.com', '0987654321', 'Reviewing');

-- Table: referrals
CREATE TABLE IF NOT EXISTS referrals (
    id INT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(50) UNIQUE,
    name VARCHAR(255),
    email VARCHAR(255),
    tier VARCHAR(50) DEFAULT 'Bridge',
    referralCount INT DEFAULT 0,
    totalEarnings DECIMAL(10, 2) DEFAULT 0.00,
    status VARCHAR(50) DEFAULT 'Active',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Default Referrals
INSERT IGNORE INTO referrals (id, code, name, email, tier, referralCount, totalEarnings) VALUES
(1, 'REF123', 'Alice Cooper', 'alice@example.com', 'Nexus', 15, 750.00),
(2, 'REF456', 'Bob Marley', 'bob@example.com', 'Bridge', 5, 250.00);

-- Table: leads
CREATE TABLE IF NOT EXISTS leads (
    id INT AUTO_INCREMENT PRIMARY KEY,
    referralCode VARCHAR(50),
    name VARCHAR(255),
    phone VARCHAR(20),
    email VARCHAR(255),
    service VARCHAR(100),
    plan TEXT,
    status VARCHAR(50) DEFAULT 'New',
    submittedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Default Leads
INSERT IGNORE INTO leads (id, referralCode, name, phone, service, status) VALUES
(1, 'REF123', 'Tech Giants Inc.', '555-1234', 'Web Application', 'Converted'),
(2, 'REF456', 'Small Biz LLC', '555-5678', 'Website Redesign', 'New');

-- Table: contacts
CREATE TABLE IF NOT EXISTS contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(20),
    subject VARCHAR(255),
    service VARCHAR(100),
    message TEXT,
    status VARCHAR(50) DEFAULT 'New',
    submittedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: legal
CREATE TABLE IF NOT EXISTS legal (
    id INT AUTO_INCREMENT PRIMARY KEY,
    type VARCHAR(50),
    content LONGTEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Default Legal
INSERT IGNORE INTO legal (type, content) VALUES
('Privacy', '<h2>Privacy Policy</h2><p>This is the default privacy policy content. vertex global tech respects your privacy.</p>'),
('Terms', '<h2>Terms of Service</h2><p>These are the terms of service. By using our site, you agree to them.</p>');

-- Table: meetings
CREATE TABLE IF NOT EXISTS meetings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(20),
    subject VARCHAR(255),
    service VARCHAR(100),
    date VARCHAR(20),
    time VARCHAR(20),
    message TEXT,
    status VARCHAR(50) DEFAULT 'Scheduled',
    submittedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: subscribers (For Newsletter)
CREATE TABLE IF NOT EXISTS subscribers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE,
    status VARCHAR(50) DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
