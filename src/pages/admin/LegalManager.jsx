import React, { useState, useEffect } from 'react';
import { api } from '../../utils/api';
import { SessionManager } from '../../utils/SessionManager';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaShieldAlt, FaFileContract, FaCookieBite, FaPlus, FaTrash, FaSave, FaEdit, FaEye, FaSync } from 'react-icons/fa';

const DEFAULT_PRIVACY = [
  { id: 1, title: 'Collecting and Using Your Personal Data', content: 'We collect several different types of information for various purposes to provide and improve our Service to you.' },
  { id: 2, title: 'Security of Your Personal Data', content: 'The security of Your Personal Data is important to Us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure.' }
];

const DEFAULT_TERMS = [
  { id: 1, title: 'Acknowledgment', content: 'These are the Terms and Conditions governing the use of this Service and the agreement that operates between You and the Company.' },
  { id: 2, title: 'Links to Other Websites', content: 'Our Service may contain links to third-party web sites or services that are not owned or controlled by the Company.' }
];

const DEFAULT_COOKIES = [
  { id: 1, title: 'Interpretation and Definitions', content: 'The words of which the initial letter is capitalized have meanings defined under the following conditions.' },
  { id: 2, title: 'The Use of the Cookies', content: 'We use Cookies to track the activity on Our Service and store certain information.' }
];

