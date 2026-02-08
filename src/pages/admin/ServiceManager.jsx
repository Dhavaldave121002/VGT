import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEdit, FaTrash, FaPlus, FaSave, FaUndo, FaCode, FaQuestionCircle, FaList, FaLayerGroup, FaRoad, FaShieldAlt } from 'react-icons/fa';

import { api } from '../../utils/api';

// --- DEFAULTS (Keep as fallbacks) ---
const DEFAULT_TECH_STACK = [
  { name: 'React', icon: 'bi-filetype-jsx', color: 'text-cyan-400' },
  { name: 'Node.js', icon: 'bi-filetype-js', color: 'text-green-500' },
  { name: 'Python', icon: 'bi-filetype-py', color: 'text-yellow-400' },
  { name: 'AWS', icon: 'bi-cloud', color: 'text-orange-500' },
  { name: 'Docker', icon: 'bi-box-seam', color: 'text-blue-500' },
  { name: 'MongoDB', icon: 'bi-database', color: 'text-green-600' },
  { name: 'Next.js', icon: 'bi-layers', color: 'text-white' },
];

// ... (Other defaults omitted for brevity, logic handles fallback)
const SERVICE_DEFAULTS = {
  informative: { name: 'Informative Website', features: [], techStack: DEFAULT_TECH_STACK, faqs: [], process: [] },
  ecommerce: { name: 'E-Commerce', features: [], techStack: DEFAULT_TECH_STACK, faqs: [], process: [] },
  application: { name: 'Mobile Application', features: [], techStack: DEFAULT_TECH_STACK, faqs: [], process: [] },
  uiux: { name: 'UI/UX Design', features: [], techStack: DEFAULT_TECH_STACK, faqs: [], process: [] },
  maintenance: { name: 'Maintenance', features: [], techStack: DEFAULT_TECH_STACK, faqs: [], process: [] },
  dynamic: { name: 'Dynamic Solutions', features: [], techStack: DEFAULT_TECH_STACK, faqs: [], process: [] },
  odoo: { name: 'Odoo Customization', features: [], techStack: DEFAULT_TECH_STACK, faqs: [], process: [] },
  social: { name: 'Social Media Marketing', features: [], techStack: DEFAULT_TECH_STACK, faqs: [], process: [] },
  redesign: { name: 'Website Redesign', features: [], techStack: DEFAULT_TECH_STACK, faqs: [], process: [], protocolDetails: [] }
};

