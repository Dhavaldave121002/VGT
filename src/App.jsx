// src/App.jsx
import React, { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import FloatingActions from './components/FloatingActions/FloatingActions'
import './index.css'

/*
  NOTE -> Make sure the files below actually exist.
  Common Vite error: "Failed to resolve import './pages/SomePage' " happens when a file is missing.
  If you haven't created a page yet, either:
    - create the file (e.g. src/pages/services/Informative.jsx), or
    - point the import to an existing file, or
    - add a tiny placeholder component to avoid build errors.
*/

import LogoPreloader from './components/UI/LogoPreloader'
import CookieConsent from './components/UI/CookieConsent'
import BackToTop from './components/UI/BackToTop'

// Lazy pages
const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))

/* Services pages (direct) */
const Informative = lazy(() => import('./pages/services/Informative'))
const Dynamic = lazy(() => import('./pages/services/Dynamic'))
const Ecommerce = lazy(() => import('./pages/services/Ecommerce'))
const Application = lazy(() => import('./pages/services/Application'))
const UIUX = lazy(() => import('./pages/services/UIUX')) // single UI/UX page
const Odoo = lazy(() => import('./pages/services/Odoo'))
const SocialMedia = lazy(() => import('./pages/services/SocialMedia'))
const Redesign = lazy(() => import('./pages/services/Redesign'))

/* Pricing pages (direct) */
const WebsitePricing = lazy(() => import('./pages/pricing/WebsitePricing'))
const ApplicationPricing = lazy(() => import('./pages/pricing/ApplicationPricing'))
const UIUXPricing = lazy(() => import('./pages/pricing/UIUXPricing'))
const OdooPricing = lazy(() => import('./pages/pricing/OdooPricing'))
const SocialPricing = lazy(() => import('./pages/pricing/SocialPricing'))

/* Other pages */
import Career from './pages/Career';
const Referral = lazy(() => import('./pages/Referral'))
const Contact = lazy(() => import('./pages/Contact'))
const NotFound = lazy(() => import('./pages/NotFound'))

const Portfolio = lazy(() => import('./pages/Portfolio'))
const Blog = lazy(() => import('./pages/Blog'))
const Maintenance = lazy(() => import('./pages/services/Maintenance'))
const Privacy = lazy(() => import('./pages/Privacy'))
const Terms = lazy(() => import('./pages/Terms'))
const Cookies = lazy(() => import('./pages/Cookies'))

/* Admin Suite (Next-Level) */
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'))
const AdminVerify = lazy(() => import('./pages/admin/AdminVerify'))
const AdminLayout = lazy(() => import('./pages/admin/AdminLayout'))
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'))
const PricingManager = lazy(() => import('./pages/admin/PricingManager'))
const PortfolioManager = lazy(() => import('./pages/admin/PortfolioManager'))
const ReferralManager = lazy(() => import('./pages/admin/ReferralManager'))
const LeadManager = lazy(() => import('./pages/admin/LeadManager'))
const BrandManager = lazy(() => import('./pages/admin/BrandManager'))
const UserManager = lazy(() => import('./pages/admin/UserManager'))
const JobsManager = lazy(() => import('./pages/admin/JobsManager'))
const TestimonialManager = lazy(() => import('./pages/admin/TestimonialManager'))
const TeamManager = lazy(() => import('./pages/admin/TeamManager'))
const BlogManager = lazy(() => import('./pages/admin/BlogManager'))
const ApplicationManager = lazy(() => import('./pages/admin/ApplicationManager'))
const ServiceManager = lazy(() => import('./pages/admin/ServiceManager'))
const AccountingManager = lazy(() => import('./pages/admin/AccountingManager'))
const ContactManager = lazy(() => import('./pages/admin/ContactManager'))
const TimelineManager = lazy(() => import('./pages/admin/TimelineManager'))
const MarketingManager = lazy(() => import('./pages/admin/MarketingManager'))
const LegalManager = lazy(() => import('./pages/admin/LegalManager'))

import ScrollToTop from './components/UI/ScrollToTop'
import { api } from './utils/api'

