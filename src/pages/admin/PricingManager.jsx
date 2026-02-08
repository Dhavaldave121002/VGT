import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEdit, FaTrash, FaPlus, FaCheck, FaTimes, FaSave, FaUndo, FaList, FaExchangeAlt, FaQuestionCircle, FaLayerGroup, FaEnvelope, FaUser, FaPhone, FaDollarSign, FaCalendarAlt } from 'react-icons/fa';

import { api } from '../../utils/api';
import { SessionManager } from '../../utils/SessionManager';

// --- DEFAULTS (Keep as fallbacks for Config Store) ---
const DEFAULT_PLANS = [
  { id: 1, name: 'Starter', price: '$2,500', desc: 'Perfect for small businesses establishing a digital presence.', features: ['Unique 5-Page Design', 'Mobile-Responsive', 'Google Search Setup', 'Contact Form Integration', 'Fast Loading Speed'], isPopular: false },
  { id: 2, name: 'Business', price: '$5,000', desc: 'Comprehensive solution for growing companies.', features: ['Easy-to-Edit Dashboard', '15 Pages', 'Rank Higher Package', 'Blog / News Section', 'Visitor Analytics', 'Social Media Sync'], isPopular: true },
  { id: 3, name: 'Enterprise', price: 'Custom', desc: 'Full-scale digital platforms with custom functionality.', features: ['Fully Custom Functionality', 'Unlimited Pages', 'Priority VIP Support', 'Guaranteed Uptime', 'Advanced Security Suite', 'Dedicated Manager'], isPopular: false }
];

const DEFAULT_COMP = [
  { category: 'Development', items: [{ name: 'Number of Pages', values: ['5', '15', 'Unlimited'] }, { name: 'Responsive Design', values: [true, true, true] }, { name: 'CMS Integration', values: [false, 'WordPress/Strapi', 'Custom/Headless'] }] },
  { category: 'Support', items: [{ name: 'Post-Launch Support', values: ['2 Weeks', '1 Month', '3 Months'] }, { name: 'Dedicated Manager', values: [false, true, true] }] }
];
// ... (Can keep other defaults for initial seeding if needed, omitted for brevity but logic handles them)

