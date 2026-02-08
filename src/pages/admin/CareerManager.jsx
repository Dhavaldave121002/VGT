import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBriefcase, FaPlus, FaSearch, FaEye, FaEdit, FaTrash, FaCheckCircle, FaClock, FaTimesCircle, FaUserTie, FaChevronRight } from 'react-icons/fa';
import { api } from '../../utils/api';
import { SessionManager } from '../../utils/SessionManager';

const CareerManager = () => {
  const [activeTab, setActiveTab] = useState('jobs');
  const [isAdding, setIsAdding] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const [jobs, setJobs] = useState([]);

  // Mock applicants for now as per current scope focus on Jobs persistence
  const [applicants, setApplicants] = useState([]);

  const [newJob, setNewJob] = useState({ title: '', department: 'Engineering', type: 'Full-time', status: 'Active' });

  useEffect(() => {
    // 1. Role-Based Access Guard
    if (SessionManager.requireAuth(null, false)) {
      fetchData();
    }
  }, []);

  const fetchData = async () => {
    const jobsData = await api.fetchAll('careers');
    setJobs(jobsData);

    const applicantsData = await api.fetchAll('applications');
    setApplicants(applicantsData);
  };

  const handleAddJob = async (e) => {
    e.preventDefault();
    const payload = { ...newJob };
    const response = await api.save('careers', payload);

    if (response.success) {
      fetchData();
      setNewJob({ title: '', department: 'Engineering', type: 'Full-time', status: 'Active' });
      setIsAdding(false);
    } else {
      alert("Error creating position node");
    }
  };

  const handleDeleteJob = async (id) => {
    if (window.confirm('Protocol: TERMINATE POSITION NODE?')) {
      await api.delete('careers', id);
      fetchData();
    }
  };

  const handleDeleteApplicant = async (id) => {
    if (window.confirm('Protocol: REMOVE CANDIDATE RECORD?')) {
      await api.delete('applications', id);
      fetchData();
    }
  };

  const toggleApplicantStatus = async (id) => {
    const statuses = ['Reviewing', 'Interview', 'Hired', 'Rejected'];
    const applicant = applicants.find(a => a.id === id);
    if (!applicant) return;

    const currentIndex = statuses.indexOf(applicant.status);
    const nextIndex = (currentIndex + 1) % statuses.length;

    const updated = { ...applicant, status: statuses[nextIndex] };
    await api.save('applications', updated);
    fetchData();
  };

  const filteredItems = (activeTab === 'jobs' ? jobs : applicants).filter(item => {
    const searchStr = activeTab === 'jobs' ? item.title : item.name;
    return searchStr.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="p-6 md:p-10 min-h-screen bg-[#020617] font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black text-white uppercase tracking-tighter mb-2">Talent <span className="text-blue-500">Pipeline</span></h1>
            <p className="text-gray-500 font-medium uppercase tracking-[0.3em] text-[10px]">Global Human Capital Flow Controller</p>
          </div>
          {!isAdding && activeTab === 'jobs' && (
            <button onClick={() => setIsAdding(true)} className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-black rounded-2xl transition-all shadow-xl shadow-blue-900/30 flex items-center justify-center gap-3 uppercase tracking-[0.2em] active:scale-95"><FaPlus /> Provision New Node</button>
          )}
        </header>

        <div className="flex gap-4 border-b border-white/5 pb-6 mb-12 overflow-x-auto no-scrollbar">
          {['jobs', 'applicants'].map((tab) => (
            <button key={tab} onClick={() => { setActiveTab(tab); setIsAdding(false); }} className={`px-10 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all relative ${activeTab === tab ? 'text-blue-500 bg-blue-500/10' : 'text-gray-500 hover:text-white'}`}>
              {tab === 'jobs' ? 'Active Sectors' : 'Identified Candidates'}
              {activeTab === tab && <motion.div layoutId="career-tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.6)]" />}
            </button>
          ))}
        </div>

        <AnimatePresence>
          {isAdding && (
            <motion.div initial={{ opacity: 0, scale: 0.95, height: 0 }} animate={{ opacity: 1, scale: 1, height: 'auto' }} exit={{ opacity: 0, scale: 0.95, height: 0 }} className="overflow-hidden mb-12">
              <div className="bg-[#0f172a]/40 backdrop-blur-xl border border-blue-500/20 p-10 rounded-[2.5rem] shadow-xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500"></div>
                <h3 className="text-xl font-black text-white uppercase tracking-tight mb-8">Initialize Position Node</h3>
                <form onSubmit={handleAddJob} className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
                  <div className="space-y-2"><label className="text-[8px] font-black text-gray-500 uppercase tracking-widest ml-1">Identity Title</label><input type="text" required value={newJob.title} onChange={e => setNewJob({ ...newJob, title: e.target.value })} className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white text-[10px] font-black uppercase tracking-widest focus:border-blue-500 outline-none transition-all" placeholder="e.g. Lead Developer" /></div>
                  <div className="space-y-2"><label className="text-[8px] font-black text-gray-500 uppercase tracking-widest ml-1">Department Sector</label><select value={newJob.department} onChange={e => setNewJob({ ...newJob, department: e.target.value })} className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white text-[10px] font-black uppercase focus:border-blue-500 outline-none transition-all"><option value="Engineering">Engineering</option><option value="Design">Design</option><option value="Growth">Growth</option></select></div>
                  <div className="space-y-2"><label className="text-[8px] font-black text-gray-500 uppercase tracking-widest ml-1">Deployment Type</label><select value={newJob.type} onChange={e => setNewJob({ ...newJob, type: e.target.value })} className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white text-[10px] font-black uppercase focus:border-blue-500 outline-none transition-all"><option value="Full-time">Full-time</option><option value="Remote">Remote</option><option value="Contract">Contract</option></select></div>
                  <div className="flex gap-3"><button type="submit" className="flex-1 py-4 bg-blue-600 text-white text-[10px] font-black rounded-xl hover:bg-blue-500 transition-all uppercase tracking-widest shadow-xl shadow-blue-900/40">Initialize</button><button type="button" onClick={() => setIsAdding(false)} className="px-8 py-4 bg-white/5 text-gray-500 text-[10px] font-black rounded-xl hover:bg-white/10 transition-all uppercase tracking-widest">Abort</button></div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="bg-[#0f172a]/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] shadow-xl overflow-hidden mb-12">
          <div className="p-8 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white/[0.01]">
            <div className="flex items-center gap-4 px-6 py-4 bg-black/40 border border-white/10 rounded-2xl w-full md:w-96 group focus-within:border-blue-500 transition-all">
              <FaSearch className="text-gray-700 group-focus-within:text-blue-500 transition-colors" />
              <input type="text" placeholder={`PROTOCOL: SEARCH ${activeTab.toUpperCase()}...`} value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="bg-transparent border-none text-[10px] text-white focus:outline-none w-full uppercase tracking-[0.2em] font-black placeholder-gray-700" />
            </div>
            <div className="flex items-center gap-3 px-6 py-3 bg-blue-500/10 border border-blue-500/20 rounded-2xl shadow-xl shadow-blue-900/10"><div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div><span className="text-[10px] font-black uppercase text-blue-500 tracking-widest">System_Live: Active_Scan</span></div>
          </div>

          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-white/[0.02] text-[10px] font-black text-gray-500 uppercase tracking-widest border-b border-white/5">
                  <th className="py-6 px-10">{activeTab === 'jobs' ? 'Position Protocol' : 'Candidate Identity'}</th>
                  <th className="py-6 px-10">{activeTab === 'jobs' ? 'Deployment' : 'Assigned Node'}</th>
                  <th className="py-6 px-10">{activeTab === 'jobs' ? 'Capacity' : 'Probability'}</th>
                  <th className="py-6 px-10">Status</th>
                  <th className="py-6 px-10 text-right">Protocol</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <AnimatePresence mode='popLayout'>
                  {filteredItems.map((item, i) => (
                    <motion.tr layout initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={{ delay: i * 0.05 }} key={item.id} className="group/row transition-all hover:bg-white/[0.02]">
                      <td className="py-8 px-10">
                        <div className="flex items-center gap-5">
                          <div className="w-12 h-12 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-500 border border-blue-500/10 group-hover/row:bg-blue-600/20 transition-all shadow-lg">{activeTab === 'jobs' ? <FaBriefcase size={16} /> : <FaUserTie size={16} />}</div>
                          <div className="flex flex-col"><span className="text-white font-black text-sm uppercase tracking-tight group-hover/row:text-blue-500 transition-colors">{activeTab === 'jobs' ? item.title : item.name}</span>{activeTab === 'applicants' && <span className="text-[9px] text-gray-600 font-bold uppercase tracking-widest mt-1">{item.date}</span>}</div>
                        </div>
                      </td>
                      <td className="py-8 px-10"><span className="text-[10px] text-gray-400 font-black uppercase tracking-widest border border-white/5 px-4 py-1.5 rounded-xl bg-white/5">{activeTab === 'jobs' ? item.department : item.role}</span></td>
                      <td className="py-8 px-10">
                        <div className="flex flex-col gap-2">
                          <span className="text-[10px] text-white font-black tracking-widest">{activeTab === 'jobs' ? `${item.applicants || 0} NODES` : item.score}</span>
                          <div className="w-24 h-1 bg-white/5 rounded-full overflow-hidden"><motion.div initial={{ width: 0 }} animate={{ width: activeTab === 'jobs' ? `${Math.min((item.applicants || 0) * 4, 100)}%` : item.score }} className="h-full bg-blue-500" /></div>
                        </div>
                      </td>
                      <td className="py-8 px-10">
                        <button onClick={() => activeTab === 'applicants' && toggleApplicantStatus(item.id)} className={`px-5 py-2 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] border transition-all ${item.status === 'Active' || item.status === 'Hired' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : item.status === 'Closed' || item.status === 'Rejected' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-blue-500/10 text-blue-400 border-blue-500/20'} ${activeTab === 'applicants' ? 'cursor-pointer hover:scale-105 active:scale-95' : 'cursor-default'}`}>
                          {item.status}
                        </button>
                      </td>
                      <td className="py-8 px-10 text-right">
                        <div className="flex justify-end gap-2 opacity-0 group-hover/row:opacity-100 transition-all translate-x-4 group-hover/row:translate-x-0">
                          <button className="p-3 bg-white/5 hover:bg-blue-600 rounded-xl text-gray-500 hover:text-white transition-all"><FaEye size={12} /></button>
                          <button onClick={() => activeTab === 'jobs' ? handleDeleteJob(item.id) : handleDeleteApplicant(item.id)} className="p-3 bg-white/5 hover:bg-red-600 rounded-xl text-gray-500 hover:text-white transition-all"><FaTrash size={12} /></button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
          {filteredItems.length === 0 && <div className="py-32 text-center text-gray-700 font-black uppercase tracking-[0.5em] text-[10px]">No active talent nodes detected</div>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { label: 'Active Seekers', val: applicants.length, icon: <FaUserTie />, color: 'blue' },
            { label: 'Open Sectors', val: jobs.filter(j => j.status === 'Active').length, icon: <FaCheckCircle />, color: 'emerald' },
            { label: 'Conversion_Rate', val: '4.2%', icon: <FaChevronRight />, color: 'purple' }
          ].map((stat, i) => (
            <div key={i} className={`bg-[#0f172a]/40 backdrop-blur-xl border border-white/5 p-8 rounded-[2.5rem] shadow-xl flex items-center gap-6`}>
              <div className={`w-14 h-14 rounded-2xl bg-${stat.color}-500/10 flex items-center justify-center text-${stat.color}-500 border border-${stat.color}-500/20 shadow-lg`}><stat.icon.type size={20} /></div>
              <div><p className="text-[9px] text-gray-500 font-black uppercase tracking-[0.3em] mb-1">{stat.label}</p><h4 className="text-2xl font-black text-white tracking-tighter">{stat.val}</h4></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CareerManager;