const LegalManager = () => {
  const [activeTab, setActiveTab] = useState('privacy'); // 'privacy' | 'terms' | 'cookies'
  const [sections, setSections] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ title: '', content: '' });
  const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleDateString());
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      SessionManager.requireAuth(navigate, true);
    };
    checkSession();
  }, [navigate]);

  const getStorageKey = (tab) => `legal_${tab}`; // Clean key for config table

  useEffect(() => {
    const loadLegal = async () => {
      const key = getStorageKey(activeTab);
      const data = await api.fetchConfig(key);

      if (data) {
        setSections(data.sections || []);
        setLastUpdated(data.lastUpdated || new Date().toLocaleDateString());
      } else {
        const defaults = activeTab === 'privacy' ? DEFAULT_PRIVACY : activeTab === 'terms' ? DEFAULT_TERMS : DEFAULT_COOKIES;
        setSections(defaults);
      }
    };
    loadLegal();
  }, [activeTab]);

  const handleSave = async () => {
    const key = getStorageKey(activeTab);
    const newData = { sections, lastUpdated: new Date().toLocaleDateString() };

    await api.saveConfig(key, newData);
    setLastUpdated(newData.lastUpdated);
    alert('Policy Updated Successfully!');
  };

  const addSection = () => {
    const newSection = { id: Date.now(), title: 'New Section Title', content: 'New section content goes here...' };
    setSections([...sections, newSection]);
    setEditingId(newSection.id);
    setEditForm({ title: newSection.title, content: newSection.content });
  };

  const deleteSection = (id) => {
    if (window.confirm('Delete this section?')) {
      setSections(sections.filter(s => s.id !== id));
    }
  };

  const startEdit = (section) => {
    setEditingId(section.id);
    setEditForm({ title: section.title, content: section.content });
  };

  const saveEdit = () => {
    setSections(sections.map(s => s.id === editingId ? { ...s, ...editForm } : s));
    setEditingId(null);
  };

  return (
    <div className="min-h-screen bg-[#020617] p-6 md:p-10 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black text-white uppercase tracking-tighter flex items-center gap-3">
              Legal <span className="text-blue-500">Node</span>
            </h1>
            <p className="text-gray-500 font-medium uppercase tracking-[0.3em] text-[10px] mt-2">Compliance & Data Governance</p>
          </div>

          <div className="bg-[#0f172a] p-1.5 rounded-2xl flex border border-white/10 shadow-2xl">
            {[
              { id: 'privacy', label: 'Privacy', icon: <FaShieldAlt /> },
              { id: 'terms', label: 'Terms', icon: <FaFileContract /> },
              { id: 'cookies', label: 'Cookies', icon: <FaCookieBite /> }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-3 ${activeTab === tab.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40' : 'text-gray-500 hover:text-white'}`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
        </header>

        <div className="bg-[#0f172a]/40 border border-white/5 rounded-[2.5rem] p-8 md:p-12 shadow-3xl backdrop-blur-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-[100px] -mr-48 -mt-48"></div>

          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 border-b border-white/5 pb-8">
              <div>
                <h2 className="text-2xl font-black text-white uppercase tracking-tight">Managing {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Policy</h2>
                <p className="text-gray-400 text-xs mt-1">Last Synchronization: <span className="text-blue-500 font-mono">{lastUpdated}</span></p>
              </div>
              <div className="flex gap-4">
                <button onClick={addSection} className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white text-[10px] font-black rounded-xl transition-all uppercase tracking-widest flex items-center gap-3 border border-white/5">
                  <FaPlus /> Add Section
                </button>
                <button onClick={handleSave} className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-black rounded-xl transition-all uppercase tracking-widest flex items-center gap-3 shadow-xl active:scale-95 shadow-blue-900/20">
                  <FaSave /> Push Changes
                </button>
              </div>
            </div>

            <div className="space-y-6">
              {sections.map((section, index) => (
                <motion.div
                  layout
                  key={section.id}
                  className={`bg-[#030712]/50 border rounded-2xl p-6 transition-all ${editingId === section.id ? 'border-blue-500/50 ring-1 ring-blue-500/20' : 'border-white/5'}`}
                >
                  {editingId === section.id ? (
                    <div className="space-y-4">
                      <input
                        value={editForm.title}
                        onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-bold focus:border-blue-500 outline-none"
                        placeholder="Section Title"
                      />
                      <textarea
                        value={editForm.content}
                        onChange={(e) => setEditForm({ ...editForm, content: e.target.value })}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-gray-400 text-sm h-48 focus:border-blue-500 outline-none resize-none"
                        placeholder="Section Content"
                      />
                      <div className="flex gap-3">
                        <button onClick={saveEdit} className="px-6 py-2 bg-emerald-600 text-white text-[10px] font-black rounded-lg uppercase">Save</button>
                        <button onClick={() => setEditingId(null)} className="px-6 py-2 bg-white/5 text-gray-400 text-[10px] font-black rounded-lg uppercase">Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start justify-between gap-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-blue-500 font-mono text-xs">Section_{index + 1}</span>
                          <h3 className="text-lg font-bold text-white tracking-tight">{section.title}</h3>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">{section.content}</p>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => startEdit(section)} className="p-3 bg-white/5 text-gray-400 hover:text-blue-500 rounded-xl transition-all border border-white/5"><FaEdit size={14} /></button>
                        <button onClick={() => deleteSection(section.id)} className="p-3 bg-white/5 text-gray-400 hover:text-red-500 rounded-xl transition-all border border-white/5"><FaTrash size={14} /></button>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}

              {sections.length === 0 && (
                <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10">
                  <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">No sections configured for this policy</p>
                  <button onClick={addSection} className="mt-4 text-blue-500 text-[10px] font-black uppercase underline">Initialize First Section</button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-12 p-8 bg-blue-600/5 rounded-3xl border border-blue-500/10 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="w-12 h-12 bg-blue-600/20 rounded-2xl flex items-center justify-center text-blue-500 text-xl">
              <FaEye />
            </div>
            <div>
              <h4 className="text-white font-bold tracking-tight">Public Visibility Portal</h4>
              <p className="text-gray-500 text-xs">Instantly preview and verify changes on the live legal pages.</p>
            </div>
          </div>
          <div className="flex gap-3">
            {['/privacy', '/terms', '/cookies'].map(path => (
              <a key={path} href={path} target="_blank" rel="noreferrer" className="px-5 py-2.5 bg-white/5 hover:bg-white/10 text-white text-[9px] font-black rounded-lg uppercase tracking-widest border border-white/5">
                View {path.slice(1)}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalManager;