// AppContent component to handle conditional rendering based on route
const AppContent = () => {
  const [loading, setLoading] = React.useState(true);
  const location = useLocation();

  React.useEffect(() => {
    // Check system health on load
    const checkHealth = async () => {
      try {
        // Minimum wait for branding impact
        const apiHealthy = await api.checkConnection();
        console.log("System Health - API:", apiHealthy ? "ONLINE" : "OFFLINE");
      } catch (e) {
        console.error("System health check critical failure", e);
      } finally {
        // Always hide loader after logic completes
        setLoading(false);
      }
    };

    const timer = setTimeout(checkHealth, 2500);
    return () => clearTimeout(timer);
  }, []);

  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      {!isAdminRoute && <Header />}

      <main id="main" className="flex-grow">
        <Suspense fallback={
          <div className="h-screen w-full flex items-center justify-center bg-[#030712]">
            <div className="w-8 h-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
        }>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />

            {/* Services direct routes */}
            <Route path="/services/informative" element={<Informative />} />
            <Route path="/services/dynamic" element={<Dynamic />} />
            <Route path="/services/ecommerce" element={<Ecommerce />} />

            <Route path="/services/application" element={<Application />} />
            <Route path="/services/uiux" element={<UIUX />} />
            <Route path="/services/maintenance" element={<Maintenance />} />
            <Route path="/services/odoo" element={<Odoo />} />
            <Route path="/services/social-media" element={<SocialMedia />} />
            <Route path="/services/redesign" element={<Redesign />} />

            {/* Pricing direct routes */}
            <Route path="/pricing/website" element={<WebsitePricing />} />
            <Route path="/pricing/application" element={<ApplicationPricing />} />
            <Route path="/pricing/uiux" element={<UIUXPricing />} />
            <Route path="/pricing/odoo" element={<OdooPricing />} />
            <Route path="/pricing/social-media" element={<SocialPricing />} />

            <Route path="/career" element={<Career />} />
            <Route path="/referral" element={<Referral />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/blog" element={<Blog />} />

            {/* Legal */}
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/cookies" element={<Cookies />} />

            {/* Admin Suite Routes */}
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/verify" element={<AdminVerify />} />
            <Route path="/admin/dashboard" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="pricing" element={<PricingManager />} />
              <Route path="portfolio" element={<PortfolioManager />} />
              <Route path="referrals" element={<ReferralManager />} />
              <Route path="leads" element={<LeadManager />} />
              <Route path="brands" element={<BrandManager />} />
              <Route path="users" element={<UserManager />} />
              <Route path="career" element={<JobsManager />} />
              <Route path="testimonials" element={<TestimonialManager />} />
              <Route path="team" element={<TeamManager />} />
              <Route path="blog" element={<BlogManager />} />
              <Route path="applications" element={<ApplicationManager />} />
              <Route path="services" element={<ServiceManager />} />
              <Route path="accounting" element={<AccountingManager />} />
              <Route path="contacts" element={<ContactManager />} />
              <Route path="timeline" element={<TimelineManager />} />
              <Route path="marketing" element={<MarketingManager />} />
              <Route path="legal" element={<LegalManager />} />
            </Route>

            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </Suspense>
      </main>

      {!isAdminRoute && <Footer />}

      {!isAdminRoute && (
        <FloatingActions
          position="right"
          floatingButtonSize="medium"
          darkMode={true}
          zIndex={110}
          enablePulse={true}
          showCallButton={true}
          showEmailButton={true}
          enableRipple={true}
          showBadgeCount={false}
          autoClose={false}
          whatsappNumbers={[
            {
              number: '+919876543210',
              label: 'Sales Enquiry',
              icon: 'bi-whatsapp',
              description: 'Chat for new projects'
            },
            {
              number: '+919876543211',
              label: 'Technical Support',
              icon: 'bi-gear',
              description: 'Chat for existing projects'
            }
          ]}
          phoneNumbers={[
            {
              number: '+919876543210',
              label: 'Sales Department',
              icon: 'bi-telephone',
              description: 'Speak to sales'
            },
            {
              number: '+919876543211',
              label: 'Customer Care',
              icon: 'bi-headset',
              description: 'Get support'
            }
          ]}
        />
      )}
      {!isAdminRoute && <CookieConsent />}

      <AnimatePresence>
        {loading && <LogoPreloader />}
      </AnimatePresence>
    </div>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppContent />
    </BrowserRouter>
  )
}