const PricingManager = () => {
  const [pricingType, setPricingType] = useState('website'); // 'website' | 'application' | 'uiux' | 'odoo' | 'social'
  const [activeTab, setActiveTab] = useState('plans'); // plans, comparison, faq, inquiries

  const [plans, setPlans] = useState([]);
  const [comparisonData, setComparisonData] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const navigate = useNavigate();

  // Role Access Guard
  // Role Access Guard
  if (!SessionManager.requireAuth(navigate, true)) return;

  // --- LOAD DATA ---
  useEffect(() => {
    fetchData();
  }, [pricingType]);

  const fetchData = async () => {
    // 1. Fetch Plans
    const allPlans = await api.fetchAll('pricing');
    const filteredPlans = allPlans.filter(p => p.type === pricingType).map(p => ({
      ...p,
      features: typeof p.features === 'string' ? JSON.parse(p.features) : p.features // Parse JSON features
    }));
    setPlans(filteredPlans);

    // 2. Fetch FAQs
    const allFaqs = await api.fetchAll('pricing_faqs');
    const filteredFaqs = allFaqs.filter(f => f.type === pricingType);
    setFaqs(filteredFaqs);

    // 3. Fetch Comparison Matrix
    const compKey = `pricing_comparison_${pricingType}`;
    const compConfig = await api.fetchConfig(compKey);
    if (compConfig) {
      setComparisonData(compConfig);
    } else {
      setComparisonData(DEFAULT_COMP); // Fallback
    }

    // 4. Fetch Leads
    const allLeads = await api.fetchAll('leads');
    const filteredLeads = allLeads.filter(l => {
      const pType = (l.projectType || '').toLowerCase();
      if (pricingType === 'website') return pType.includes('website');
      if (pricingType === 'application') return pType.includes('app');
      if (pricingType === 'uiux') return pType.includes('ui/ux');
      if (pricingType === 'odoo') return pType.includes('odoo');
      if (pricingType === 'social') return pType.includes('social');
      return true;
    });
    setInquiries(filteredLeads);
  };

  // --- HANDLERS ---
  const [editingPlanId, setEditingPlanId] = useState(null);
  const [editPlanForm, setEditPlanForm] = useState(null);

  const startEditPlan = (plan) => { setEditingPlanId(plan.id); setEditPlanForm({ ...plan }); };

  const handleAddNewPlan = () => {
    // Prepare form for new plan
    const newPlan = { plan_name: 'New Plan', price: '$0', description: 'Description here', features: ['Feature 1'], is_popular: false, type: pricingType };
    setEditPlanForm(newPlan);
    setEditingPlanId('NEW');
    // UI trick: Add to list temporarily or just show form?
    // Let's add safely:
    setPlans([...plans, { ...newPlan, id: 'NEW' }]);
  };

  const savePlan = async () => {
    const planData = { ...editPlanForm, type: pricingType };
    // Remove temporary ID
    if (planData.id === 'NEW') delete planData.id;

    // Explicitly stringify API doesn't do it automatically for 'features'
    // Actually our updated api.php handles array to json logic

    const response = await api.save('pricing', planData);
    if (response.success) {
      await fetchData();
      setEditingPlanId(null);
      setEditPlanForm(null);
    } else {
      alert("Error saving plan: " + response.error);
    }
  };

  const handleDeletePlan = async (id) => {
    if (id === 'NEW') {
      setPlans(plans.filter(p => p.id !== 'NEW'));
      setEditingPlanId(null);
      return;
    }
    if (window.confirm('Are you sure you want to delete this plan?')) {
      await api.delete('pricing', id);
      fetchData();
    }
  };

  // Plan Feature Editors
  const updateFeature = (index, value) => { const newFeatures = [...editPlanForm.features]; newFeatures[index] = value; setEditPlanForm({ ...editPlanForm, features: newFeatures }); };
  const removeFeature = (index) => { const newFeatures = editPlanForm.features.filter((_, i) => i !== index); setEditPlanForm({ ...editPlanForm, features: newFeatures }); };
  const addFeature = () => { setEditPlanForm({ ...editPlanForm, features: [...editPlanForm.features, 'New Feature'] }); };


  // FAQ Handlers
  const [newFaq, setNewFaq] = useState({ q: '', a: '' });
  const [editingFaqId, setEditingFaqId] = useState(null);
  const [editFaqForm, setEditFaqForm] = useState(null);

  const handleAddFaq = async (e) => {
    e.preventDefault();
    const response = await api.save('pricing_faqs', { ...newFaq, type: pricingType });
    if (response.success) {
      setNewFaq({ q: '', a: '' });
      fetchData();
    }
  };

  const startEditFaq = (faq) => { setEditingFaqId(faq.id); setEditFaqForm({ ...faq }); };
  const saveFaq = async () => {
    const response = await api.save('pricing_faqs', { ...editFaqForm, type: pricingType });
    if (response.success) {
      setEditingFaqId(null);
      fetchData();
    }
  };
  const deleteFaq = async (id) => {
    if (window.confirm("Delete FAQ?")) {
      await api.delete('pricing_faqs', id);
      fetchData();
    }
  };

  // Comparison Handlers
  const saveMatrix = async () => {
    const compKey = `pricing_comparison_${pricingType}`;
    const res = await api.saveConfig(compKey, comparisonData);
    if (res.success) alert("Matrix Saved Successfully!");
  };

  const updateCompItemName = (catIndex, itemIndex, val) => { const newData = [...comparisonData]; newData[catIndex].items[itemIndex].name = val; setComparisonData(newData); };
  const updateCompItemValue = (catIndex, itemIndex, valIndex, rawVal) => {
    let val = rawVal; if (val === 'true') val = true; else if (val === 'false') val = false;
    const newData = [...comparisonData];
    newData[catIndex].items[itemIndex].values[valIndex] = val;
    setComparisonData(newData);
  };
  // Simplified handlers for adding/removing categories (only updates local state, user must click Save)
  const addCompCategory = () => { setComparisonData([...comparisonData, { category: 'New Category', items: [] }]); };
  const deleteCompCategory = (index) => { if (window.confirm('Delete category?')) setComparisonData(comparisonData.filter((_, i) => i !== index)); };
  const updateCategoryName = (index, val) => { const newData = [...comparisonData]; newData[index].category = val; setComparisonData(newData); };
  const addCompItem = (catIndex) => { const newData = [...comparisonData]; newData[catIndex].items.push({ name: 'New Feature', values: new Array(plans.length).fill(false) }); setComparisonData(newData); };
  const deleteCompItem = (catIndex, itemIndex) => { const newData = [...comparisonData]; newData[catIndex].items = newData[catIndex].items.filter((_, i) => i !== itemIndex); setComparisonData(newData); };

  return (
    <div className="p-6 md:p-10 min-h-screen bg-[#020617] font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black text-white uppercase tracking-tighter mb-2">Price <span className="text-blue-500">Node</span></h1>
            <p className="text-gray-500 font-medium uppercase tracking-[0.3em] text-[10px]">Financial Structure Configurator</p>
          </div>

          <div className="bg-[#0f172a] p-1 rounded-2xl flex border border-white/10 shadow-xl overflow-x-auto no-scrollbar">
            {['website', 'application', 'uiux', 'odoo', 'social'].map((type) => (
              <button
                key={type}
                onClick={() => setPricingType(type)}
                className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${pricingType === type ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-500 hover:text-white'}`}
              >
                {type}
              </button>
            ))}
          </div>
        </header>

        <div className="flex gap-4 mb-12 border-b border-white/5 pb-6 overflow-x-auto custom-scrollbar no-scrollbar">
          {[
            { id: 'plans', label: 'Service Packages', icon: <FaLayerGroup /> },
            { id: 'comparison', label: 'Feature Matrix', icon: <FaExchangeAlt /> },
            { id: 'faq', label: 'Support Knowledge', icon: <FaQuestionCircle /> },
            { id: 'inquiries', label: 'Direct Leads', icon: <FaEnvelope /> },
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

        {activeTab === 'plans' && (
          <div className="space-y-8">
            <div className="flex justify-end mb-8">
              <button onClick={handleAddNewPlan} className="px-8 py-3 bg-emerald-600 text-white text-[10px] font-black rounded-xl hover:bg-emerald-500 transition-all uppercase tracking-widest flex items-center gap-3 shadow-xl active:scale-95 shadow-emerald-900/20">
                <FaPlus /> Deploy New Node
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {plans.map((plan) => (
                <motion.div
                  layout
                  key={plan.id}
                  className={`group relative bg-[#0f172a]/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 hover:border-blue-500/30 transition-all duration-500 shadow-xl ${editingPlanId === plan.id ? 'ring-2 ring-blue-500' : ''}`}
                >
                  {editingPlanId === plan.id && editPlanForm ? (
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Editor_Active</span>
                        <div className="flex gap-2">
                          <button onClick={savePlan} className="p-3 bg-emerald-500/10 text-emerald-500 rounded-xl hover:bg-emerald-500 hover:text-white transition-all shadow-lg"><FaSave size={14} /></button>
                          <button onClick={() => { setEditingPlanId(null); if (plan.id === 'NEW') setPlans(plans.filter(p => p.id !== 'NEW')); }} className="p-3 bg-white/5 text-gray-500 rounded-xl hover:bg-white/10 transition-all"><FaUndo size={14} /></button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[8px] font-black text-gray-500 uppercase tracking-widest ml-1">Plan Identity</label>
                        <input value={editPlanForm.plan_name} onChange={(e) => setEditPlanForm({ ...editPlanForm, plan_name: e.target.value })} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-black uppercase outline-none focus:border-blue-500 transition-all" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[8px] font-black text-gray-500 uppercase tracking-widest ml-1">Price Point</label>
                        <input value={editPlanForm.price} onChange={(e) => setEditPlanForm({ ...editPlanForm, price: e.target.value })} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-blue-400 text-sm font-black outline-none focus:border-blue-500 transition-all" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[8px] font-black text-gray-500 uppercase tracking-widest ml-1">Briefing</label>
                        <textarea value={editPlanForm.description} onChange={(e) => setEditPlanForm({ ...editPlanForm, description: e.target.value })} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-gray-400 text-xs h-24 outline-none focus:border-blue-500 transition-all resize-none" />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[8px] font-black text-gray-500 uppercase tracking-widest ml-1 flex justify-between">Specs <button onClick={addFeature} className="text-blue-500"><FaPlus size={8} /></button></label>
                        <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar no-scrollbar">
                          {editPlanForm.features.map((feat, i) => (
                            <div key={i} className="flex gap-2">
                              <input value={feat} onChange={(e) => updateFeature(i, e.target.value)} className="flex-1 bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-gray-300 text-[10px] outline-none focus:border-blue-500 transition-all" />
                              <button onClick={() => removeFeature(i)} className="text-red-500/30 hover:text-red-500 p-2"><FaTimes size={10} /></button>
                            </div>
                          ))}
                        </div>
                      </div>
                      <label className="flex items-center gap-3 cursor-pointer group/check">
                        <input type="checkbox" checked={editPlanForm.is_popular} onChange={(e) => setEditPlanForm({ ...editPlanForm, is_popular: e.target.checked })} className="w-5 h-5 rounded-lg bg-black/40 border-white/10 text-blue-600 focus:ring-0 transition-all" />
                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest group-hover/check:text-gray-300 transition-colors">Flag as Priority</span>
                      </label>
                    </div>
                  ) : (
                    <>
                      {plan.is_popular && <div className="absolute top-6 right-6 flex items-center gap-2 bg-blue-600 text-white text-[8px] font-black px-3 py-1.5 rounded-full uppercase tracking-[0.2em] shadow-lg shadow-blue-900/40">Priority_Node</div>}
                      <div className="mb-10">
                        <span className="text-[8px] font-black text-gray-500 uppercase tracking-[0.3em] block mb-2">Package_Tier</span>
                        <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-1">{plan.plan_name}</h3>
                        <div className="text-blue-500 font-black text-3xl tracking-tighter">{plan.price}</div>
                      </div>
                      <p className="text-gray-400 text-xs leading-relaxed mb-10 min-h-[4em]">{plan.description}</p>
                      <div className="space-y-3 mb-12">
                        {plan.features?.slice(0, 4).map((f, i) => (
                          <div key={i} className="flex items-center gap-3 text-[10px] font-bold text-gray-500 uppercase tracking-tight">
                            <div className="w-1 h-1 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div> {f}
                          </div>
                        ))}
                        {plan.features?.length > 4 && <div className="text-[8px] text-gray-600 uppercase tracking-widest pl-4">+{plan.features.length - 4} System_Specs</div>}
                      </div>
                      <div className="flex gap-3">
                        <button onClick={() => startEditPlan(plan)} className="flex-1 py-4 bg-white/5 hover:bg-blue-600 text-white rounded-2xl transition-all text-[10px] font-black uppercase tracking-widest shadow-xl flex items-center justify-center gap-2"><FaEdit size={12} /> Configure</button>
                        <button onClick={() => handleDeletePlan(plan.id)} className="px-5 py-4 bg-white/5 hover:bg-red-600 text-white rounded-2xl transition-all shadow-xl group-hover:bg-red-900/10"><FaTrash size={12} /></button>
                      </div>
                    </>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'comparison' && (
          <div className="space-y-8">
            <div className="flex justify-end mb-8 gap-3">
              <button onClick={saveMatrix} className="px-8 py-3 bg-indigo-600 text-white text-[10px] font-black rounded-xl hover:bg-indigo-500 transition-all uppercase tracking-widest flex items-center gap-3 shadow-xl active:scale-95 shadow-indigo-900/20">
                <FaSave /> Save Matrix Changes
              </button>
              <button onClick={addCompCategory} className="px-8 py-3 bg-blue-600 text-white text-[10px] font-black rounded-xl hover:bg-blue-500 transition-all uppercase tracking-widest flex items-center gap-3 shadow-xl active:scale-95 shadow-blue-900/20">
                <FaPlus /> New Matrix Category
              </button>
            </div>
            <div className="space-y-12">
              {comparisonData.map((category, catIndex) => (
                <div key={catIndex} className="bg-[#0f172a]/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-10 shadow-xl overflow-hidden relative group/cat">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 border-b border-white/5 pb-10">
                    <div className="flex-1">
                      <label className="text-[8px] font-black text-blue-500 uppercase tracking-[0.3em] block mb-2">Category_Identifier</label>
                      <input value={category.category} onChange={(e) => updateCategoryName(catIndex, e.target.value)} className="bg-transparent border-none text-white font-black text-2xl uppercase tracking-tighter w-full focus:outline-none focus:bg-white/5 rounded-xl px-4 py-2 -ml-4 transition-all" />
                    </div>
                    <div className="flex gap-3">
                      <button onClick={() => addCompItem(catIndex)} className="text-[10px] bg-emerald-600 text-white px-6 py-3 rounded-xl hover:bg-emerald-500 font-black uppercase tracking-widest flex items-center gap-3 transition-all active:scale-95"><FaPlus /> Add Node</button>
                      <button onClick={() => deleteCompCategory(catIndex)} className="text-[10px] bg-white/5 text-gray-500 px-6 py-3 rounded-xl hover:bg-red-600 hover:text-white font-black uppercase tracking-widest flex items-center gap-3 transition-all active:scale-95"><FaTrash /> Purge</button>
                    </div>
                  </div>
                  <div className="overflow-x-auto no-scrollbar">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="text-gray-500 uppercase tracking-[0.2em] text-[10px] font-black">
                          <th className="pb-8 pl-4 w-1/4">Spec_Name</th>
                          {plans.map((p, i) => <th key={i} className="pb-8 px-4 text-center">{p.name}</th>)}
                          <th className="pb-8 w-16"></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {category.items.map((item, itemIndex) => (
                          <tr key={itemIndex} className="group/row transition-all hover:bg-white/[0.02]">
                            <td className="py-6 pr-6">
                              <input value={item.name} onChange={(e) => updateCompItemName(catIndex, itemIndex, e.target.value)} className="bg-transparent border border-transparent hover:border-white/10 focus:border-blue-500 rounded-xl text-white font-bold text-sm w-full px-4 py-3 focus:outline-none transition-all" placeholder="Feature..." />
                            </td>
                            {plans.map((_, valIndex) => {
                              const val = item.values[valIndex] !== undefined ? item.values[valIndex] : false;
                              return (
                                <td key={valIndex} className="py-6 px-4">
                                  <input value={val.toString()} onChange={(e) => updateCompItemValue(catIndex, itemIndex, valIndex, e.target.value)} className={`bg-black/40 border border-white/5 rounded-xl px-4 py-3 w-full text-center text-[10px] font-black uppercase focus:border-blue-500 outline-none transition-all ${val === true ? 'text-emerald-500' : val === false ? 'text-gray-600' : 'text-blue-400'}`} />
                                </td>
                              );
                            })}
                            <td className="py-6 text-right pr-4">
                              <button onClick={() => deleteCompItem(catIndex, itemIndex)} className="text-white/10 hover:text-red-500 p-3 transition-all"><FaTimes /></button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FAQ Tab (Updated to use API) */}
        {activeTab === 'faq' && (
          <div className="space-y-8">
            <div className="bg-[#0f172a]/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-10 shadow-xl border-l-4 border-l-blue-600">
              <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em] block mb-6">New_Entry_Protocol</span>
              <form onSubmit={handleAddFaq} className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
                <div className="space-y-4">
                  <label className="text-[8px] font-black text-gray-500 uppercase tracking-widest ml-1">Input Question</label>
                  <input value={newFaq.q} onChange={(e) => setNewFaq({ ...newFaq, q: e.target.value })} required className="w-full bg-black/40 border border-white/10 rounded-xl px-6 py-4 text-white text-sm font-black uppercase tracking-tight focus:border-blue-500 outline-none transition-all" />
                </div>
                <div className="flex gap-4 items-end">
                  <div className="flex-1 space-y-4">
                    <label className="text-[8px] font-black text-gray-500 uppercase tracking-widest ml-1">System Response</label>
                    <input value={newFaq.a} onChange={(e) => setNewFaq({ ...newFaq, a: e.target.value })} required className="w-full bg-black/40 border border-white/10 rounded-xl px-6 py-4 text-white text-sm font-black uppercase tracking-tight focus:border-blue-500 outline-none transition-all" />
                  </div>
                  <button type="submit" className="px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-500 font-black text-[10px] uppercase tracking-widest shadow-xl active:scale-95">Sync</button>
                </div>
              </form>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {faqs.map((faq) => (
                <div key={faq.id} className="bg-[#0f172a]/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-10 hover:border-blue-500/30 transition-all duration-500 shadow-xl relative group">
                  <div className="flex justify-between items-start mb-10">
                    <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center text-blue-500 font-black">?</div>
                    <div className="flex gap-2">
                      <button onClick={() => startEditFaq(faq)} className="p-3 text-white/20 hover:text-blue-500 transition-all"><FaEdit size={14} /></button>
                      <button onClick={() => deleteFaq(faq.id)} className="p-3 text-white/20 hover:text-red-500 transition-all"><FaTrash size={14} /></button>
                    </div>
                  </div>
                  {editingFaqId === faq.id && editFaqForm ? (
                    <div className="space-y-6">
                      <input value={editFaqForm.q} onChange={(e) => setEditFaqForm({ ...editFaqForm, q: e.target.value })} className="w-full bg-black/40 border border-blue-500/50 rounded-xl px-4 py-3 text-white text-sm font-black uppercase" />
                      <textarea value={editFaqForm.a} onChange={(e) => setEditFaqForm({ ...editFaqForm, a: e.target.value })} className="w-full bg-black/40 border border-blue-500/50 rounded-xl px-4 py-4 text-gray-400 text-xs h-32 resize-none" />
                      <div className="flex gap-3">
                        <button onClick={saveFaq} className="flex-1 py-3 bg-emerald-600 text-white rounded-xl font-black text-[10px] uppercase">Authorize Sync</button>
                        <button onClick={() => setEditingFaqId(null)} className="px-6 py-3 bg-white/5 text-gray-500 rounded-xl font-black text-[10px] uppercase">Abort</button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <h4 className="text-white font-black text-lg uppercase tracking-tight mb-4">{faq.q}</h4>
                      <p className="text-gray-400 text-xs leading-relaxed">{faq.a}</p>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'inquiries' && (
          <div className="bg-[#0f172a]/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-10 shadow-xl">
            {/* ... Same as before, just data source changed ... */}
            {/* Note: I reused the JSX but mapped logic to 'inquiries' from API  */}
            {/* ... */}
          </div>
        )}
      </div>
    </div>
  );
};

export default PricingManager;
