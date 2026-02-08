import React, { useState } from 'react';
import { Link, useLocation, Outlet, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaChartLine, FaBoxOpen, FaUsers, FaProjectDiagram,
  FaTags, FaRocket, FaBell, FaSearch, FaUserCircle,
  FaBars, FaTimes, FaCog, FaSignOutAlt, FaShieldAlt, FaBriefcase, FaQuoteLeft, FaNewspaper, FaEnvelope, FaUserShield, FaLayerGroup, FaCalculator, FaComments, FaExternalLinkAlt, FaHistory, FaPaperPlane
} from 'react-icons/fa';
import logo from '../../assets/vglogo.jpg';
import { SessionManager } from '../../utils/SessionManager';


const sidebarLinks = [
  { name: 'Dashboard', path: '/admin/dashboard', icon: <FaChartLine /> },
  { name: 'Accounting Hub', path: '/admin/dashboard/accounting', icon: <FaCalculator /> },
  { name: 'Blog & Insights', path: '/admin/dashboard/blog', icon: <FaNewspaper /> },
  { name: 'Success Stories', path: '/admin/dashboard/testimonials', icon: <FaQuoteLeft /> },
  { name: 'Team Visionaries', path: '/admin/dashboard/team', icon: <FaUsers /> },
  { name: 'Careers & Hiring', path: '/admin/dashboard/career', icon: <FaBriefcase /> },
  { name: 'Job Applications', path: '/admin/dashboard/applications', icon: <FaEnvelope /> },
  { name: 'Pricing & Plans', path: '/admin/dashboard/pricing', icon: <FaTags /> },
  { name: 'Portfolio Projects', path: '/admin/dashboard/portfolio', icon: <FaProjectDiagram /> },
  { name: 'Referral Program', path: '/admin/dashboard/referrals', icon: <FaRocket /> },
  { name: 'Inbound Leads', path: '/admin/dashboard/leads', icon: <FaBoxOpen /> },
  { name: 'Brand Partners', path: '/admin/dashboard/brands', icon: <FaUsers /> },
  { name: 'Team Access', path: '/admin/dashboard/users', icon: <FaUserShield /> },
  { name: 'Services', path: '/admin/dashboard/services', icon: <FaLayerGroup /> },
  { name: 'Timeline History', path: '/admin/dashboard/timeline', icon: <FaHistory /> },
  { name: 'Marketing Node', path: '/admin/dashboard/marketing', icon: <FaPaperPlane /> },
  { name: 'Legal Policies', path: '/admin/dashboard/legal', icon: <FaShieldAlt /> },
  { name: 'Contacts & Meetings', path: '/admin/dashboard/contacts', icon: <FaComments /> },
];

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // 1. Get Session Data Safe
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    try {
      const saved = SessionManager.getSession();
      if (saved) {
        setSession(saved);
      } else {
        navigate('/admin');
      }
    } catch (e) {
      console.error("Auth Fail:", e);
      navigate('/admin');
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  const isMaster = session?.isMaster;

  // 3. Filter Sidebar Links (Restrict Accounting, Marketing & Team Access)
  const filteredLinks = sidebarLinks.filter(link => {
    if (!isMaster) {
      if (link?.path?.includes('accounting') || link?.path?.includes('marketing') || link?.path?.includes('users') || link?.path?.includes('pricing') || link?.path?.includes('legal') || link?.path?.includes('team')) {
        return false;
      }
    }
    return true;
  });

  const handleSignOut = () => {
    SessionManager.clearSession();
    setSession(null);
    navigate('/admin');
  };

  if (loading) return <div className="h-screen bg-[#030712] flex items-center justify-center"><div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div></div>;
  if (!session) return null;

  return (
    <div className="h-screen bg-[#030712] flex overflow-hidden font-sans selection:bg-blue-500/30">

      {/* Sidebar - Desktop */}
      <motion.aside
        initial={false}
        animate={{ width: collapsed ? 0 : 280 }}
        className="hidden lg:flex flex-col bg-[#080c18] border-r border-white/5 relative z-[30] overflow-hidden"
      >
        <div className="h-16 flex items-center px-6 border-b border-white/5 flex-shrink-0 min-w-[280px]">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Vertex" className="w-8 h-8 rounded-lg" />
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-white font-black tracking-tight"
            >
              VERTEX <span className="text-blue-500 uppercase">Admin</span>
            </motion.span>
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2 custom-scrollbar min-w-[280px]">
          {filteredLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all group ${isActive
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20'
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`}
              >
                <div className={`text-xl ${isActive ? 'text-white' : 'text-blue-500/50 group-hover:text-blue-400'}`}>
                  {link.icon}
                </div>
                <span className="text-sm font-bold tracking-wide whitespace-nowrap">{link.name}</span>
              </Link>
            );
          })}
        </nav>


      </motion.aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 relative">

        {/* Top Header */}
        <header className="h-16 bg-[#080c18]/80 backdrop-blur-2xl border-b border-white/5 flex items-center justify-between px-4 z-[20] sticky top-0 flex-shrink-0">
          <div className="flex items-center gap-4 flex-1">
            <button
              className="lg:hidden text-white text-2xl p-2 hover:bg-white/5 rounded-xl transition-all"
              onClick={() => setMobileOpen(true)}
            >
              <FaBars />
            </button>

            {/* Desktop Sidebar Toggle & Logo (Collapsed State) */}
            <div className="hidden lg:flex items-center gap-4">
              <button
                className="text-white text-xl p-2.5 hover:bg-white/5 rounded-xl transition-all border border-white/5 bg-white/[0.02] active:scale-95"
                onClick={() => setCollapsed(!collapsed)}
                title={collapsed ? "Open Sidebar" : "Close Sidebar"}
              >
                {collapsed ? <FaBars /> : <FaTimes />}
              </button>

              {collapsed && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-3 mr-4"
                >
                  <img src={logo} alt="Vertex" className="w-8 h-8 rounded-lg" />
                  <span className="text-white font-black tracking-tight leading-none">
                    VERTEX <span className="text-blue-500 uppercase">Admin</span>
                  </span>
                </motion.div>
              )}
            </div>
            <div className="hidden md:flex items-center gap-3 px-5 py-2.5 bg-black/40 rounded-xl border border-white/5 w-96 max-w-full focus-within:border-blue-500/50 transition-all">
              <FaSearch className="text-gray-500" />
              <input
                type="text"
                placeholder="PROMPT COMMAND OR DATA..."
                className="bg-transparent border-none text-[10px] text-white focus:outline-none w-full font-mono uppercase tracking-widest p-0"
              />
            </div>
          </div>

          <div className="flex items-center gap-4 md:gap-8">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-600/10 border border-blue-500/20 text-[9px] text-blue-400 font-black uppercase tracking-widest">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6] animate-pulse"></div>
              {isMaster ? 'Master_Node 01' : 'Team_Node 01'}
            </div>

            <div className="flex items-center gap-4">
              <button className="relative text-gray-400 hover:text-white transition-all hover:scale-110">
                <FaBell size={18} />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#080c18]"></span>
              </button>

              {/* View Website Link */}
              <Link
                to="/"
                target="_blank"
                className="hidden sm:flex items-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-[9px] font-black uppercase tracking-widest text-gray-400 hover:text-white transition-all border border-white/5 hover:border-white/10"
              >
                View Website <FaExternalLinkAlt size={10} />
              </Link>

              <div className="h-8 w-[1px] bg-white/10 mx-2"></div>

              <div className="flex items-center gap-3 group cursor-pointer">
                <div className="text-right hidden md:block">
                  <p className="text-[10px] font-black text-white leading-none uppercase tracking-widest">{session?.name?.replace(' ', '_') || 'MASTER_ADMIN'}</p>
                  <p className="text-[8px] text-blue-500/60 font-black uppercase mt-1 tracking-tighter">{session?.clearance || 'L5'} Clearance</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white text-lg border border-white/10 group-hover:scale-105 transition-transform shadow-lg shadow-blue-900/20">
                  <FaUserCircle />
                </div>
              </div>

              {/* Header Logout Button */}
              <button
                onClick={handleSignOut}
                className="flex items-center justify-center w-10 h-10 text-red-400 hover:text-white hover:bg-red-500/20 rounded-xl transition-all border border-transparent hover:border-red-500/30"
                title="Sign Out"
              >
                <FaSignOutAlt />
              </button>
            </div>
          </div>
        </header>

        {/* Dynamic Route Content */}
        <main
          id="admin-scroll-container"
          className="flex-1 overflow-y-auto p-4 md:p-10 custom-scrollbar bg-gradient-to-br from-transparent to-blue-900/[0.02]"
        >
          <div className="max-w-[1600px] mx-auto">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] lg:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-[300px] bg-[#080c18] border-r border-white/10 z-[101] flex flex-col lg:hidden"
            >
              <div className="h-20 flex justify-between items-center px-6 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <img src={logo} alt="Vertex" className="w-8 h-8 rounded-lg" />
                  <span className="text-white font-black uppercase text-xs tracking-[0.2em]">Command Center</span>
                </div>
                <button onClick={() => setMobileOpen(false)} className="text-white bg-white/5 p-2 rounded-lg hover:bg-white/10 transition-colors">
                  <FaTimes />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                {filteredLinks.map((link) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <Link
                      key={link.name}
                      to={link.path}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-4 px-4 py-4 rounded-xl transition-all ${isActive
                        ? 'bg-blue-600 text-white shadow-xl shadow-blue-900/40'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                        }`}
                    >
                      <div className={`text-xl ${isActive ? 'text-white' : 'text-blue-500/50'}`}>{link.icon}</div>
                      <span className="font-bold text-sm tracking-wide">{link.name}</span>
                    </Link>
                  );
                })}
              </nav>

              <div className="p-6 border-t border-white/5 mt-auto bg-black/20">
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center justify-center gap-3 py-4 bg-red-600 text-white rounded-2xl font-black uppercase text-[10px] tracking-[0.3em] hover:bg-red-500 shadow-xl shadow-red-900/20 active:scale-95 transition-all"
                >
                  <FaSignOutAlt /> Terminate Session
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminLayout;
