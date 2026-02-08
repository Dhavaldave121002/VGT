import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaExternalLinkAlt, FaImage, FaGripVertical, FaTrash, FaEdit, FaSave, FaUndo, FaSearch, FaRocket, FaReact, FaNodeJs, FaAws, FaDocker, FaPython } from 'react-icons/fa';
import { SiTypescript, SiNextdotjs, SiGraphql } from 'react-icons/si';

import { api } from '../../utils/api';

const PortfolioManager = () => {
  const [projects, setProjects] = useState([]);
  const [techStack, setTechStack] = useState([]);

  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newProj, setNewProj] = useState({ title: '', type: 'FinTech', category: 'FinTech', img: '', logo: '', liveUrl: '' });
  const [editProj, setEditProj] = useState({ title: '', type: 'FinTech', category: 'FinTech', img: '', logo: '', liveUrl: '' });

  const [isAddingTech, setIsAddingTech] = useState(false);
  const [editingTechId, setEditingTechId] = useState(null);
  const [techForm, setTechForm] = useState({ name: '', icon: '', color: 'text-blue-400' });

  useEffect(() => {
    fetchProjects();
    fetchTechStack();
  }, []);

  const fetchProjects = async () => {
    const data = await api.fetchAll('projects');
    setProjects(data);
  };

  const fetchTechStack = async () => {
    const data = await api.fetchAll('tech_stack');
    setTechStack(data);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const response = await api.save('projects', newProj);
    if (response.success) {
      fetchProjects();
      setNewProj({ title: '', type: 'FinTech', category: 'FinTech', img: '', logo: '', liveUrl: '' });
      setIsAdding(false);
    }
  };

  const handleEdit = (proj) => {
    setEditingId(proj.id);
    setEditProj({ ...proj, logo: proj.logo || '', liveUrl: proj.liveUrl || '' });
  };

  const handleSaveEdit = async () => {
    const response = await api.save('projects', { ...editProj, id: editingId });
    if (response.success) {
      fetchProjects();
      setEditingId(null);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('PROTOCOL: DESTRUCT PROJECT NODE?')) {
      await api.delete('projects', id);
      fetchProjects();
    }
  };

  // Tech Stack Handlers
  const handleAddTech = async (e) => {
    e.preventDefault();
    const response = await api.save('tech_stack', techForm);
    if (response.success) {
      fetchTechStack();
      setTechForm({ name: '', icon: '', color: 'text-blue-400' });
      setIsAddingTech(false);
    }
  };

  const startEditTech = (tech) => {
    setEditingTechId(tech.id);
    setTechForm({ ...tech });
    setIsAddingTech(true);
  };

  const handleUpdateTech = async (e) => {
    e.preventDefault();
    const response = await api.save('tech_stack', { ...techForm, id: editingTechId });
    if (response.success) {
      fetchTechStack();
      setEditingTechId(null);
      setTechForm({ name: '', icon: '', color: 'text-blue-400' });
      setIsAddingTech(false);
    }
  };

  const handleDeleteTech = async (id) => {
    if (window.confirm('PROTOCOL: DESTRUCT TECH NODE?')) {
      await api.delete('tech_stack', id);
      fetchTechStack();
    }
  };

  // Icon Helper
  const getIcon = (iconName) => {
    const icons = {
      FaReact: <FaReact />,
      FaNodeJs: <FaNodeJs />,
      SiTypescript: <SiTypescript />,
      FaAws: <FaAws />,
      FaDocker: <FaDocker />,
      SiNextdotjs: <SiNextdotjs />,
      FaPython: <FaPython />,
      SiGraphql: <SiGraphql />,
      FaRocket: <FaRocket />
    };
    return icons[iconName] || <FaRocket />;
  };

  return (
    <div className="space-y-16 font-mono animate-in fade-in slide-in-from-bottom-4 duration-700 text-white">

      {/* Projects Section */}
      <section className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-black uppercase tracking-tighter text-white">Project <span className="text-blue-500">Portfolio</span></h1>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.3em] mt-1">Curate and manage global showcase initiatives</p>
          </div>
          {!isAdding && (
            <button
              onClick={() => setIsAdding(true)}
              className="px-6 py-4 bg-blue-600 text-white text-[10px] font-black rounded-xl hover:bg-blue-500 transition-all shadow-xl shadow-blue-900/40 flex items-center justify-center gap-3 uppercase tracking-[0.2em] active:scale-95"
            >
              <FaPlus /> Deploy New Node
            </button>
          )}
        </div>

        <AnimatePresence>
          {isAdding && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="glass-panel p-8 border-blue-500/20 bg-blue-600/[0.02]"
            >
              <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                <div className="space-y-3">
                  <label className="text-[9px] font-black text-blue-400 uppercase tracking-widest">Project Title</label>
                  <input
                    type="text" required
                    value={newProj.title}
                    onChange={e => setNewProj({ ...newProj, title: e.target.value })}
                    className="w-full bg-black/40 border border-white/5 rounded-lg p-3 text-white text-xs focus:outline-none focus:border-blue-500 transition-all font-mono"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[9px] font-black text-blue-400 uppercase tracking-widest">Type (Category)</label>
                  <input
                    type="text" required
                    value={newProj.type}
                    onChange={e => setNewProj({ ...newProj, type: e.target.value, category: e.target.value })}
                    className="w-full bg-black/40 border border-white/5 rounded-lg p-3 text-white text-xs focus:outline-none focus:border-blue-500 transition-all font-mono"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[9px] font-black text-blue-400 uppercase tracking-widest">Image URL</label>
                  <input
                    type="text" required
                    value={newProj.img}
                    onChange={e => setNewProj({ ...newProj, img: e.target.value })}
                    className="w-full bg-black/40 border border-white/5 rounded-lg p-3 text-white text-xs focus:outline-none focus:border-blue-500 transition-all font-mono"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[9px] font-black text-blue-400 uppercase tracking-widest">Logo URL</label>
                  <input
                    type="text"
                    value={newProj.logo}
                    onChange={e => setNewProj({ ...newProj, logo: e.target.value })}
                    placeholder="Company Logo URL"
                    className="w-full bg-black/40 border border-white/5 rounded-lg p-3 text-white text-xs focus:outline-none focus:border-blue-500 transition-all font-mono"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[9px] font-black text-blue-400 uppercase tracking-widest">Live Site URL</label>
                  <input
                    type="text"
                    value={newProj.liveUrl}
                    onChange={e => setNewProj({ ...newProj, liveUrl: e.target.value })}
                    placeholder="https://..."
                    className="w-full bg-black/40 border border-white/5 rounded-lg p-3 text-white text-xs focus:outline-none focus:border-blue-500 transition-all font-mono"
                  />
                </div>
                <div className="flex gap-3 md:col-span-1">
                  <button type="submit" className="flex-1 py-3 bg-blue-600 text-white text-[10px] font-black rounded-lg hover:bg-blue-500 transition-all uppercase tracking-widest">Authorize Deployment</button>
                  <button type="button" onClick={() => setIsAdding(false)} className="px-6 py-3 bg-white/5 text-gray-500 text-[10px] font-black rounded-lg hover:bg-white/10 transition-all uppercase tracking-widest">Abort</button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((proj) => (
            <motion.div
              layout key={proj.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`glass-panel group border-white/5 hover:border-blue-500/40 overflow-hidden relative ${editingId === proj.id ? 'ring-2 ring-blue-500/50' : ''}`}
            >
              {editingId === proj.id ? (
                <div className="p-6 space-y-4 bg-blue-600/5">
                  <input className="w-full bg-black/60 border border-blue-500/50 rounded p-2 text-white text-xs font-mono" value={editProj.title} onChange={e => setEditProj({ ...editProj, title: e.target.value })} placeholder="Title" />
                  <input className="w-full bg-black/60 border border-blue-500/50 rounded p-2 text-white text-xs font-mono" value={editProj.type} onChange={e => setEditProj({ ...editProj, type: e.target.value, category: e.target.value })} placeholder="Type" />
                  <input className="w-full bg-black/60 border border-blue-500/50 rounded p-2 text-white text-xs font-mono" value={editProj.img} onChange={e => setEditProj({ ...editProj, img: e.target.value })} placeholder="Img URL" />
                  <input className="w-full bg-black/60 border border-blue-500/50 rounded p-2 text-white text-xs font-mono" value={editProj.logo} onChange={e => setEditProj({ ...editProj, logo: e.target.value })} placeholder="Logo URL" />
                  <input className="w-full bg-black/60 border border-blue-500/50 rounded p-2 text-white text-xs font-mono" value={editProj.liveUrl} onChange={e => setEditProj({ ...editProj, liveUrl: e.target.value })} placeholder="Live URL" />
                  <div className="flex gap-2">
                    <button onClick={handleSaveEdit} className="flex-1 py-2 bg-emerald-600 text-[10px] font-black uppercase tracking-widest rounded-lg flex items-center justify-center gap-2"><FaSave /> Save</button>
                    <button onClick={() => setEditingId(null)} className="px-4 py-2 bg-white/10 text-[10px] font-black uppercase tracking-widest rounded-lg flex items-center justify-center gap-2"><FaUndo /> Cancel</button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="aspect-square relative overflow-hidden">
                    <img src={proj.img} alt={proj.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 grayscale group-hover:grayscale-0" />

                    {/* Logo Overlay on Admin Side */}
                    {proj.logo && (
                      <div className="absolute top-4 left-4 z-20">
                        <div className="w-10 h-10 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 p-1.5 flex items-center justify-center">
                          <img src={proj.logo} alt="Project Logo" className="max-w-full max-h-full object-contain" onError={(e) => e.target.style.display = 'none'} />
                        </div>
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/20 to-transparent opacity-80"></div>
                    <div className="absolute top-4 right-4 flex gap-2 z-30">
                      <button onClick={() => handleEdit(proj)} className="p-3 bg-black/80 backdrop-blur-xl rounded-xl text-white hover:text-blue-400 transition-all border border-white/10 hover:border-blue-500/40"><FaEdit size={14} /></button>
                      <button onClick={() => handleDelete(proj.id)} className="p-3 bg-black/80 backdrop-blur-xl rounded-xl text-white hover:text-red-400 transition-all border border-white/10 hover:border-red-500/40"><FaTrash size={14} /></button>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <span className="px-3 py-1 rounded-lg bg-blue-600/20 backdrop-blur-md border border-blue-500/30 text-[9px] font-black uppercase text-blue-400 tracking-widest">{proj.type}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-black text-white mb-6 group-hover:text-blue-400 transition-colors uppercase tracking-tighter">{proj.title}</h3>
                    <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.2em] text-gray-600 border-t border-white/5 pt-6">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                        <span>Node Secured</span>
                      </div>
                      {proj.liveUrl ? (
                        <a
                          href={proj.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-all font-black text-[9px] uppercase tracking-widest shadow-lg shadow-blue-900/20"
                        >
                          Visit Live <FaExternalLinkAlt size={8} />
                        </a>
                      ) : (
                        <button disabled className="text-gray-600 flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg border border-white/5 opacity-50 cursor-not-allowed text-[9px] font-black uppercase tracking-widest">Offline</button>
                      )}
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          ))}
          {!isAdding && (
            <div onClick={() => setIsAdding(true)} className="border-2 border-dashed border-white/5 rounded-2xl flex flex-col items-center justify-center p-8 bg-white/[0.01] hover:bg-blue-600/[0.03] hover:border-blue-500/20 transition-all cursor-pointer group min-h-[300px]">
              <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center text-gray-600 mb-6 group-hover:text-blue-500 group-hover:border-blue-500/40 transition-all shadow-inner"><FaPlus size={20} /></div>
              <p className="text-[10px] font-black text-gray-700 uppercase tracking-[0.4em] group-hover:text-white transition-colors">Import Project Node</p>
            </div>
          )}
        </div>
      </section>

      {/* Tech Stack Monitor Area */}
      <section className="space-y-8 pb-20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-t border-white/5 pt-16">
          <div>
            <h2 className="text-3xl font-black uppercase tracking-tighter text-white">Innovation <span className="text-blue-500">Stacks</span></h2>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.3em] mt-1">Manage technologies powering the digital future</p>
          </div>
          {!isAddingTech && (
            <button
              onClick={() => setIsAddingTech(true)}
              className="px-6 py-4 bg-white text-black text-[10px] font-black rounded-xl hover:bg-gray-200 transition-all shadow-xl flex items-center justify-center gap-3 uppercase tracking-[0.2em] active:scale-95"
            >
              <FaPlus /> Registry New Stack
            </button>
          )}
        </div>

        <AnimatePresence mode="wait">
          {isAddingTech && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="glass-panel p-10 border-blue-500/20 bg-blue-600/[0.02] relative"
            >
              <button onClick={() => { setIsAddingTech(false); setEditingTechId(null); setTechForm({ name: '', icon: '', color: 'text-blue-400' }); }} className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors"><FaUndo /></button>

              <form onSubmit={editingTechId ? handleUpdateTech : handleAddTech} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Stack Name</label>
                    <input
                      type="text" required
                      value={techForm.name}
                      onChange={e => setTechForm({ ...techForm, name: e.target.value })}
                      placeholder="e.g. React"
                      className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white text-sm focus:border-blue-500 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Icon (Fa/Si Name)</label>
                    <input
                      type="text" required
                      value={techForm.icon}
                      onChange={e => setTechForm({ ...techForm, icon: e.target.value })}
                      placeholder="e.g. FaReact"
                      className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white text-sm focus:border-blue-500 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-blue-400 uppercase tracking-widest">CSS Color Class</label>
                    <input
                      type="text" required
                      value={techForm.color}
                      onChange={e => setTechForm({ ...techForm, color: e.target.value })}
                      placeholder="e.g. text-blue-400"
                      className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white text-sm focus:border-blue-500 outline-none transition-all"
                    />
                  </div>
                </div>
                <div className="flex gap-4">
                  <button type="submit" className="flex-1 py-4 bg-blue-600 text-white font-black text-xs uppercase tracking-[0.2em] rounded-xl hover:bg-blue-500 transition-all flex items-center justify-center gap-3">
                    <FaSave /> {editingTechId ? 'Update Node' : 'Record Registry'}
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence>
            {techStack.map((tech) => (
              <motion.div
                layout key={tech.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="glass-panel group p-8 rounded-[2rem] border-white/5 hover:border-blue-500/30 transition-all hover:-translate-y-1 relative"
              >
                <div className="flex flex-col items-center gap-6 text-center">
                  <div className={`w-16 h-16 rounded-2xl bg-white/5 ${tech.color} flex items-center justify-center text-3xl transition-transform group-hover:scale-110 duration-500`}>
                    {getIcon(tech.icon)}
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-white tracking-tight leading-none">{tech.name}</h3>
                    <p className="text-[8px] font-bold text-gray-600 uppercase tracking-[0.2em] mt-3">Active Stack Node</p>
                  </div>
                </div>

                <div className="absolute top-4 right-4 flex gap-2">
                  <button onClick={() => startEditTech(tech)} className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all"><FaEdit size={12} /></button>
                  <button onClick={() => handleDeleteTech(tech.id)} className="w-8 h-8 rounded-lg bg-red-500/10 text-red-500 border border-red-500/20 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all"><FaTrash size={12} /></button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
};

export default PortfolioManager;
