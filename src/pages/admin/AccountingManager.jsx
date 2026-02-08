import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaTrash, FaEdit, FaFileExcel, FaChartLine, FaArrowUp, FaArrowDown, FaFilter } from 'react-icons/fa';
import { api } from '../../utils/api';
import { SessionManager } from '../../utils/SessionManager';

const DEFAULT_FY = "2025-2026";

const AccountingManager = () => {
  const [data, setData] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [filterFY, setFilterFY] = useState(DEFAULT_FY);
  const [form, setForm] = useState({ date: '', desc: '', type: 'Income', amount: '', category: 'General', fy: DEFAULT_FY });
  const [editingId, setEditingId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Role Check
    // Role Check
    if (!SessionManager.requireAuth(navigate, true)) return;

    fetchData();
  }, [navigate]);

  const fetchData = async () => {
    const records = await api.fetchAll('accounting');
    setData(records);
  };
  // Removed saveToStorage as API handles persistence

  const handleSave = async (e) => {
    e.preventDefault();
    const payload = { ...form };
    if (editingId) payload.id = editingId;

    const response = await api.save('accounting', payload);
    if (response.success) {
      fetchData();
      setFilterFY(form.fy);
      resetForm();
    } else {
      alert("Error saving record");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Protocol: PURGE FINANCIAL NODE?')) {
      await api.delete('accounting', id);
      fetchData();
    }
  };

  const handleEdit = (item) => {
    setForm(item);
    setEditingId(item.id);
    setIsAdding(true);
  };

  const resetForm = () => {
    setForm({ date: '', desc: '', type: 'Income', amount: '', category: 'General', fy: filterFY });
    setEditingId(null);
    setIsAdding(false);
  };

  const exportToCSV = (filterType = 'All') => {
    let filtered = data.filter(d => d.fy === filterFY);
    const displayFY = filterFY.startsWith('20') ? `FY ${filterFY.slice(2, 4)}-${filterFY.slice(7, 9)}` : filterFY;

    if (filterType !== 'All') {
      filtered = filtered.filter(d => d.type === filterType);
    }

    if (!filtered.length) {
      const typeStr = filterType === 'All' ? 'accounting' : filterType.toLowerCase();
      return alert(`System Notice: No ${typeStr} records detected for ${displayFY}. Populate the ledger to enable data extraction protocol.`);
    }

    const headers = ["Date", "Description", "Type", "Amount", "Category", "FY"];
    const csvContent = "data:text/csv;charset=utf-8," + headers.join(",") + "\n" + filtered.map(d => `${d.date},"${d.desc}",${d.type},${d.amount},${d.category},${d.fy}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${filterType}_Accounting_${filterFY}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const cleanNum = (val) => Number(val?.toString().replace(/[^0-9.]/g, '')) || 0;

  // Dynamic FY list based on data + defaults
  const fyOptions = [...new Set(["2024-2025", "2025-2026", "2026-2027", "2027-2028", ...data.map(d => d.fy)])].sort((a, b) => b.localeCompare(a));

  const filteredData = data.filter(d => d.fy === filterFY);
  const totalIncome = filteredData.filter(d => d.type === 'Income').reduce((acc, curr) => acc + cleanNum(curr.amount), 0);
  const totalExpense = filteredData.filter(d => d.type === 'Expense').reduce((acc, curr) => acc + cleanNum(curr.amount), 0);
  const netProfit = totalIncome - totalExpense;

  return (
    <div className="p-6 md:p-10 min-h-screen bg-[#020617] font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black text-white uppercase tracking-tighter mb-2">Accounting <span className="text-blue-500">Node</span></h1>
            <p className="text-gray-500 font-medium uppercase tracking-[0.3em] text-[10px]">Financial Flow & Analytics Pipeline</p>
          </div>
          <div className="flex gap-4">
            <select
              value={filterFY}
              onChange={(e) => setFilterFY(e.target.value)}
              className="bg-[#0f172a] border border-white/10 text-white text-[10px] font-black uppercase tracking-widest rounded-xl px-4 py-3 outline-none focus:border-blue-500 transition-all cursor-pointer hover:bg-white/5 appearance-none min-w-[120px]"
            >
              {fyOptions.map(fy => (
                <option key={fy} value={fy} className="bg-[#0f172a] text-white py-2">{fy.startsWith('20') ? `FY ${fy.slice(2, 4)}-${fy.slice(7, 9)}` : fy}</option>
              ))}
            </select>
            <button onClick={() => exportToCSV('All')} className="px-8 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl font-black uppercase text-[10px] tracking-widest flex items-center gap-2 transition-all border border-white/5"><FaFileExcel /> Export_Payload</button>
            <button onClick={() => { setForm(prev => ({ ...prev, fy: filterFY })); setIsAdding(true); }} className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-black uppercase text-[10px] tracking-widest flex items-center gap-2 transition-all shadow-xl shadow-blue-900/20 active:scale-95"><FaPlus /> Provision Entry</button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-[#0f172a]/40 backdrop-blur-xl border border-emerald-500/20 p-10 rounded-[2.5rem] shadow-xl group hover:border-emerald-500/50 transition-all overflow-hidden relative">
            <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity rotate-12"><FaArrowDown size={100} className="text-emerald-500" /></div>
            <div className="flex justify-between items-start relative z-10">
              <div className="text-emerald-500 mb-3 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em]"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div> Transmission_In</div>
              <button
                onClick={() => exportToCSV('Income')}
                className="p-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 rounded-lg text-[8px] font-black tracking-widest uppercase transition-all"
                title="Download Income Report"
              >
                <FaFileExcel />
              </button>
            </div>
            <div className="text-4xl font-black text-white tracking-tighter relative z-10">₹{totalIncome.toLocaleString()}</div>
          </div>
          <div className="bg-[#0f172a]/40 backdrop-blur-xl border border-red-500/20 p-10 rounded-[2.5rem] shadow-xl group hover:border-red-500/50 transition-all overflow-hidden relative">
            <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity rotate-12"><FaArrowUp size={100} className="text-red-500" /></div>
            <div className="flex justify-between items-start relative z-10">
              <div className="text-red-500 mb-3 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em]"><div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></div> Transmission_Out</div>
              <button
                onClick={() => exportToCSV('Expense')}
                className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg text-[8px] font-black tracking-widest uppercase transition-all"
                title="Download Expense Report"
              >
                <FaFileExcel />
              </button>
            </div>
            <div className="text-4xl font-black text-white tracking-tighter relative z-10">₹{totalExpense.toLocaleString()}</div>
          </div>
          <div className={`bg-[#0f172a]/40 backdrop-blur-xl border border-blue-500/20 p-10 rounded-[2.5rem] shadow-xl group hover:border-blue-500/50 transition-all overflow-hidden relative`}>
            <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity rotate-12"><FaChartLine size={100} className="text-blue-500" /></div>
            <div className="text-blue-500 mb-3 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] relative z-10"><div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></div> Net_Yield</div>
            <div className={`text-4xl font-black tracking-tighter relative z-10 ${netProfit >= 0 ? 'text-white' : 'text-red-400'}`}>₹{netProfit.toLocaleString()}</div>
          </div>
        </div>

        <AnimatePresence>
          {isAdding && (
            <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={resetForm} className="absolute inset-0 bg-black/80 backdrop-blur-md" />
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative bg-[#0f172a] border border-white/10 rounded-[2.5rem] p-10 max-w-lg w-full shadow-3xl overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500"></div>
                <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-8">{editingId ? 'Modify Ledger' : 'Initialize Entry'}</h2>
                <form onSubmit={handleSave} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2"><label className="text-[8px] font-black text-gray-500 uppercase tracking-widest ml-1">Timestamp</label><input type="date" required value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} className="w-full bg-black/40 border border-white/10 p-4 rounded-xl text-white text-sm focus:border-blue-500 outline-none transition-all" /></div>
                    <div className="space-y-2"><label className="text-[8px] font-black text-gray-500 uppercase tracking-widest ml-1">Phase</label><select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} className="w-full bg-black/40 border border-white/10 p-4 rounded-xl text-white text-sm focus:border-blue-500 outline-none transition-all font-black uppercase"><option value="Income" className="bg-[#0f172a]">Income</option><option value="Expense" className="bg-[#0f172a]">Expense</option></select></div>
                  </div>
                  <div className="space-y-2"><label className="text-[8px] font-black text-gray-500 uppercase tracking-widest ml-1">Transmission_Desc</label><input type="text" required value={form.desc} onChange={e => setForm({ ...form, desc: e.target.value })} className="w-full bg-black/40 border border-white/10 p-4 rounded-xl text-white text-sm font-black uppercase focus:border-blue-500 outline-none transition-all" /></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2"><label className="text-[8px] font-black text-gray-500 uppercase tracking-widest ml-1">Amount (INR)</label><input type="number" required value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })} className="w-full bg-black/40 border border-white/10 p-4 rounded-xl text-white text-sm font-black focus:border-blue-500 outline-none transition-all" /></div>
                    <div className="space-y-2"><label className="text-[8px] font-black text-gray-500 uppercase tracking-widest ml-1">Sector</label><input type="text" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="w-full bg-black/40 border border-white/10 p-4 rounded-xl text-white text-sm font-black uppercase focus:border-blue-500 outline-none transition-all" /></div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[8px] font-black text-gray-500 uppercase tracking-widest ml-1">Financial_Cycle (Manual_Input_Enabled)</label>
                    <input
                      type="text"
                      list="fy-list"
                      value={form.fy}
                      onChange={e => setForm({ ...form, fy: e.target.value })}
                      className="w-full bg-black/40 border border-white/10 p-4 rounded-xl text-white text-sm font-black focus:border-blue-500 outline-none transition-all uppercase"
                      placeholder="e.g. 2025-2026"
                    />
                    <datalist id="fy-list">
                      {fyOptions.map(fy => <option key={fy} value={fy} />)}
                    </datalist>
                  </div>
                  <div className="flex gap-4 pt-4">
                    <button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-xl font-black uppercase text-[10px] tracking-widest transition-all shadow-xl shadow-blue-900/40">Commit Node</button>
                    <button type="button" onClick={resetForm} className="flex-1 bg-white/5 hover:bg-white/10 text-white py-4 rounded-xl font-black uppercase text-[10px] tracking-widest transition-all">Abort</button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        <div className="bg-[#0f172a]/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] shadow-xl overflow-hidden">
          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-white/[0.02] text-[10px] font-black text-gray-500 uppercase tracking-widest border-b border-white/5">
                  <th className="py-6 px-10">Timestamp</th>
                  <th className="py-6 px-10">Description</th>
                  <th className="py-6 px-10">Sector</th>
                  <th className="py-6 px-10">Phase</th>
                  <th className="py-6 px-10 text-right">Value (INR)</th>
                  <th className="py-6 px-10 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredData.length > 0 ? filteredData.map(item => (
                  <tr key={item.id} className="group/row transition-all hover:bg-white/[0.01]">
                    <td className="py-8 px-10 text-[10px] font-black text-gray-500 font-mono italic">{item.date}</td>
                    <td className="py-8 px-10 text-white font-black text-xs uppercase tracking-tight group-hover/row:text-blue-500 transition-colors">{item.desc}</td>
                    <td className="py-8 px-10"><span className="px-3 py-1 bg-white/5 rounded-lg text-[8px] font-black uppercase tracking-widest text-gray-500">{item.category}</span></td>
                    <td className="py-8 px-10"><span className={`px-4 py-1.5 rounded-xl text-[8px] font-black uppercase tracking-[0.2em] border ${item.type === 'Income' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-red-500/10 text-red-500 border-red-500/20'}`}>{item.type}</span></td>
                    <td className={`py-8 px-10 text-right font-black tracking-tight ${item.type === 'Income' ? 'text-white' : 'text-red-400'}`}>₹{Number(item.amount).toLocaleString()}</td>
                    <td className="py-8 px-10 text-right">
                      <div className="flex gap-2 justify-end opacity-0 group-hover/row:opacity-100 transition-all">
                        <button onClick={() => handleEdit(item)} className="p-3 bg-white/5 hover:bg-blue-600 rounded-xl text-gray-500 hover:text-white transition-all"><FaEdit size={12} /></button>
                        <button onClick={() => handleDelete(item.id)} className="p-3 bg-white/5 hover:bg-red-600 rounded-xl text-gray-500 hover:text-white transition-all"><FaTrash size={12} /></button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="6" className="py-32 text-center text-gray-700 font-black uppercase tracking-[0.5em] text-[10px]">No active ledger data detected</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountingManager;
