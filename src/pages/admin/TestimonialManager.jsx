import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaTrash, FaEdit, FaQuoteLeft, FaUser, FaBriefcase, FaImage, FaCheck, FaTimes } from 'react-icons/fa';

import { api } from '../../utils/api';

const TestimonialManager = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState({
    id: '',
    name: '',
    role: '',
    message: '',
    avatar: ''
  });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    const data = await api.fetchAll('testimonials');
    setTestimonials(data);
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const data = { ...currentTestimonial };
    if (!data.id) delete data.id;

    const response = await api.save('testimonials', data);

    if (response.success) {
      fetchTestimonials();
      resetForm();
    } else {
      alert("Error saving testimonial");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this success story?')) {
      await api.delete('testimonials', id);
      fetchTestimonials();
    }
  };

  const handleEdit = (testimonial) => {
    setCurrentTestimonial(testimonial);
    setIsEditing(true);
  };

  const resetForm = () => {
    setCurrentTestimonial({ id: '', name: '', role: '', message: '', avatar: '' });
    setIsEditing(false);
  };

  return (
    <div className="p-6 md:p-10 min-h-screen bg-[#020617] font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black text-white uppercase tracking-tighter mb-2">Success Stories</h1>
            <p className="text-gray-500 font-medium uppercase tracking-[0.3em] text-[10px]">Client Testimonial Management</p>
          </div>
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all shadow-xl shadow-blue-900/20 active:scale-95"
          >
            <FaPlus /> Add New Story
          </button>
        </header>

        {/* Modal / Form */}
        <AnimatePresence>
          {isEditing && (
            <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={resetForm}
                className="absolute inset-0 bg-black/80 backdrop-blur-md"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 30 }}
                className="relative w-full max-w-2xl bg-[#0f172a] border border-white/10 rounded-[2.5rem] shadow-3xl p-8 overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500"></div>

                <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-8">
                  {currentTestimonial.id ? 'Edit Story' : 'New Success Story'}
                </h2>

                <form onSubmit={handleSave} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Client Name</label>
                      <div className="relative group">
                        <FaUser className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-blue-500 transition-colors" />
                        <input
                          type="text"
                          required
                          value={currentTestimonial.name}
                          onChange={(e) => setCurrentTestimonial({ ...currentTestimonial, name: e.target.value })}
                          placeholder="e.g. John Doe"
                          className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-white text-sm font-bold focus:outline-none focus:border-blue-500/50 transition-all"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Role / Company</label>
                      <div className="relative group">
                        <FaBriefcase className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-blue-500 transition-colors" />
                        <input
                          type="text"
                          required
                          value={currentTestimonial.role}
                          onChange={(e) => setCurrentTestimonial({ ...currentTestimonial, role: e.target.value })}
                          placeholder="e.g. CEO, TechCorp"
                          className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-white text-sm font-bold focus:outline-none focus:border-blue-500/50 transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Profile Image URL</label>
                    <div className="relative group">
                      <FaImage className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-blue-500 transition-colors" />
                      <input
                        type="url"
                        required
                        value={currentTestimonial.avatar}
                        onChange={(e) => setCurrentTestimonial({ ...currentTestimonial, avatar: e.target.value })}
                        placeholder="https://..."
                        className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-white text-sm font-bold focus:outline-none focus:border-blue-500/50 transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Testimonial Content</label>
                    <div className="relative group">
                      <FaQuoteLeft className="absolute left-5 top-6 text-gray-600 group-focus-within:text-blue-500 transition-colors" />
                      <textarea
                        required
                        rows="4"
                        value={currentTestimonial.message}
                        onChange={(e) => setCurrentTestimonial({ ...currentTestimonial, message: e.target.value })}
                        placeholder="Write the client's experience here..."
                        className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-white text-sm font-bold focus:outline-none focus:border-blue-500/50 transition-all resize-none"
                      />
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      type="submit"
                      className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] transition-all active:scale-95 flex items-center justify-center gap-2"
                    >
                      <FaCheck /> {currentTestimonial.id ? 'Commit Changes' : 'Publish Story'}
                    </button>
                    <button
                      type="button"
                      onClick={resetForm}
                      className="px-8 bg-white/5 hover:bg-white/10 text-white py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] transition-all active:scale-95 flex items-center justify-center gap-2"
                    >
                      <FaTimes /> Cancel
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* List View */}
        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <motion.div
              key={t.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="group relative bg-[#0f172a]/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 hover:border-blue-500/30 transition-all duration-500 shadow-xl"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl p-1 bg-gradient-to-br from-blue-500 to-purple-600 shadow-xl">
                    <img src={t.avatar} alt={t.name} className="w-full h-full object-cover rounded-2xl border-2 border-[#0f172a]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                      <span className="text-[8px] font-black text-gray-500 uppercase tracking-widest leading-none">Verified_Source</span>
                    </div>
                    <div className="text-[10px] text-blue-500/80 font-black uppercase tracking-widest leading-none">Stored_Review</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(t)}
                    className="p-3 bg-white/10 hover:bg-blue-600 rounded-xl text-white transition-all shadow-lg"
                  >
                    <FaEdit size={12} />
                  </button>
                  <button
                    onClick={() => handleDelete(t.id)}
                    className="p-3 bg-white/10 hover:bg-red-600 rounded-xl text-white transition-all shadow-lg"
                  >
                    <FaTrash size={12} />
                  </button>
                </div>
              </div>

              <div className="text-blue-500 mb-6 opacity-30">
                <FaQuoteLeft size={24} />
              </div>

              <p className="text-gray-400 text-sm italic leading-relaxed mb-10 line-clamp-4">
                "{t.message}"
              </p>

              <div>
                <h4 className="text-lg font-black text-white uppercase tracking-tighter mb-1">{t.name}</h4>
                <p className="text-blue-500 font-black uppercase tracking-widest text-[10px]">{t.role}</p>
              </div>
            </motion.div>
          ))}

          {/* Add New Ghost Card */}
          <button
            onClick={() => setIsEditing(true)}
            className="group h-[320px] flex flex-col items-center justify-center gap-4 bg-white/[0.02] border border-dashed border-white/10 rounded-[2.5rem] hover:bg-white/[0.04] hover:border-blue-500/30 transition-all duration-500"
          >
            <div className="w-14 h-14 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
              <FaPlus size={20} />
            </div>
            <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em]">Share New Success</span>
          </button>
        </div>
      </div>
    </div >
  );
};

export default TestimonialManager;