const ServiceManager = () => {
  const [selectedService, setSelectedService] = useState('informative');
  const [activeTab, setActiveTab] = useState('features'); // features, tech, faq, process

  const [serviceData, setServiceData] = useState(SERVICE_DEFAULTS.informative);
  const [loading, setLoading] = useState(false);

  // --- LOAD DATA ---
  useEffect(() => {
    fetchServiceData();
  }, [selectedService]);

  const fetchServiceData = async () => {
    setLoading(true);
    const key = `service_config_${selectedService}`;
    const data = await api.fetchConfig(key);

    if (data) {
      setServiceData(data);
    } else {
      // Use defaults if not found in DB
      // Check if SERVICE_DEFAULTS has data, else empty structure
      // Note: In real app, you might want to fully populate defaults here if missing
      const def = SERVICE_DEFAULTS[selectedService] || { name: 'Service', features: [], techStack: [], faqs: [], process: [] };
      setServiceData(def);

      // If it was missing, we COULD auto-save defaults to DB, but let's wait for user action
    }
    setLoading(false);
  };

  // --- SAVE DATA ---
  // Debounced save or manual? 
  // Given complexity, let's auto-save on change?
  // auto-save might be spammy for config_store (text blob).
  // Let's rely on a manual SAVE button or a "Save Changes" indicator (managed via useEffect with timeout).
  // I'll stick to manual SAVE button for clarity and performance as these blobs are large.

  const saveServiceData = async () => {
    const key = `service_config_${selectedService}`;
    const res = await api.saveConfig(key, serviceData);
    if (res.success) {
      alert('Configuration Saved');
    } else {
      alert('Error Saving');
    }
  };


  // --- HANDLERS (Update local state) ---
  const handleUpdateFeature = (index, field, value) => {
    const newFeatures = [...serviceData.features];
    newFeatures[index] = { ...newFeatures[index], [field]: value };
    setServiceData({ ...serviceData, features: newFeatures });
  };
  const addFeature = () => {
    setServiceData({ ...serviceData, features: [...(serviceData.features || []), { title: 'New Feature', icon: 'bi-star', desc: 'Description here.' }] });
  };
  const deleteFeature = (index) => {
    if (window.confirm('Delete this feature?')) {
      setServiceData({ ...serviceData, features: serviceData.features.filter((_, i) => i !== index) });
    }
  };

  const handleUpdateTech = (index, field, value) => {
    const newStack = [...serviceData.techStack];
    newStack[index] = { ...newStack[index], [field]: value };
    setServiceData({ ...serviceData, techStack: newStack });
  };
  const addTech = () => setServiceData({ ...serviceData, techStack: [...(serviceData.techStack || []), { name: 'New Tech', icon: 'bi-code', color: 'text-white' }] });
  const deleteTech = (index) => setServiceData({ ...serviceData, techStack: serviceData.techStack.filter((_, i) => i !== index) });

  const handleUpdateFaq = (index, field, value) => {
    const newFaqs = [...serviceData.faqs];
    newFaqs[index] = { ...newFaqs[index], [field]: value };
    setServiceData({ ...serviceData, faqs: newFaqs });
  };
  const addFaq = () => setServiceData({ ...serviceData, faqs: [...(serviceData.faqs || []), { q: 'New Question?', a: 'Answer here.' }] });
  const deleteFaq = (index) => setServiceData({ ...serviceData, faqs: serviceData.faqs.filter((_, i) => i !== index) });

  const handleUpdateProcess = (index, field, value) => {
    const newProcess = [...(serviceData.process || [])];
    newProcess[index] = { ...newProcess[index], [field]: value };
    setServiceData({ ...serviceData, process: newProcess });
  };
  const addProcess = () => setServiceData({ ...serviceData, process: [...(serviceData.process || []), { num: '00', title: 'New Step', desc: 'Step description.', icon: 'bi-circle' }] });
  const deleteProcess = (index) => setServiceData({ ...serviceData, process: serviceData.process.filter((_, i) => i !== index) });

  const addProtocolSpec = (protoIdx) => {
    const newProtocols = [...(serviceData.protocolDetails || [])];
    newProtocols[protoIdx].specs.push({ label: 'New Spec', value: 'Value' });
    setServiceData({ ...serviceData, protocolDetails: newProtocols });
  };

  const deleteProtocolSpec = (protoIdx, specIdx) => {
    const newProtocols = [...serviceData.protocolDetails];
    newProtocols[protoIdx].specs.splice(specIdx, 1);
    setServiceData({ ...serviceData, protocolDetails: newProtocols });
  };

  return (
    <div className="p-6 md:p-10 min-h-screen bg-[#020617] font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black text-white uppercase tracking-tighter mb-2">Service <span className="text-blue-500">Node</span></h1>
            <p className="text-gray-500 font-medium uppercase tracking-[0.3em] text-[10px]">Content System Configuration</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative group">
              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="appearance-none bg-[#0f172a] border border-white/10 text-white text-[10px] font-black uppercase tracking-widest pl-6 pr-12 py-4 rounded-2xl focus:border-blue-500 outline-none transition-all shadow-xl hover:bg-[#1e293b]"
              >
                {Object.entries(SERVICE_DEFAULTS).map(([key, val]) => (
                  <option key={key} value={key} className="bg-gray-900">{val.name}</option>
                ))}
              </select>
              <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-blue-500">
                <FaLayerGroup size={12} />
              </div>
            </div>
            <button onClick={saveServiceData} className="px-6 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all shadow-xl shadow-emerald-900/20 active:scale-95 flex items-center gap-2">
              <FaSave /> Save Config
            </button>
          </div>
        </header>

        <div className="flex gap-4 mb-12 border-b border-white/5 pb-6 overflow-x-auto custom-scrollbar no-scrollbar">
          {[
            { id: 'features', label: 'Feature Matrix', icon: <FaList /> },
            { id: 'process', label: 'Development Flow', icon: <FaRoad /> },
            { id: 'tech', label: 'Tech Stack', icon: <FaCode /> },
            { id: 'faq', label: 'Knowledge Base', icon: <FaQuestionCircle /> },
            ...(selectedService === 'redesign' ? [{ id: 'protocol', label: 'Protocol Specs', icon: <FaShieldAlt /> }] : []),
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-3 whitespace-nowrap shadow-lg active:scale-95 ${activeTab === tab.id ? 'bg-blue-600 text-white shadow-blue-900/40' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-20 text-white/50 font-black uppercase tracking-widest">Accessing_Data_Stream...</div>
        ) : (
          <>
            {/* --- FEATURES TAB --- */}
            {activeTab === 'features' && (
              <div className="space-y-6">
                <div className="flex justify-end"><button onClick={addFeature} className="bg-emerald-600 active:scale-95 transition-all text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-3 shadow-xl shadow-emerald-900/20"><FaPlus /> Add Feature</button></div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {serviceData.features?.map((feat, i) => (
                    <div key={i} className="group relative bg-[#0f172a]/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 hover:border-blue-500/30 transition-all duration-500 shadow-xl">
                      <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                          <span className="text-[8px] font-black text-gray-500 uppercase tracking-widest leading-none">Standard_Node</span>
                        </div>
                        <button onClick={() => deleteFeature(i)} className="p-2 text-white/20 hover:text-red-500 transition-colors"><FaTrash size={12} /></button>
                      </div>

                      <div className="space-y-6">
                        <div className="space-y-2">
                          <label className="text-[8px] font-black text-gray-500 uppercase tracking-widest ml-1">Title</label>
                          <input value={feat.title} onChange={(e) => handleUpdateFeature(i, 'title', e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-black uppercase tracking-tight focus:border-blue-500 outline-none transition-all" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[8px] font-black text-gray-500 uppercase tracking-widest ml-1">Icon Class</label>
                          <div className="flex gap-3">
                            <div className="w-11 h-11 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center text-blue-500"><i className={`bi ${feat.icon}`}></i></div>
                            <input value={feat.icon} onChange={(e) => handleUpdateFeature(i, 'icon', e.target.value)} className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-blue-400 text-xs font-mono outline-none focus:border-blue-500 transition-all" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[8px] font-black text-gray-500 uppercase tracking-widest ml-1">Detail</label>
                          <textarea value={feat.desc} onChange={(e) => handleUpdateFeature(i, 'desc', e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-gray-400 text-xs h-32 outline-none focus:border-blue-500 transition-all resize-none" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* --- PROCESS TAB --- */}
            {activeTab === 'process' && (
              <div className="space-y-6">
                <div className="flex justify-end"><button onClick={addProcess} className="bg-emerald-600 active:scale-95 transition-all text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-3 shadow-xl shadow-emerald-900/20"><FaPlus /> Add Step</button></div>
                <div className="space-y-6">
                  {serviceData.process?.map((step, i) => (
                    <div key={i} className="group relative bg-[#0f172a]/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 hover:border-blue-500/30 transition-all duration-500 shadow-xl flex gap-8 items-start">
                      <div className="w-24">
                        <label className="text-[8px] font-black text-gray-500 uppercase tracking-widest text-center block mb-2">Node_ID</label>
                        <input value={step.num} onChange={(e) => handleUpdateProcess(i, 'num', e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl py-3 text-blue-500 font-black text-center text-xl outline-none focus:border-blue-500 transition-all" />
                      </div>
                      <div className="flex-1 space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-[8px] font-black text-gray-500 uppercase tracking-widest ml-1">Flow Name</label>
                            <input value={step.title} onChange={(e) => handleUpdateProcess(i, 'title', e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-black uppercase tracking-tight focus:border-blue-500 outline-none transition-all" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[8px] font-black text-gray-500 uppercase tracking-widest ml-1">Icon Class</label>
                            <input value={step.icon} onChange={(e) => handleUpdateProcess(i, 'icon', e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-gray-500 text-[10px] font-mono outline-none focus:border-blue-500 transition-all" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[8px] font-black text-gray-500 uppercase tracking-widest ml-1">Internal Procedure</label>
                          <textarea value={step.desc} onChange={(e) => handleUpdateProcess(i, 'desc', e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-gray-400 text-xs h-24 outline-none focus:border-blue-500 transition-all resize-none" />
                        </div>
                      </div>
                      <button onClick={() => deleteProcess(i)} className="text-white/20 hover:text-red-500 p-3 mt-6 transition-colors"><FaTrash size={14} /></button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* --- TECH STACK TAB --- */}
            {activeTab === 'tech' && (
              <div className="space-y-6">
                <div className="flex justify-end"><button onClick={addTech} className="bg-emerald-600 active:scale-95 transition-all text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-3 shadow-xl shadow-emerald-900/20"><FaPlus /> Add Tech</button></div>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                  {serviceData.techStack?.map((tech, i) => (
                    <div key={i} className="group relative bg-[#0f172a]/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-6 hover:border-blue-500/30 transition-all duration-500 shadow-xl flex flex-col items-center gap-4">
                      <button onClick={() => deleteTech(i)} className="absolute top-4 right-4 text-white/20 hover:text-red-500 transition-colors"><FaTrash size={12} /></button>
                      <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:border-blue-500/50 transition-colors">
                        <i className={`bi ${tech.icon} text-4xl ${tech.color}`}></i>
                      </div>
                      <div className="w-full space-y-2">
                        <input value={tech.name} onChange={(e) => handleUpdateTech(i, 'name', e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl p-2.5 text-white text-[10px] font-black uppercase text-center outline-none focus:border-blue-500 transition-all" />
                        <input value={tech.icon} onChange={(e) => handleUpdateTech(i, 'icon', e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl p-2 text-gray-500 text-[8px] font-mono text-center outline-none focus:border-blue-500 transition-all" />
                        <input value={tech.color} onChange={(e) => handleUpdateTech(i, 'color', e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl p-2 text-gray-500 text-[8px] font-mono text-center outline-none focus:border-blue-500 transition-all" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* --- FAQ TAB --- */}
            {activeTab === 'faq' && (
              <div className="space-y-6">
                <div className="flex justify-end"><button onClick={addFaq} className="bg-emerald-600 active:scale-95 transition-all text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-3 shadow-xl shadow-emerald-900/20"><FaPlus /> Add FAQ</button></div>
                <div className="space-y-6">
                  {serviceData.faqs?.map((faq, i) => (
                    <div key={i} className="group relative bg-[#0f172a]/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 hover:border-blue-500/30 transition-all duration-500 shadow-xl flex gap-8">
                      <div className="flex-1 space-y-6">
                        <div className="space-y-2">
                          <label className="text-[8px] font-black text-gray-500 uppercase tracking-widest ml-1">Client Question</label>
                          <input value={faq.q} onChange={(e) => handleUpdateFaq(i, 'q', e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white text-sm font-black uppercase tracking-tight focus:border-blue-500 outline-none transition-all" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[8px] font-black text-gray-500 uppercase tracking-widest ml-1">System Response</label>
                          <textarea value={faq.a} onChange={(e) => handleUpdateFaq(i, 'a', e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-5 text-gray-400 text-xs h-24 outline-none focus:border-blue-500 transition-all resize-none" />
                        </div>
                      </div>
                      <button onClick={() => deleteFaq(i)} className="self-start text-white/20 hover:text-red-500 p-3 mt-8 transition-colors"><FaTrash size={14} /></button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'protocol' && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {serviceData.protocolDetails?.map((proto, idx) => (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      key={idx}
                      className="bg-[#0f172a]/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 hover:border-blue-500/30 transition-all duration-500 shadow-xl"
                    >
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-black text-white uppercase tracking-tighter flex items-center gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></div>
                          {proto.category} <span className="text-blue-500 text-[10px]">PROTOCOL</span>
                        </h3>
                        <button onClick={() => addProtocolSpec(idx)} className="text-emerald-500 hover:text-emerald-400 p-2"><FaPlus size={14} /></button>
                      </div>
                      <div className="space-y-4">
                        {proto.specs.map((spec, sIdx) => (
                          <div key={sIdx} className="group/spec flex items-end gap-3">
                            <div className="flex-1 space-y-2">
                              <input
                                value={spec.label}
                                onChange={(e) => {
                                  const newProtocols = [...serviceData.protocolDetails];
                                  newProtocols[idx].specs[sIdx].label = e.target.value;
                                  setServiceData({ ...serviceData, protocolDetails: newProtocols });
                                }}
                                className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-1.5 text-gray-500 text-[8px] font-black uppercase outline-none focus:border-blue-500 transition-all"
                                placeholder="Label"
                              />
                              <input
                                value={spec.value}
                                onChange={(e) => {
                                  const newProtocols = [...serviceData.protocolDetails];
                                  newProtocols[idx].specs[sIdx].value = e.target.value;
                                  setServiceData({ ...serviceData, protocolDetails: newProtocols });
                                }}
                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-blue-400 text-xs font-mono outline-none focus:border-blue-500 transition-all"
                                placeholder="Value"
                              />
                            </div>
                            <button onClick={() => deleteProtocolSpec(idx, sIdx)} className="text-red-500/50 hover:text-red-500 p-2 mb-1.5 opacity-0 group-hover/spec:opacity-100 transition-opacity"><FaTrash size={12} /></button>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
};

export default ServiceManager;
