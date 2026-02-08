// src/components/UI/HomeAbout.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import logo from '../../assets/vglogo.jpg';

export default function HomeAbout() {
  return (
    <section className="py-24 bg-[#030712] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px] translate-y-1/2 translate-x-1/2" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <div className="flex items-center gap-2 mb-6">
              <span className="h-[1px] w-12 bg-blue-500"></span>
              <span className="text-blue-400 font-bold uppercase tracking-widest text-xs">Who We Are</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-black text-white mb-8 leading-tight">
              Architecting the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Digital Future</span>
            </h2>

            <p className="text-gray-400 text-lg leading-relaxed mb-6">
              At Vertex Global Tech, we don't just write code; we build the ecosystems that power modern enterprises. Our team of visionaries and engineers integrates cutting-edge AI, responsive design, and robust architecture to deliver solutions that stand the test of time.
            </p>

            <p className="text-gray-400 text-lg leading-relaxed mb-10">
              We are driven by a single philosophy: <strong>Innovation through Integrity.</strong> Every pixel we place and every line of code we write is dedicated to elevating your brand.
            </p>

            <Link to="/about" className="group inline-flex items-center gap-3 text-white font-bold uppercase tracking-widest text-sm border-b border-blue-500/30 pb-1 hover:text-blue-400 hover:border-blue-500 transition-all">
              Discover Our Story <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Visual Reflection Composition */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative order-1 lg:order-2 perspective-[1000px]"
          >
            <div className="relative z-20 group">
              {/* Main Image */}
              <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl transform transition-transform duration-700 group-hover:-translate-y-2">
                <img
                  src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2070"
                  alt="Vertex Team"
                  className="w-full object-cover"
                />
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent opacity-60" />

                {/* Floating Logo Badge */}
                {/* Floating Logo Badge */}
                <div className="absolute bottom-6 left-6 w-24 h-24 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center justify-center shadow-[0_8px_32px_rgba(0,0,0,0.5)] group-hover:scale-105 transition-transform duration-500 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-600/10 z-10" />
                  <img src={logo} alt="Vertex Logo" className="w-full h-full object-cover opacity-100 transform group-hover:scale-110 transition-transform duration-700" />
                  {/* Shine effect */}
                  <div className="absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />
                </div>
              </div>

              {/* Reflection */}
              <div className="absolute top-full left-0 w-full h-[50%] overflow-hidden opacity-30 transform scale-y-[-1] pointer-events-none mt-1 mask-image-gradient">
                <img
                  src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2070"
                  alt="Reflection"
                  className="w-full object-cover blur-[2px]"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#030712]" />
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 border-2 border-blue-500/20 rounded-full animate-[spin_20s_linear_infinite]" />
            <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-purple-500/20 rounded-full blur-xl" />

          </motion.div>
        </div>
      </div>
    </section>
  );
}
