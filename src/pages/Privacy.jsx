import React, { useEffect, useState } from 'react';
import { api } from '../utils/api';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';

const DEFAULT_SECTIONS = [
  { id: 1, title: 'Collecting and Using Your Personal Data', content: 'We collect several different types of information for various purposes to provide and improve our Service to you.' },
  { id: 2, title: 'Security of Your Personal Data', content: 'The security of Your Personal Data is important to Us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure.' }
];

export default function Privacy() {
  const [data, setData] = useState({ sections: DEFAULT_SECTIONS, lastUpdated: 'December 28, 2025' });

  useEffect(() => {
    const loadPrivacy = async () => {
      const data = await api.fetchConfig('legal_privacy');
      if (data) {
        setData(data);
      }
    };
    loadPrivacy();
  }, []);

  return (
    <div className="min-h-screen bg-[#030712] pt-32 pb-20 px-6 font-sans selection:bg-blue-500/30">
      <SEO
        title="Privacy Policy"
        description="Vertex Global Tech Privacy Policy - Your data security is our priority."
        type="article"
      />

      <div className="max-w-4xl mx-auto relative">
        {/* Animated Background Element */}
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"></div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <header className="mb-16">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-blue-500 font-black tracking-[0.3em] uppercase text-xs mb-4 block"
            >
              Legal Framework
            </motion.span>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter uppercase italic">
              Privacy <span className="text-blue-500">Policy</span>
            </h1>
            <p className="text-gray-500 font-mono text-sm uppercase tracking-widest">
              Last Revised: <span className="text-blue-400">{data.lastUpdated}</span>
            </p>
          </header>

          <div className="space-y-12 relative z-10">
            {data.sections.map((section, index) => (
              <motion.section
                key={section.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                className="group relative bg-[#0f172a]/40 border border-white/5 rounded-[2rem] p-8 md:p-10 hover:border-blue-500/30 transition-all duration-500 backdrop-blur-sm"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/5 to-transparent rounded-bl-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <h2 className="text-2xl font-black text-white mb-6 flex items-center gap-4 uppercase tracking-tight">
                  <span className="text-blue-500/60 font-mono text-xs tracking-tighter">0{index + 1}_</span>
                  {section.title}
                </h2>

                <div className="text-gray-400 leading-relaxed text-lg font-medium tracking-tight">
                  {section.content.split('\n').map((para, i) => (
                    <p key={i} className={i > 0 ? 'mt-4' : ''}>{para}</p>
                  ))}
                </div>
              </motion.section>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mt-20 pt-10 border-t border-white/5 text-center"
          >
            <p className="text-gray-600 text-sm font-bold uppercase tracking-[0.2em]">Contact our compliance officer for any inquiries regarding data protection.</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
