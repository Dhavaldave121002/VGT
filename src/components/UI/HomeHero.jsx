// src/components/UI/HomeHero.jsx
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { FaLaptopCode, FaMobileAlt, FaLayerGroup, FaRocket, FaArrowRight, FaCheckCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Typewriter from './Typewriter';
import { Canvas } from '@react-three/fiber';
import AIOrb from './AIOrb';

const ServiceNode = ({ icon: Icon, label, color, delay, x, y, to }) => (
  <Link to={to}>
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1, x, y }}
      transition={{ duration: 0.8, delay, type: "spring", stiffness: 100 }}
      className="absolute flex items-center gap-3 p-3 rounded-xl bg-[#0f172a]/80 backdrop-blur-md border border-white/10 shadow-lg z-20 hover:scale-110 transition-transform cursor-pointer group"
    >
      <div className={`w-8 h-8 rounded-lg ${color} flex items-center justify-center text-white shadow-lg`}>
        <Icon size={14} />
      </div>
      <span className="text-xs font-bold text-white tracking-wide pr-2 hidden sm:block">{label}</span>

      {/* Floating dot for connection effect */}
      <div className="absolute -z-10 bg-white/20 w-full h-[1px] left-1/2 top-1/2 -translate-x-1/2 hidden" />
    </motion.div>
  </Link>
);

export default function HomeHero() {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();

  // Parallax effects
  const yText = useTransform(scrollY, [0, 500], [0, 100]);
  const yVisual = useTransform(scrollY, [0, 500], [0, -50]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  // Mouse interaction for 3D tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { stiffness: 150, damping: 20 });

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen bg-[#030712] flex items-center pt-20 overflow-hidden"
    >
      {/* --- Ambient Background --- */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(56,189,248,0.1)_0%,transparent_50%)]" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-purple-600/5 rounded-full blur-[120px]" />
        <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[100px]" />
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />
      </div>

      <div className="container mx-auto px-6 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* --- Left Column: Content --- */}
          <motion.div style={{ y: yText, opacity }} className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[11px] font-bold uppercase tracking-widest mb-6"
            >
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              Premimum Digital Solutions
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-6 leading-[1.1] tracking-tight"
            >
              We Build <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 text-glow">
                <Typewriter
                  texts={["Experiences", "Applications", "Identities", "The Future"]}
                  speed={80}
                  waitTime={2500}
                />
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-8 font-medium"
            >
              Transform your business with cutting-edge <span className="text-white">Web Development</span>, <span className="text-white">Mobile Apps</span>, <span className="text-white">UI/UX Design</span>, and <span className="text-white">Odoo Customization</span>. We merge beautiful design with powerful engineering.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link to="/contact" className="group relative px-8 py-4 bg-white text-black rounded-xl font-bold text-sm uppercase tracking-wider overflow-hidden hover:scale-105 transition-all shadow-[0_0_40px_rgba(255,255,255,0.3)]">
                <span className="relative z-10 flex items-center gap-2">
                  Start Your Project <FaRocket className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-blue-50 transition-colors group-hover:bg-white" />
              </Link>
              <Link to="/services" className="px-8 py-4 rounded-xl border border-white/10 bg-white/5 text-white font-bold text-sm uppercase tracking-wider hover:bg-white/10 transition-all backdrop-blur-md flex items-center gap-2 group">
                Explore Services <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            <div className="mt-12 flex items-center justify-center lg:justify-start gap-8 text-gray-500 text-xs font-bold uppercase tracking-widest">
              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-blue-500" /> Professional Team
              </div>
              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-purple-500" /> 24/7 Support
              </div>
            </div>
          </motion.div>

          {/* --- Right Column: Visual Interaction --- */}
          <motion.div style={{ y: yVisual, rotateX, rotateY }} className="relative h-[500px] lg:h-[700px] hidden lg:flex items-center justify-center perspective-[1000px]">
            {/* Center Core */}
            {/* Center Core - 3D AI Model */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative w-[500px] h-[500px] z-10 flex items-center justify-center"
            >
              <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
                <AIOrb />
              </Canvas>
            </motion.div>

            {/* Orbiting Services */}
            <div className="absolute w-[500px] h-[500px] border border-white/5 rounded-full animate-[spin_60s_linear_infinite]" />
            <div className="absolute w-[300px] h-[300px] border border-white/5 rounded-full animate-[spin_40s_linear_infinite_reverse]" />

            {/* Service Nodes Positioning (Circular Layout) */}
            {/* Service Nodes Positioning (Circular Layout) */}
            <ServiceNode
              to="/services/informative"
              icon={FaLaptopCode}
              label="Web Development"
              color="bg-blue-500"
              delay={0.8}
              x={-180}
              y={-80}
            />
            <ServiceNode
              to="/services/application"
              icon={FaMobileAlt}
              label="Mobile Apps"
              color="bg-purple-500"
              delay={0.9}
              x={180}
              y={-80}
            />
            <ServiceNode
              to="/services/uiux"
              icon={FaLayerGroup}
              label="UI/UX Design"
              color="bg-indigo-500"
              delay={1.0}
              x={0}
              y={180}
            />
            <ServiceNode
              to="/services/odoo"
              icon={FaRocket}
              label="Odoo Customization"
              color="bg-pink-500"
              delay={1.1}
              x={0}
              y={-220}
            />

            {/* Connecting Lines (Decorators) */}
            {/* Connecting Lines (Decorators) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: 1.5 }}
                d="M 50 50 L 20 40"
                stroke="url(#grad1)"
                strokeWidth="0.5"
                vectorEffect="non-scaling-stroke"
              />
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: 1.5 }}
                d="M 50 50 L 80 40"
                stroke="url(#grad1)"
                strokeWidth="0.5"
                vectorEffect="non-scaling-stroke"
              />
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: 1.5 }}
                d="M 50 50 L 50 80"
                stroke="url(#grad1)"
                strokeWidth="0.5"
                vectorEffect="non-scaling-stroke"
              />
              <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: '#8b5cf6', stopOpacity: 1 }} />
                </linearGradient>
              </defs>
            </svg>

          </motion.div>
        </div>
      </div>
    </div>
  );
}
