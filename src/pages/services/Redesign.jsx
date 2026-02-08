import React, { useRef, useState } from 'react';
import { api } from '../../utils/api';
import { motion, useScroll, useInView, AnimatePresence } from 'framer-motion';
import { FaGlobe, FaCogs, FaShoppingCart, FaArrowRight, FaCheckCircle, FaRocket, FaShieldAlt, FaSync, FaTimes, FaCircleNotch } from 'react-icons/fa';
import ProcessTimeline from '../../components/Services/ProcessTimeline';
import TechStack from '../../components/Services/TechStack';
import ServiceFAQ from '../../components/Services/ServiceFAQ';
import ServiceHero3D from '../../components/UI/ServiceHero3D';
import SEO from '../../components/SEO';

const SectionHeader = ({ title, subtitle, highlight }) => (
  <div className="text-center mb-16 px-6">
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-3xl md:text-5xl font-black text-white mb-6 uppercase tracking-tight"
    >
      {title} <span className="text-blue-500">{highlight}</span>
    </motion.h2>
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2 }}
      className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
    >
      {subtitle}
    </motion.p>
  </div>
);

const ProtocolModal = ({ isOpen, onClose, protocol }) => {
  if (!protocol) return null;

  // Helper for icons based on label keywords
  const getIcon = (label) => {
    const l = label.toLowerCase();
    if (l.includes('brand') || l.includes('typography')) return <FaGlobe />;
    if (l.includes('loading') || l.includes('velocity') || l.includes('multiplier')) return <FaRocket />;
    if (l.includes('seo') || l.includes('index')) return <FaSync />;
    if (l.includes('cms') || l.includes('database') || l.includes('efficiency')) return <FaCogs />;
    if (l.includes('payment') || l.includes('security') || l.includes('stability')) return <FaShieldAlt />;
    return <FaCheckCircle />;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-xl"
          />

          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative bg-[#0f172a] border border-white/10 rounded-[2.5rem] p-8 md:p-12 max-w-3xl w-full shadow-2xl overflow-hidden"
          >
            {/* Elegant Background Glow */}
            <div className="absolute -top-24 -left-24 w-80 h-80 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none" />

            <button
              onClick={onClose}
              className="absolute top-8 right-8 text-gray-400 hover:text-white transition-colors"
            >
              <FaTimes className="text-xl" />
            </button>

            <div className="relative z-10 text-center md:text-left">
              <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4 border-b border-white/5 pb-8">
                <div>
                  <div className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em] mb-2">Optimization Protocol</div>
                  <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter">
                    {protocol.category} <span className="text-blue-500">Revamp</span>
                  </h3>
                </div>
                <div className="px-6 py-2 bg-blue-600/10 border border-blue-500/20 rounded-full">
                  <span className="text-blue-400 text-[10px] font-black uppercase tracking-widest">Executive Grade</span>
                </div>
              </div>

              <p className="text-gray-400 text-base md:text-lg mb-10 max-w-2xl leading-relaxed">
                Tuned specifications for the <span className="text-white font-bold">{protocol.category} architecture</span>. Every parameter is optimized for maximum performance and user engagement.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
                {protocol.specs?.map((spec, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="aspect-square bg-white/[0.03] border border-white/10 rounded-2xl flex flex-col items-center justify-center text-center p-4 group hover:bg-blue-600/10 hover:border-blue-500/30 transition-all duration-300"
                  >
                    <div className="text-blue-500 text-xl mb-3 group-hover:scale-110 transition-transform">
                      {getIcon(spec.label)}
                    </div>
                    <div className="text-[8px] font-bold text-gray-500 uppercase tracking-widest mb-1">{spec.label}</div>
                    <div className="text-white font-black text-xs md:text-sm tracking-tight">{spec.value}</div>
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                    <FaCircleNotch className="animate-spin text-blue-500 text-sm" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Protocol Status</span>
                    <span className="text-[10px] font-bold text-white uppercase tracking-widest">Strategic Verification</span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => window.location.href = "/contact?tab=schedule"}
                  className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white font-black rounded-xl uppercase tracking-widest text-xs flex items-center justify-center gap-3 shadow-xl shadow-blue-900/40 relative overflow-hidden group/cta"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 -translate-x-full group-hover/cta:animate-shimmer-slide" />
                  <span>Initiate Project</span> <FaArrowRight />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const SubServiceCard = ({ icon: Icon, title, desc, features, color, delay, onExplore }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, x: delay % 2 === 0 ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay: delay * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative bg-[#0f172a]/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 md:p-12 hover:border-blue-500/30 transition-all duration-500 overflow-hidden shadow-2xl"
    >
      <div className={`absolute -top-20 -right-20 w-64 h-64 bg-${color}-500/5 blur-[80px] group-hover:bg-${color}-500/10 transition-colors`}></div>

      <div className="relative z-10">
        <div className={`w-20 h-20 rounded-2xl bg-${color}-500/10 flex items-center justify-center text-${color}-400 text-4xl mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
          <Icon />
        </div>

        <h3 className="text-3xl font-black text-white mb-6 uppercase tracking-tighter group-hover:text-blue-400 transition-colors">{title}</h3>
        <p className="text-gray-400 text-lg mb-8 leading-relaxed font-medium">{desc}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {features.map((f, i) => (
            <div key={i} className="flex items-center gap-3 text-gray-500 group-hover:text-gray-300 transition-colors">
              <FaCheckCircle className="text-blue-500 shrink-0" />
              <span className="text-sm font-bold uppercase tracking-widest">{f}</span>
            </div>
          ))}
        </div>

        <motion.button
          onClick={onExplore}
          whileHover={{ x: 10 }}
          className="flex items-center gap-4 text-sm font-black text-blue-500 uppercase tracking-[0.3em] group/btn"
        >
          Explore Protocol <FaArrowRight className="text-blue-500 transition-transform group-hover/btn:translate-x-2" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default function Redesign() {
  const sectionsRef = useRef(null);
  const [selectedProtocol, setSelectedProtocol] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [features, setFeatures] = React.useState([
    { title: 'UX/UI Modernization', icon: 'bi-palette', desc: 'Crafting intuitive user journeys with modern design aesthetics.' },
    { title: 'Performance Optimization', icon: 'bi-lightning-charge', desc: 'Achieving 90+ lighthouse scores for speed and SEO rankings.' },
    { title: 'Conversion Revamp', icon: 'bi-graph-up-arrow', desc: 'Data-driven layout changes to maximize lead generation.' },
    { title: 'Responsive Continuity', icon: 'bi-phone', desc: 'Flawless experiences across all mobile and edge devices.' },
  ]);
  const [techStack, setTechStack] = React.useState([]);
  const [faqs, setFaqs] = React.useState([]);
  const [process, setProcess] = React.useState([]);
  const [protocols, setProtocols] = React.useState([
    {
      category: 'Informative', specs: [
        { label: 'Brand Tone', value: 'Corporate/Tech' },
        { label: 'Typography Alpha', value: 'Montserrat/Inter' },
        { label: 'Loading Velocity', value: '< 1.5s' },
        { label: 'SEO Index Scale', value: 'Premium Grade' }
      ]
    },
    {
      category: 'Dynamic', specs: [
        { label: 'CMS Response Time', value: '< 200ms' },
        { label: 'Database Optimization', value: 'L4 Scalability' },
        { label: 'Scalability Layer', value: 'Next.js Edge' },
        { label: 'Interaction Depth', value: 'Ultra-Immersive' }
      ]
    },
    {
      category: 'E-commerce', specs: [
        { label: 'Conversion Multiplier', value: 'Target 2.5x' },
        { label: 'Checkout Efficiency', value: 'Fast 3-Step' },
        { label: 'UX Logic Flow', value: 'AI-Enhanced' },
        { label: 'Payment Stability', value: '99.99% Global' }
      ]
    }
  ]);

  React.useEffect(() => {
    const loadData = async () => {
      const data = await api.fetchConfig('service_config_redesign');
      if (data) {
        if (data.features) setFeatures(data.features);
        if (data.techStack) setTechStack(data.techStack);
        if (data.faqs) setFaqs(data.faqs);
        if (data.process) setProcess(data.process);
        if (data.protocolDetails) setProtocols(data.protocolDetails);
      }
    };
    loadData();
  }, []);

  const subServices = [
    {
      icon: FaGlobe,
      title: "Informative Redesign",
      desc: "Transform your static corporate site into a dynamic brand experience. We focus on storytelling, clear navigation, and performance.",
      features: ["Brand Re-alignment", "SEO Retention", "Content Restructure", "Core Web Vitals"],
      color: "blue",
      delay: 1,
      category: 'Informative'
    },
    {
      icon: FaCogs,
      title: "Dynamic Redesign",
      desc: "Upgrade legacy interactive portals and CMS-driven sites. We enhance backend efficiency and frontend interactivity.",
      features: ["CMS Migration", "Database Sync", "User Dashboard UI", "API Modernization"],
      color: "purple",
      delay: 2,
      category: 'Dynamic'
    },
    {
      icon: FaShoppingCart,
      title: "E-Commerce Redesign",
      desc: "Maximize your ROI with a focus on conversion rate optimization (CRO) and seamless checkout experiences.",
      features: ["Checkout UX", "Product Catalog UI", "Payment Security", "Inventory Sync"],
      color: "emerald",
      delay: 3,
      category: 'E-commerce'
    }
  ];

  const handleOpenProtocol = (category) => {
    const proto = protocols.find(p => p.category === category) || protocols[0];
    setSelectedProtocol(proto);
    setIsModalOpen(true);
  }

  return (
    <>
      <SEO
        title="Website Redesign | Modernize Your Digital Footprint"
        description="Comprehensive redesign services for Informative, Dynamic, and E-Commerce websites. Enhance performance, UI/UX, and conversion with Vertex Global Tech."
        keywords="website redesign, site revamp, informative redesign, dynamic site upgrade, ecommerce conversion, vertex global tech"
      />

      <div className="min-h-screen bg-[#030712] font-sans selection:bg-blue-500/30">

        {/* HERO */}
        <ServiceHero3D
          title="Website Redesign"
          highlight="Transformation"
          badge="Global Services"
          subtitle="Don't just update your look. Re-engineer your digital success with our deep-tier redesign protocols."
          laptopImage="https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=1000"
          phoneImage="https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=500"
        />

        {/* VALUE PROPOSITION GRID */}
        <section className="py-32 relative overflow-hidden">
          <div className="container mx-auto px-6 max-w-7xl relative z-10">
            <SectionHeader
              title="Strategic"
              highlight="Redesign Vectors"
              subtitle="We analyze, optimize, and revolutionize. Every redesign is a mission to drive measurable growth."
            />

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white/5 border border-white/10 p-8 rounded-[2rem] hover:bg-blue-600/10 hover:border-blue-500/30 transition-all group"
                >
                  <div className="text-3xl text-blue-500 mb-6 group-hover:scale-110 transition-transform">
                    <i className={`bi ${item.icon}`}></i>
                  </div>
                  <h4 className="text-xl font-black text-white mb-4 uppercase tracking-tighter">{item.title}</h4>
                  <p className="text-gray-500 group-hover:text-gray-400 transition-colors leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* DEEP TIER SERVICES */}
        <section className="py-32 bg-[#080d1a]/50" ref={sectionsRef}>
          <div className="container mx-auto px-6 max-w-7xl">
            <SectionHeader
              title="Redesign"
              highlight="Classifications"
              subtitle="Tailored redesign protocols for every type of digital presence."
            />

            <div className="grid grid-cols-1 gap-12">
              {subServices.map((sub, i) => (
                <SubServiceCard
                  key={i}
                  {...sub}
                  onExplore={() => handleOpenProtocol(sub.category)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* STATS BREAKPOINT */}
        <section className="py-24 border-y border-white/5 bg-black/40">
          <div className="container mx-auto px-6 max-w-7xl grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {[
              { val: "40%", label: "Avg Loading Speed Boost", icon: <FaRocket /> },
              { val: "25%", label: "Conversion Lift", icon: <FaCheckCircle /> },
              { val: "100%", label: "SEO Integrity", icon: <FaSync className="animate-spin-slow" /> },
              { val: "L4", label: "Security Clearance", icon: <FaShieldAlt /> }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="space-y-3"
              >
                <div className="text-blue-500 text-2xl flex justify-center mb-4">{stat.icon}</div>
                <div className="text-4xl md:text-5xl font-black text-white tracking-widest">{stat.val}</div>
                <div className="text-[10px] font-black text-gray-600 uppercase tracking-[0.4em]">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* PROCESS TIMELINE */}
        <ProcessTimeline customSteps={process} />

        {/* TECH STACK */}
        <TechStack customStack={techStack} />

        {/* FAQ */}
        <ServiceFAQ category="Redesign" customFaqs={faqs} />

        {/* FINAL CTA */}
        <section className="py-40 relative">
          <div className="absolute inset-0 bg-blue-600/5 blur-[120px] pointer-events-none"></div>
          <div className="container mx-auto px-6 max-w-4xl text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-[#0f172a] border border-blue-500/20 p-16 rounded-[3rem] shadow-3xl"
            >
              <h2 className="text-4xl md:text-6xl font-black text-white mb-8 uppercase tracking-tighter">Initiate <span className="text-blue-500">Revamp</span></h2>
              <p className="text-xl text-gray-400 mb-12 leading-relaxed">
                Unlock the full potential of your business. Our team is ready to deploy a modern, scalable, and high-converting version of your vision.
              </p>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/contact?tab=schedule"
                className="inline-flex items-center gap-6 px-12 py-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-black rounded-2xl transition-all shadow-2xl shadow-blue-500/30 uppercase tracking-[0.3em] text-sm"
              >
                Start Protocol <FaArrowRight />
              </motion.a>
            </motion.div>
          </div>
        </section>

        <ProtocolModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          protocol={selectedProtocol}
        />
      </div>
    </>
  );
}
