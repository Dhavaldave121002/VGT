import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaTrash, FaEdit, FaSave, FaTimes, FaDatabase, FaRocket } from 'react-icons/fa';

import { api } from '../../utils/api';

const DEFAULT_BRANDS = []; // Defaults handled by API empty state or initial seed if desired

const COLORS = [
  { label: 'Blue', color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20" },
  { label: 'Green', color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
  { label: 'Cyan', color: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/20" },
  { label: 'Purple', color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20" },
  { label: 'Orange', color: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/20" },
  { label: 'Pink', color: "text-pink-400", bg: "bg-pink-500/10", border: "border-pink-500/20" },
  { label: 'Yellow', color: "text-yellow-400", bg: "bg-yellow-500/10", border: "border-yellow-500/20" },
];

const BrandManager = () => {
  const [brands, setBrands] = useState([]);
  const [isEditing, setIsEditing] = useState(null); // id of brand being edited
  const [formData, setFormData] = useState({ name: '', icon: '', colorIndex: 0 });
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    const data = await api.fetchAll('brands');
    setBrands(data);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const color = COLORS[formData.colorIndex];
    const newBrand = {
      name: formData.name,
      icon: formData.icon || 'star',
      color: color.color,
      bg: color.bg,
      border: color.border
    };

    const response = await api.save('brands', newBrand);
    if (response.success) {
      fetchBrands();
      resetForm();
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const color = COLORS[formData.colorIndex];
    const updatedBrand = {
      id: isEditing,
      name: formData.name,
      icon: formData.icon,
      color: color.color,
      bg: color.bg,
      border: color.border
    };

    const response = await api.save('brands', updatedBrand);
    if (response.success) {
      fetchBrands();
      resetForm();
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('CRITICAL: Delete this brand entity from the roster?')) {
      await api.delete('brands', id);
      fetchBrands();
    }
  };

  const startEdit = (brand) => {
    const colorIdx = COLORS.findIndex(c => c.color === brand.color);
    setFormData({ name: brand.name, icon: brand.icon, colorIndex: colorIdx === -1 ? 0 : colorIdx });
    setIsEditing(brand.id);
    setIsAdding(true);
  };

  const resetForm = () => {
    setFormData({ name: '', icon: '', colorIndex: 0 });
    setIsEditing(null);
    setIsAdding(false);
  };

  return (
    <div className="p-6 md:p-10 min-h-screen bg-[#020617] font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black text-white uppercase tracking-tighter mb-2">Brand <span className="text-blue-500">Node</span></h1>
            <p className="text-gray-500 font-medium uppercase tracking-[0.3em] text-[10px]">Corporate Identity Registry</p>
          </div>
          {!isAdding && (
            <button
              onClick={() => setIsAdding(true)}
              className="flex items-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all shadow-xl shadow-blue-900/20 active:scale-95"
            >
              <FaPlus /> Authorize New Node
            </button>
          )}
        </header>

        <AnimatePresence mode="wait">
          {isAdding && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="glass-panel p-10 border-blue-500/20 relative">
                <button onClick={resetForm} className="absolute top-6 right-6 text-gray-500 hover:text-white"><FaTimes /></button>

                <form onSubmit={isEditing ? handleUpdate : handleAdd} className="space-y-8">
                  <div className="grid md:grid-cols-3 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Brand Identifier</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Cyberdyne"
                        className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white text-sm focus:border-blue-500 outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Icon (Bootstrap Icon Name)</label>
                      <input
                        type="text"
                        required
                        value={formData.icon}
                        onChange={e => setFormData({ ...formData, icon: e.target.value })}
                        placeholder="e.g. cpu, graph-up, shield"
                        className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white text-sm focus:border-blue-500 outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Visual Theme</label>
                      <div className="flex flex-wrap gap-2">
                        {COLORS.map((c, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setFormData({ ...formData, colorIndex: idx })}
                            className={`w-10 h-10 rounded-lg ${c.bg} border-2 transition-all ${formData.colorIndex === idx ? 'border-white' : 'border-transparent'}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button type="submit" className="flex-1 py-4 bg-blue-600 text-white font-black text-xs uppercase tracking-[0.2em] rounded-xl hover:bg-blue-500 transition-all flex items-center justify-center gap-3">
                      {isEditing ? <><FaSave /> Update Node</> : <><FaRocket /> Commit Node</>}
                    </button>
                    <button type="button" onClick={resetForm} className="px-8 py-4 bg-white/5 text-gray-400 font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-white/10 transition-all">
                      Discard
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Brand Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <AnimatePresence>
            {brands.map((brand) => (
              <motion.div
                layout
                key={brand.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className={`group relative p-8 rounded-[2.5rem] bg-[#0f172a]/40 backdrop-blur-xl border border-white/5 hover:border-blue-500/30 transition-all duration-500 shadow-xl overflow-hidden`}
              >
                <div className="flex flex-col items-center gap-6 text-center">
                  <div className={`w-16 h-16 rounded-2xl ${brand.bg} ${brand.color} flex items-center justify-center text-3xl transition-transform group-hover:scale-110 duration-500`}>
                    <i className={`bi bi-${brand.icon}`}></i>
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-white tracking-tight">{brand.name}</h3>
                    <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mt-1">Active Partner</p>
                  </div>
                </div>

                {/* Action Overlays */}
                <div className="absolute top-4 right-4 flex gap-2">
                  <button
                    onClick={() => startEdit(brand)}
                    className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all shadow-xl"
                  >
                    <FaEdit size={12} />
                  </button>
                  <button
                    onClick={() => handleDelete(brand.id)}
                    className="w-8 h-8 rounded-lg bg-red-500/10 text-red-500 border border-red-500/20 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all shadow-xl"
                  >
                    <FaTrash size={12} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {brands.length === 0 && (
            <div className="col-span-full py-24 text-center border border-dashed border-white/5 rounded-[2.5rem] bg-white/[0.01]">
              <FaDatabase className="mx-auto text-4xl text-white/5 mb-6 animate-pulse" />
              <p className="text-[10px] font-black text-gray-700 uppercase tracking-[0.5em]">Registry_Empty</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default BrandManager;
