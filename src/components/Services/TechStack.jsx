import React from 'react';
import { motion } from 'framer-motion';

const TechStack = ({ customStack }) => {
  const defaultTechnologies = [
    { name: 'React', icon: 'bi-filetype-jsx', color: 'text-cyan-400' },
    { name: 'Node.js', icon: 'bi-filetype-js', color: 'text-green-500' },
    { name: 'Python', icon: 'bi-filetype-py', color: 'text-yellow-400' },
    { name: 'AWS', icon: 'bi-cloud', color: 'text-orange-500' },
    { name: 'Docker', icon: 'bi-box-seam', color: 'text-blue-500' },
    { name: 'MongoDB', icon: 'bi-database', color: 'text-green-600' },
    { name: 'Next.js', icon: 'bi-layers', color: 'text-white' },
    { name: 'TypeScript', icon: 'bi-filetype-tsx', color: 'text-blue-400' },
  ];

  const technologies = customStack && customStack.length > 0 ? customStack : defaultTechnologies;

  return (
    <section className="py-20 bg-[#0f172a]/50 border-y border-white/5">
      <div className="container mx-auto px-6 text-center">
        <h3 className="text-xl md:text-2xl font-bold text-gray-400 uppercase tracking-widest mb-12">Powering Next-Gen Solutions With</h3>

        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
          {technologies.map((tech, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -5, color: '#fff' }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="flex flex-col items-center group cursor-pointer"
            >
              <div className={`text-4xl md:text-5xl mb-3 ${tech.color} group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] transition-all`}>
                <i className={`bi ${tech.icon}`}></i>
              </div>
              <span className="text-sm font-mono text-gray-500 group-hover:text-white transition-colors">
                {tech.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
