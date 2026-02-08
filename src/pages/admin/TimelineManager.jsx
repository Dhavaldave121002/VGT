import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaTrash, FaEdit, FaSave, FaTimes, FaHistory, FaCalendarAlt } from 'react-icons/fa';

import { api } from '../../utils/api';

const TimelineManager = () => {
  const [events, setEvents] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [formData, setFormData] = useState({
    year: '',
    title: '',
    description: ''
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const data = await api.fetchAll('timeline');
    // detailed sort might be needed if API doesn't return sorted
    const sorted = data.sort((a, b) => a.year.localeCompare(b.year));
    setEvents(sorted);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this milestone?')) {
      await api.delete('timeline', id);
      fetchEvents();
    }
  };

  const handleEdit = (event) => {
    setCurrentEvent(event);
    setFormData(event);
    setIsEditing(true);
  };

  const handleAddNew = () => {
    setCurrentEvent(null);
    setFormData({ year: '', title: '', description: '' });
    setIsEditing(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const eventData = { ...formData };
    if (currentEvent) {
      eventData.id = currentEvent.id;
    } else {
      delete eventData.id; // Ensure no ID for insert
    }

    const response = await api.save('timeline', eventData);
    if (response.success) {
      fetchEvents();
      setIsEditing(false);
    } else {
      alert('Error saving event');
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black text-white uppercase tracking-tight mb-2">Timeline Manager</h1>
          <p className="text-gray-400 text-sm">Manage the company history and future milestones.</p>
        </div>
        <button
          onClick={handleAddNew}
          className="flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold uppercase text-xs tracking-widest transition-all shadow-lg shadow-blue-900/20"
        >
          <FaPlus /> Add Milestone
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Visual Preview List */}
        <div className="space-y-6">
          <AnimatePresence>
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className={`relative bg-[#0f172a]/40 backdrop-blur-xl p-8 rounded-[2rem] border transition-all group overflow-hidden ${currentEvent?.id === event.id ? 'border-blue-500/50 shadow-2xl shadow-blue-500/10' : 'border-white/5 hover:border-white/10'
                  }`}
              >
                {/* Visual Connector Line */}
                {index !== events.length - 1 && (
                  <div className="absolute left-14 top-24 bottom-[-1.5rem] w-[2px] bg-gradient-to-b from-blue-500/20 to-transparent z-0"></div>
                )}

                <div className="relative z-10 flex gap-6">
                  {/* Year Bubble */}
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 overflow-hidden relative">
                      <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <span className="text-blue-500 font-black text-xs tracking-tighter relative z-10">{event.year}</span>
                    </div>
                  </div>

                  {/* Content Hub */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-black text-white uppercase tracking-tight group-hover:text-blue-400 transition-colors uppercase">{event.title}</h3>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(event)}
                          className="p-3 bg-white/5 hover:bg-blue-600 rounded-xl text-gray-400 hover:text-white transition-all group/btn shadow-xl"
                          title="MOD_NODE"
                        >
                          <FaEdit size={14} className="group-active/btn:scale-90 transition-transform" />
                        </button>
                        <button
                          onClick={() => handleDelete(event.id)}
                          className="p-3 bg-white/5 hover:bg-red-600 rounded-xl text-gray-400 hover:text-white transition-all group/btn shadow-xl"
                          title="PURGE_NODE"
                        >
                          <FaTrash size={14} className="group-active/btn:scale-90 transition-transform" />
                        </button>
                      </div>
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed font-medium">{event.description}</p>

                    <div className="mt-4 flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-blue-500"></div>
                      <span className="text-[8px] font-black text-gray-700 uppercase tracking-[0.2em]">Milestone_Synced_Live</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {events.length === 0 && (
            <div className="text-center py-20 bg-[#0f172a]/20 border border-white/5 rounded-[2rem]">
              <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <FaHistory className="text-3xl text-gray-700" />
              </div>
              <p className="text-gray-500 font-black uppercase tracking-[0.3em] text-[10px]">No active ledger data detected</p>
            </div>
          )}
        </div>

        {/* Editor Panel (Sticky) */}
        <div className="lg:sticky lg:top-24 h-fit">
          <AnimatePresence mode="wait">
            {isEditing ? (
              <motion.div
                key="editor"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-[#1e293b]/50 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl"
              >
                <div className="flex justify-between items-center mb-10">
                  <div>
                    <h3 className="text-2xl font-black text-white uppercase tracking-tight">{currentEvent ? 'Mod_Milestone' : 'Init_Milestone'}</h3>
                    <p className="text-gray-500 font-black text-[8px] uppercase tracking-widest mt-1">Timeline_System_Configuration</p>
                  </div>
                  <button onClick={() => setIsEditing(false)} className="p-3 bg-white/5 hover:bg-white/10 rounded-xl text-gray-500 hover:text-white transition-all"><FaTimes /></button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Lifecycle_Year</label>
                    <div className="relative group/input">
                      <FaCalendarAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within/input:text-blue-500 transition-colors" />
                      <input
                        type="text"
                        value={formData.year}
                        onChange={e => setFormData({ ...formData, year: e.target.value })}
                        placeholder="e.g. 2025"
                        className="w-full bg-black/40 border border-white/10 rounded-2xl py-5 pl-12 pr-6 text-white placeholder-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 outline-none transition-all font-black text-sm"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Milestone_Identifier</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={e => setFormData({ ...formData, title: e.target.value })}
                      placeholder="e.g. GLOBAL_EXPANSION"
                      className="w-full bg-black/40 border border-white/10 rounded-2xl py-5 px-6 text-white placeholder-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 outline-none transition-all font-black uppercase text-sm"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Payload_Description</label>
                    <textarea
                      value={formData.description}
                      onChange={e => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Define the synchronization event..."
                      rows="5"
                      className="w-full bg-black/40 border border-white/10 rounded-2xl py-5 px-6 text-white placeholder-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 outline-none transition-all font-medium text-sm resize-none leading-relaxed"
                      required
                    ></textarea>
                  </div>

                  <div className="flex gap-4 pt-6">
                    <button
                      type="submit"
                      className="flex-[2] py-5 rounded-2xl font-black uppercase text-[10px] tracking-widest bg-blue-600 text-white hover:bg-blue-500 hover:shadow-2xl hover:shadow-blue-900/40 transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
                    >
                      <FaSave size={14} /> Commit_Protocol
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="flex-1 py-5 rounded-2xl font-black uppercase text-[10px] tracking-widest bg-white/5 text-gray-500 hover:bg-white/10 hover:text-white transition-all border border-white/5 active:scale-[0.98]"
                    >
                      Abort
                    </button>
                  </div>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="hidden lg:flex flex-col items-center justify-center h-full text-center p-12 opacity-30 select-none"
              >
                <div className="w-24 h-24 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                  <FaHistory className="text-4xl text-white" />
                </div>
                <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-2">Editor Ready</h3>
                <p className="text-sm">Select an item to edit or create a new milestone.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default TimelineManager;
