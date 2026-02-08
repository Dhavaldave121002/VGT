import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../../assets/vglogo.jpg';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();

  // Effect to handle scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location]);

  const toggleDropdown = (name) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const navigation = [
    { name: 'Home', path: '/' },
    {
      name: 'Services',
      dropdown: [
        { name: 'Informative Website', path: '/services/informative' },
        { name: 'Dynamic Website', path: '/services/dynamic' },
        { name: 'E-Commerce Solution', path: '/services/ecommerce' },
        { name: 'Mobile Application', path: '/services/application' },
        { name: 'UI/UX Design', path: '/services/uiux' },
        { name: 'Maintenance', path: '/services/maintenance' },
        { name: 'Odoo Customization', path: '/services/odoo' },
        { name: 'Social Media Marketing', path: '/services/social-media' },
        { name: 'Website Redesign', path: '/services/redesign' },
      ]
    },
    {
      name: 'Pricing',
      dropdown: [
        { name: 'Website Packages', path: '/pricing/website' },
        { name: 'Mobile Plans', path: '/pricing/application' },
        { name: 'UI/UX Services', path: '/pricing/uiux' },
        { name: 'Odoo ERP Plans', path: '/pricing/odoo' },
        { name: 'Social Media Plans', path: '/pricing/social-media' },
      ]
    },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'About', path: '/about' },
    { name: 'Blog', path: '/blog' },
    { name: 'Career', path: '/career' },
    { name: 'Refer & Earn', path: '/referral' },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#030712]/95 backdrop-blur-xl border-b border-white/10 shadow-lg' : 'bg-[#030712] lg:bg-gradient-to-b lg:from-black/80 lg:to-transparent'}`}
      >
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group z-50 relative">
            <img
              src={logo}
              alt="Vertex Global Tech"
              className="w-12 h-12 object-contain rounded-xl hover:scale-105 transition-transform duration-300 shadow-lg shadow-blue-500/20"
            />
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-bold tracking-tight text-white group-hover:text-blue-400 transition-colors leading-none whitespace-nowrap">
                Vertex <span className="text-blue-500">Global Tech</span>
              </span>
              <span className="text-[8px] sm:text-[10px] uppercase tracking-[0.15em] sm:tracking-[0.2em] text-gray-500 font-bold mt-0.5 sm:mt-1 group-hover:text-blue-400/70 transition-colors">
                Innovate. Transform. Scale.
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navigation.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => setHoveredLink(item.name)}
                onMouseLeave={() => setHoveredLink(null)}
              >
                {!item.dropdown ? (
                  <Link
                    to={item.path}
                    className={`text-sm font-medium transition-colors hover:text-blue-400 ${location.pathname === item.path ? 'text-blue-500' : 'text-gray-300'} `}
                  >
                    {item.name}
                  </Link>
                ) : (
                  <button
                    className={`text-sm font-medium transition-colors flex items-center gap-1 ${hoveredLink === item.name ? 'text-blue-400' : 'text-gray-300'} `}
                  >
                    {item.name}
                    <i className={`bi bi-chevron-down text-[10px] transition-transform ${hoveredLink === item.name ? 'rotate-180' : ''} `}></i>
                  </button>
                )}

                {/* Dropdown Menu - State Based */}
                <AnimatePresence>
                  {item.dropdown && hoveredLink === item.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 15 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-4 z-[100]"
                    >
                      {/* Bridge to keep it open */}
                      <div className="absolute -top-4 left-0 w-full h-8 bg-transparent"></div>

                      <div className="bg-[#0f172a] border border-blue-500/20 rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] p-2 w-64 backdrop-blur-xl ring-1 ring-white/10">
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem.name}
                            to={subItem.path}
                            className="block px-4 py-3 rounded-lg text-sm text-gray-300 hover:bg-blue-600/10 hover:text-blue-400 transition-all flex items-center justify-between group/link"
                          >
                            {subItem.name}
                            <i className="bi bi-arrow-right opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all text-blue-500"></i>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
            <Link
              to="/contact"
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-sm font-semibold transition-all shadow-lg shadow-blue-900/20 hover:shadow-blue-600/40 transform hover:-translate-y-0.5"
            >
              Get Started
            </Link>
          </nav>

          {/* Mobile Toggle - Professional Animated Design */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
            className="lg:hidden relative z-50"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {/* Highlighted Background Box */}
            <div className={`relative overflow-hidden rounded-2xl transition-all duration-300 ${mobileMenuOpen
                ? 'bg-gradient-to-br from-blue-600 to-purple-600 shadow-xl shadow-blue-500/50'
                : 'bg-white/10 backdrop-blur-md border border-white/20 shadow-lg hover:bg-white/20'
              }`}>
              {/* Glow Effect */}
              <div className={`absolute inset-0 bg-gradient-to-r from-blue-400/30 to-purple-400/30 blur-lg transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-100' : 'opacity-0'
                }`}></div>

              {/* Icon Container */}
              <div className="relative w-12 h-12 flex items-center justify-center">
                <AnimatePresence mode="wait">
                  {mobileMenuOpen ? (
                    <motion.i
                      key="close"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      transition={{ duration: 0.2 }}
                      className="bi bi-x-lg text-2xl text-white"
                    ></motion.i>
                  ) : (
                    <motion.i
                      key="menu"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      transition={{ duration: 0.2 }}
                      className="bi bi-list text-2xl text-white"
                    ></motion.i>
                  )}
                </AnimatePresence>
              </div>

            </div>
          </motion.button>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay - Portal to Body */}
      {createPortal(
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-[#030712] z-[99999] flex flex-col pt-6 px-6 overflow-y-auto"
              style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%' }}
            >
              <div className="flex justify-between items-center mb-8">
                {/* Logo in Menu */}
                <div className="flex items-center gap-3">
                  <img src={logo} alt="Vertex" className="w-10 h-10 rounded-xl" />
                  <span className="text-xl font-bold text-white">Vertex <span className="text-blue-500">Global Tech</span></span>
                </div>
                {/* Close Button Inside Menu */}
                <button
                  className="text-white p-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <i className="bi bi-x-lg text-2xl"></i>
                </button>
              </div>

              <div className="flex flex-col space-y-4 pb-10">
                {navigation.map((item) => (
                  <div key={item.name} className="border-b border-white/5 pb-4">
                    {!item.dropdown ? (
                      <Link
                        to={item.path}
                        className="text-2xl font-bold text-white block"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ) : (
                      <div>
                        <button
                          onClick={() => toggleDropdown(item.name)}
                          className="w-full flex justify-between items-center text-2xl font-bold text-white mb-2"
                        >
                          {item.name}
                          <i className={`bi bi-chevron-down text-base text-blue-500 transition-transform ${activeDropdown === item.name ? 'rotate-180' : ''}`}></i>
                        </button>

                        <AnimatePresence>
                          {activeDropdown === item.name && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="flex flex-col space-y-3 pl-4 border-l-2 border-blue-500/20 ml-2 mt-2">
                                {item.dropdown.map((subItem) => (
                                  <Link
                                    key={subItem.name}
                                    to={subItem.path}
                                    className="text-lg text-gray-400 hover:text-white transition-colors py-1"
                                    onClick={() => setMobileMenuOpen(false)}
                                  >
                                    {subItem.name}
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )}
                  </div>
                ))}
                <div className="pt-4">
                  <Link
                    to="/contact"
                    className="w-full block text-center py-4 rounded-xl bg-blue-600 text-white font-bold text-lg"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Start Project
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};

export default Header;