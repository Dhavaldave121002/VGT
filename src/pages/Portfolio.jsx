import React, { useState, useEffect } from 'react';
import { api } from '../utils/api';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import * as FaIcons from 'react-icons/fa';
import * as SiIcons from 'react-icons/si';
import PageHero from '../components/UI/PageHero';
import SEO from '../components/SEO';

const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  const [technologies, setTechnologies] = useState([]);
  const [filter, setFilter] = useState('All');
  const [categories, setCategories] = useState(['All']);
  const [filteredProjects, setFilteredProjects] = useState([]);

  useEffect(() => {
    if (projects.length > 0) {
      const cats = ['All', ...new Set(projects.map(p => p.category || p.type || 'Other'))];
      setCategories(cats);
    }
  }, [projects]);

  useEffect(() => {
    if (filter === 'All') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(p => (p.category || p.type) === filter));
    }
  }, [filter, projects]);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Load Projects
        const savedProjects = await api.fetchAll('projects');
        if (savedProjects && Array.isArray(savedProjects) && savedProjects.length > 0) {
          setProjects(savedProjects);
        } else {
          // Defaults if API empty (optional, or could just set empty)
          const defaults = [
            {
              id: 1,
              title: 'Crypto Wallet v2',
              type: 'FinTech',
              img: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?q=80&w=800',
              logo: 'https://cdn-icons-png.flaticon.com/512/825/825540.png',
              liveUrl: '#'
            },
            // ... (Same defaults as before for fallback)
          ];
          // Only use defaults if absolutely necessary, but preferred to rely on API data.
          // For now, let's assume if API returns empty, we show empty or handle gracefully.
          // If we want to seed defaults, we should do it in DB import, not code.
          // But keeping concise logic:
          if (savedProjects.length > 0) setProjects(savedProjects);
        }

        // Load Tech Stack
        const savedTech = await api.fetchAll('tech_stack');
        if (savedTech && savedTech.length > 0) {
          setTechnologies(savedTech);
        } else {
          // Logic to set defaults if config missing
          setTechnologies([
            { id: '1', name: "React", icon: "FaReact", color: "text-blue-400" },
            { id: '2', name: "Node.js", icon: "FaNodeJs", color: "text-green-500" },
            // ...
          ]);
        }
      } catch (e) {
        console.error("Error loading portfolio data", e);
      }
    };

    loadData();
  }, []);

  // Helper to get Icon Component from string
  const getIcon = (iconName) => {
    if (FaIcons[iconName]) return FaIcons[iconName];
    if (SiIcons[iconName]) return SiIcons[iconName];
    return FaIcons.FaRocket; // Fallback
  };

  return (
    <div className="min-h-screen bg-[#030712] font-sans text-gray-300 relative overflow-hidden">
      <SEO
        title="Our Portfolio"
        description="Explore Vertex Global Tech's portfolio of successful projects. See our work in web development, mobile apps, and enterprise software."
        keywords="portfolio, case studies, vertex global tech projects, software development work"
      />

      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none"></div>
      </div>

      <div className="relative z-10">
        <PageHero
          title="Building the Digital Future"
          highlight="Future"
          subtitle="A showcase of our most ambitious projects, featuring cutting-edge interfaces, robust architectures, and transformative digital experiences."
          badge="Our Portfolio"
        />

        {/* Tech Stack Horizontal Scroll */}
        <section className="py-16 border-y border-white/5 bg-[#080c18]/50 backdrop-blur-xl mb-32 overflow-hidden">
          <div className="container mx-auto px-6 mb-12 text-center">
            <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em]">Powering Innovation With</span>
          </div>

          <div className="relative w-full">
            <div className="flex gap-16 items-center whitespace-nowrap animate-infinite-scroll w-max pr-16 hover:pause transition-all">
              {[...technologies, ...technologies, ...technologies].map((tech, index) => {
                const Icon = getIcon(tech.icon);
                return (
                  <div key={`${tech.id}-${index}`} className="flex items-center gap-4 opacity-40 hover:opacity-100 transition-opacity grayscale hover:grayscale-0 cursor-default group">
                    <Icon className={`text-5xl ${tech.color} group-hover:scale-110 transition-transform`} />
                    <span className="text-xl font-bold text-white uppercase tracking-tighter">{tech.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <div className="container mx-auto px-6 pb-60">
          <div className="text-center mb-20">
            <span className="text-blue-500 font-black tracking-[0.3em] uppercase text-[10px] mb-4 block">Archive</span>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 uppercase tracking-tight font-['Montserrat']">Completed Works</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full mb-12"></div>

            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all duration-300 relative overflow-hidden group ${filter === cat
                    ? 'bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-600/25'
                    : 'bg-white/5 text-gray-400 border-white/5 hover:bg-white/10 hover:text-white'
                    }`}
                >
                  <span className="relative z-10">{cat}</span>
                  {filter === cat && (
                    <motion.div
                      layoutId="activeFilter"
                      className="absolute inset-0 bg-blue-600"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            <AnimatePresence mode='popLayout'>
              {filteredProjects.map((project, index) => (
                <motion.div
                  layout
                  key={project.id || index}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 20 }}
                  transition={{ duration: 0.4 }}
                  className="group relative bg-[#0f172a]/50 border border-white/10 hover:border-blue-500/30 rounded-[2.5rem] overflow-hidden transition-all duration-500 aspect-square w-full"
                >
                  <div className="absolute inset-0">
                    <img src={project.img} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/80 to-transparent opacity-90 z-10"></div>

                    {/* Company Logo Overlay - Top Left */}
                    {project.logo && (
                      <div className="absolute top-6 left-6 z-30 pointer-events-none">
                        <div className="w-12 h-12 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 p-2 flex items-center justify-center group-hover:border-blue-500/50 transition-colors shadow-2xl">
                          <img
                            src={project.logo}
                            alt="Company logo"
                            className="max-w-full max-h-full object-contain"
                            onError={(e) => {
                              e.target.parentElement.style.display = 'none';
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="absolute inset-0 p-8 flex flex-col justify-end z-20">
                    <div className="transition-all duration-500 transform translate-y-0 group-hover:-translate-y-2">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] bg-blue-500/10 px-4 py-1.5 rounded-full border border-blue-500/20 shadow-lg shadow-blue-900/10">
                          {project.category || project.type}
                        </span>
                      </div>

                      <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-8 group-hover:text-blue-500 transition-colors leading-none drop-shadow-2xl">
                        {project.title}
                      </h3>

                      <div className="mt-6">
                        <a
                          href={project.liveUrl || '#'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600/10 hover:bg-blue-600 text-blue-400 hover:text-white border border-blue-500/30 hover:border-blue-500 rounded-full font-bold text-[9px] uppercase tracking-widest transition-all duration-300 backdrop-blur-md shadow-lg shadow-blue-900/20 hover:shadow-blue-600/40 hover:-translate-y-0.5 group/btn"
                        >
                          Live_Node <FaIcons.FaExternalLinkAlt size={10} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
