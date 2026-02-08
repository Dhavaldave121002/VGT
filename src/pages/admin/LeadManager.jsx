import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEnvelope, FaClock, FaCommentDots, FaUserCheck, FaTrash, FaCheckDouble, FaDatabase, FaFilter, FaExclamationTriangle } from 'react-icons/fa';
import ConfirmModal from '../../components/Admin/ConfirmModal';
import { api } from '../../utils/api';

const LeadManager = () => {
  const [leads, setLeads] = useState([]);
  const [filter, setFilter] = useState('All');
  const [confirmModal, setConfirmModal] = useState({ show: false, title: '', message: '', onConfirm: null, type: 'danger' });

  const showConfirm = (title, message, onConfirm, type = 'danger') => {
    setConfirmModal({ show: true, title, message, onConfirm, type });
  };

  // Load leads from API
  React.useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    const data = await api.fetchAll('leads');
    setLeads(data);
  };

  const handleDelete = async (id) => {
    showConfirm(
      'PURGE LEAD NODE?',
      'Warning: This action will permanently erase the lead transmission from the logs.',
      async () => {
        await api.delete('leads', id);
        fetchLeads();
      }
    );
  };

  const toggleStatus = async (id) => {
    const lead = leads.find(l => l.id === id);
    if (lead) {
      const statuses = ['New', 'In Review', 'Resolved'];
      const nextIdx = (statuses.indexOf(lead.status) + 1) % statuses.length;
      const updatedLead = { ...lead, status: statuses[nextIdx] };
      await api.save('leads', updatedLead);
      fetchLeads();
    }
  };

  const filteredLeads = leads.filter(l => filter === 'All' || l.status === filter);

  return (
    <div className="p-6 md:p-10 min-h-screen bg-[#020617] font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black text-white uppercase tracking-tighter mb-2">Lead <span className="text-blue-500">Node</span></h1>
            <p className="text-gray-500 font-medium uppercase tracking-[0.3em] text-[10px]">Global Inquiry Flow Controller</p>
          </div>
          <div className="px-6 py-3 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-center gap-3 shadow-xl shadow-blue-900/10">
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
            <span className="text-[10px] font-black uppercase text-blue-500 tracking-widest">{leads.filter(l => l.status === 'New').length} New_Streams</span>
          </div>
        </header>

        <div className="bg-[#0f172a]/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] shadow-xl overflow-hidden">
          <div className="p-8 border-b border-white/5 bg-white/[0.01] flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <FaFilter className="text-gray-700" />
              <div className="flex gap-2">
                {['All', 'New', 'In Review', 'Resolved'].map(s => (
                  <button key={s} onClick={() => setFilter(s)} className={`px-6 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${filter === s ? 'bg-blue-600 text-white shadow-xl shadow-blue-900/20' : 'bg-white/5 text-gray-500 hover:text-white'}`}>{s}</button>
                ))}
              </div>
            </div>
          </div>

          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-white/[0.02] text-[10px] font-black text-gray-500 uppercase tracking-widest border-b border-white/5">
                  <th className="py-6 px-10">Origin Authority</th>
                  <th className="py-6 px-10">Target Sector</th>
                  <th className="py-6 px-10">Protocol_State</th>
                  <th className="py-6 px-10">Priority</th>
                  <th className="py-6 px-10 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <AnimatePresence mode='popLayout'>
                  {filteredLeads.map((lead) => (
                    <motion.tr layout key={lead.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="group/row transition-all hover:bg-white/[0.01]">
                      <td className="py-8 px-10">
                        <div className="flex items-center gap-5">
                          <div className="w-12 h-12 rounded-2xl bg-[#0f172a] flex items-center justify-center text-blue-500 border border-white/5 shadow-xl group-hover/row:scale-110 transition-transform"><FaEnvelope size={16} /></div>
                          <div>
                            <p className="text-sm font-black text-white group-hover/row:text-blue-500 transition-colors uppercase tracking-tight">{lead.name}</p>
                            <p className="text-[9px] font-bold text-gray-600 mt-1 uppercase tracking-widest">{lead.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-8 px-10">
                        <span className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black text-gray-400 uppercase tracking-widest block w-fit mb-1">{lead.service}</span>
                        {lead.plan && lead.plan !== 'N/A' && <p className="text-[9px] font-black text-blue-500 uppercase tracking-tighter ml-1">Plan: {lead.plan}</p>}
                      </td>
                      <td className="py-8 px-10">
                        <button onClick={() => toggleStatus(lead.id)} className={`px-5 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all ${lead.status === 'New' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' : lead.status === 'In Review' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' : 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'}`}>
                          <div className="flex items-center gap-3"><div className={`w-1.5 h-1.5 rounded-full ${lead.status === 'New' ? 'bg-blue-500 animate-pulse' : lead.status === 'In Review' ? 'bg-amber-500' : 'bg-emerald-500'}`} /> {lead.status}</div>
                        </button>
                      </td>
                      <td className="py-8 px-10">
                        <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${lead.priority === 'High' ? 'bg-red-500 shadow-[0_0_10px_#ef4444]' : lead.priority === 'Medium' ? 'bg-amber-500 shadow-[0_0_10px_#f59e0b]' : 'bg-blue-500 shadow-[0_0_10px_#3b82f6]'}`}></div>
                          <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">{lead.priority}</span>
                        </div>
                      </td>
                      <td className="py-8 px-10 text-right">
                        <div className="flex justify-end gap-2 opacity-0 group-hover/row:opacity-100 transition-all translate-x-4 group-hover/row:translate-x-0">
                          <button onClick={() => alert(`Synchronizing with ${lead.email}...`)} className="p-3 bg-white/5 hover:bg-blue-600 rounded-xl text-gray-500 hover:text-white transition-all"><FaCommentDots size={14} /></button>
                          <button onClick={() => handleDelete(lead.id)} className="p-3 bg-white/5 hover:bg-red-600 rounded-xl text-gray-500 hover:text-white transition-all"><FaTrash size={14} /></button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {filteredLeads.length === 0 && (
            <div className="py-32 text-center text-gray-700 font-black uppercase tracking-[0.5em] text-[10px]"><FaDatabase className="mx-auto text-4xl mb-6 opacity-20" /> No active lead nodes detected</div>
          )}

          <div className="p-10 border-t border-white/5 bg-white/[0.01] text-center">
            <button onClick={async () => {
              for (const lead of leads) {
                if (lead.status !== 'Resolved') {
                  await api.save('leads', { ...lead, status: 'Resolved' });
                }
              }
              fetchLeads();
            }} className="text-[10px] font-black uppercase text-gray-600 hover:text-blue-500 transition-all tracking-[0.4em] flex items-center justify-center gap-4 mx-auto group">
              <FaCheckDouble className="group-hover:scale-125 transition-transform duration-500" /> SYNC AND RESOLVE ALL NODES
            </button>
          </div>
        </div>
      </div>

      <ConfirmModal
        show={confirmModal.show}
        title={confirmModal.title}
        message={confirmModal.message}
        type={confirmModal.type}
        onConfirm={confirmModal.onConfirm}
        onCancel={() => setConfirmModal({ ...confirmModal, show: false })}
      />
    </div>
  );
};

export default LeadManager;
