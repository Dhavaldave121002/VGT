import React, { useEffect, useState } from 'react';
import { api } from '../utils/api';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';

const DEFAULT_SECTIONS = [
  { id: 1, title: 'Acknowledgment', content: 'These are the Terms and Conditions governing the use of this Service and the agreement that operates between You and the Company.' },
  { id: 2, title: 'Links to Other Websites', content: 'Our Service may contain links to third-party web sites or services that are not owned or controlled by the Company.' }
];

export default function Terms() {
  const [data, setData] = useState({ sections: DEFAULT_SECTIONS, lastUpdated: 'December 28, 2025' });

  useEffect(() => {
    const loadTerms = async () => {
      const data = await api.fetchConfig('legal_terms');
      if (data) {
        setData(data); // Assuming FetchConfig returns the whole object including sections/lastUpdated for this key?
      }
    };
    loadTerms();
  }, []);

  return (
    <div className="min-h-screen bg-[#030712] pt-32 pb-20 px-6 font-sans selection:bg-purple-500/30 text-gray-300">
      <SEO
        title="Terms of Service"
        description="Vertex Global Tech Terms of Service - The rules of our partnership."
        type="article"
      />

      <div className="max-w-4xl mx-auto relative">
        {/* Animated Background Element */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none"></div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <header className="mb-16">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-purple-500 font-black tracking-[0.3em] uppercase text-xs mb-4 block"
            >
              Legal Agreement
            </motion.span>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter uppercase italic">
              Terms of <span className="text-purple-500">Service</span>
            </h1>
            <p className="text-gray-500 font-mono text-sm uppercase tracking-widest">
              Last Updated: <span className="text-purple-400">{data.lastUpdated}</span>
            </p>
          </header>

          <div className="space-y-12 relative z-10">
            {data.sections.map((section, index) => (
              <motion.section
                key={section.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                className="group relative bg-[#0f172a]/40 border border-white/5 rounded-[2rem] p-8 md:p-10 hover:border-purple-500/30 transition-all duration-500 backdrop-blur-sm shadow-2xl shadow-black"
              >
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-purple-500/5 to-transparent rounded-tr-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <h2 className="text-2xl font-black text-white mb-6 flex items-center gap-4 uppercase tracking-tight">
                  <span className="text-purple-500/60 font-mono text-xs tracking-tighter">Art_{index + 1}</span>
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
            <p className="text-gray-600 text-sm font-bold uppercase tracking-[0.2em]">By using our platform, you acknowledge and agree to these governing terms.</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
