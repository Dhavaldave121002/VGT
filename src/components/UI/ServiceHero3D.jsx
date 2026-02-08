// src/components/UI/ServiceHero3D.jsx
import React from 'react';
import { motion } from 'framer-motion';

export default function ServiceHero3D({ title, subtitle, badge, highlight, laptopImage, phoneImage }) {
  return (
    <div className="relative min-h-[75vh] lg:min-h-[85vh] bg-[#030712] flex items-center overflow-hidden pt-28 pb-12">

      {/* PROFESSIONAL BACKGROUND */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05)_0%,transparent_70%)]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* TEXT CONTENT */}
          <div className="text-left">
            {badge && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="inline-block mb-6 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 font-bold text-xs tracking-widest uppercase backdrop-blur-md"
              >
                {badge}
              </motion.div>
            )}

            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-8 tracking-tighter leading-[1] uppercase break-words"
            >
              {title.split(highlight).map((part, i, arr) => (
                <React.Fragment key={i}>
                  <span className="inline-block">
                    {part.split(" ").map((word, wI) => (
                      <span key={wI} className="inline-block whitespace-nowrap">
                        {word.split("").map((char, cI) => (
                          <motion.span
                            key={cI}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 + (i * 0.1) + (wI * 0.05) + (cI * 0.02), duration: 0.4 }}
                            className="inline-block"
                          >
                            {char}
                          </motion.span>
                        ))}
                        <span className="inline-block">&nbsp;</span>
                      </span>
                    ))}
                  </span>
                  {i < arr.length - 1 && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                      className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-600 to-purple-600 inline-block"
                    >
                      {highlight}
                    </motion.span>
                  )}
                </React.Fragment>
              ))}
              {!highlight && title.split(" ").map((word, wI) => (
                <span key={wI} className="inline-block whitespace-nowrap">
                  {word.split("").map((char, cI) => (
                    <motion.span
                      key={cI}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + (wI * 0.05) + (cI * 0.02), duration: 0.4 }}
                      className="inline-block"
                    >
                      {char}
                    </motion.span>
                  ))}
                  <span className="inline-block">&nbsp;</span>
                </span>
              ))}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-lg md:text-xl text-gray-400 max-w-xl leading-relaxed mb-10 border-l-2 border-blue-500/30 pl-6"
            >
              {subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              <a href="/contact" className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-black hover:bg-blue-600 hover:text-white font-bold rounded-full transition-all transform hover:scale-105 shadow-2xl">
                <span>Start Project</span>
                <i className="bi bi-arrow-right group-hover:translate-x-1 transition-transform"></i>
              </a>
              <a href="#features" className="inline-flex items-center gap-3 px-8 py-4 bg-white/5 text-white hover:bg-white/10 border border-white/10 font-bold rounded-full transition-all">
                <span>Explore Features</span>
              </a>
            </motion.div>
          </div>

          {/* PROFESSIONAL IMAGE SHOWCASE (Replaced 3D) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="relative h-[400px] md:h-[500px] flex items-center justify-center p-4"
          >
            {/* Main Laptop Mockup */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="relative w-full max-w-[550px] aspect-[16/10] bg-[#0a0a0a] rounded-2xl border-[6px] border-[#1a1a1a] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-10"
            >
              <img
                src={laptopImage || "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1200"}
                alt="Project Preview"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-transparent"></div>
            </motion.div>

            {/* Mobile Mockup overlapping */}
            <motion.div
              initial={{ opacity: 0, y: 50, x: 30 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="absolute -bottom-10 right-0 z-20 hidden md:block"
            >
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                className="w-[140px] md:w-[180px] aspect-[9/19] bg-[#050505] rounded-[2.5rem] border-[8px] border-[#1a1a1a] overflow-hidden shadow-2xl"
              >
                <img
                  src={phoneImage || "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=600"}
                  alt="Mobile Version"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-4 bg-black rounded-full"></div>
              </motion.div>
            </motion.div>

            {/* Floating Tech Elements */}
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-blue-500/5 rounded-full blur-[80px] pointer-events-none"></div>
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-purple-500/5 rounded-full blur-[80px] pointer-events-none"></div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
