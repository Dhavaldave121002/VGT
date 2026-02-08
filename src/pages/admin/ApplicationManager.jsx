import React, { useState, useEffect } from 'react';
import { api } from '../../utils/api';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEnvelope, FaPhone, FaUser, FaBriefcase, FaClock, FaTrash, FaEye, FaCheckCircle, FaTimesCircle, FaSearch, FaFilter, FaFileDownload, FaFilePdf, FaPlus, FaTimes } from 'react-icons/fa';

const ApplicationManager = () => {
  const [applications, setApplications] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [newApp, setNewApp] = useState({ name: '', email: '', phone: '', jobTitle: '', status: 'New', message: '' });

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    const data = await api.fetchAll('applications');
    setApplications(data);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const app = {
      ...newApp,
      submittedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
    };
    await api.save('applications', app);
    loadApplications();
    setIsAdding(false);
    setNewApp({ name: '', email: '', phone: '', jobTitle: '', status: 'New', message: '' });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      await api.delete('applications', id);
      loadApplications();
      if (selectedApp?.id === id) setSelectedApp(null);
    }
  };

  const updateStatus = async (id, newStatus) => {
    const app = applications.find(a => a.id === id);
    if (app) {
      const updatedApp = { ...app, status: newStatus };
      await api.save('applications', updatedApp);
      loadApplications();
      if (selectedApp?.id === id) {
        setSelectedApp({ ...selectedApp, status: newStatus });
      }
    }
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) +
      ' at ' + date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const downloadResume = (base64Data, fileName) => {
    const link = document.createElement('a');
    link.href = base64Data;
    link.download = fileName || 'resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredApplications = applications.filter(app => {
    const matchesStatus = filterStatus === 'All' || app.status === filterStatus;
    const matchesSearch =
      app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const statuses = ['All', 'New', 'Reviewing', 'Interview', 'Hired', 'Rejected'];
  const statusColors = {
    'New': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    'Reviewing': 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    'Interview': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    'Hired': 'bg-green-500/10 text-green-400 border-green-500/20',
    'Rejected': 'bg-red-500/10 text-red-400 border-red-500/20'
  };

  return (
    <div className="p-6 md:p-10 min-h-screen bg-[#020617] font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black text-white uppercase tracking-tighter mb-2">Job Applications</h1>
            <p className="text-gray-500 font-medium uppercase tracking-[0.3em] text-[10px]">Candidate Pipeline Management</p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsAdding(true)}
              className="px-6 py-3 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-blue-500 transition-all flex items-center gap-2 shadow-lg shadow-blue-900/20"
            >
              <FaPlus /> Manual Entry
            </button>
            <div className="px-6 py-3 bg-blue-600/10 border border-blue-500/20 rounded-2xl">
              <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest mr-2">Total:</span>
              <span className="text-xl font-black text-white">{applications.length}</span>
            </div>
          </div>
        </header>

        {/* Filters */}
        <div className="mb-8 p-4 bg-[#0f172a]/60 backdrop-blur-xl border border-white/10 rounded-2xl">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {statuses.map(status => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${filterStatus === status
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                >
                  {status}
                </button>
              ))}
            </div>
            <div className="relative w-full lg:w-72">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Search applications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white text-sm focus:outline-none focus:border-blue-500/50 transition-all placeholder:text-gray-600"
              />
            </div>
          </div>
        </div>

        {/* Applications Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredApplications.map((app) => (
              <motion.div
                key={app.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group relative bg-[#0f172a]/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 hover:border-blue-500/30 transition-all duration-500 shadow-xl"
              >
                {/* Status Badge */}
                <div className="absolute top-4 right-4">
                  <select
                    value={app.status}
                    onChange={(e) => updateStatus(app.id, e.target.value)}
                    className={`text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg border cursor-pointer bg-transparent ${statusColors[app.status]}`}
                  >
                    {statuses.filter(s => s !== 'All').map(status => (
                      <option key={status} value={status} className="bg-[#0f172a]">{status}</option>
                    ))}
                  </select>
                </div>

                {/* Applicant Info */}
                <div className="mb-4 pr-24">
                  <h3 className="text-xl font-black text-white mb-2 group-hover:text-blue-400 transition-colors uppercase tracking-tight">
                    {app.name}
                  </h3>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                      <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest leading-none">
                        Active_Entry
                      </p>
                    </div>
                    <p className="text-[10px] text-blue-500/80 font-black uppercase tracking-widest leading-none">
                      {app.jobTitle}
                    </p>
                    {app.resumeData && (
                      <span className="px-2 py-0.5 bg-blue-500/10 text-blue-400 text-[8px] font-black rounded border border-blue-500/20 flex items-center gap-1 uppercase tracking-widest leading-none">
                        <FaFilePdf size={8} /> Resume
                      </span>
                    )}
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <FaEnvelope className="text-blue-500" />
                    <a href={`mailto:${app.email}`} className="hover:text-blue-400 transition-colors truncate">
                      {app.email}
                    </a>
                  </div>
                  {app.phone && (
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <FaPhone className="text-purple-500" />
                      <a href={`tel:${app.phone}`} className="hover:text-purple-400 transition-colors">
                        {app.phone}
                      </a>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <FaClock className="text-gray-600" />
                    <span>{formatDate(app.submittedAt)}</span>
                  </div>
                </div>

                {/* Message Preview */}
                <div className="mb-4">
                  <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                    {app.message}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-4 border-t border-white/5">
                  <button
                    onClick={() => setSelectedApp(app)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white rounded-xl transition-all text-xs font-bold uppercase tracking-widest"
                  >
                    <FaEye /> View
                  </button>
                  <button
                    onClick={() => handleDelete(app.id)}
                    className="px-4 py-2 bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white rounded-xl transition-all"
                  >
                    <FaTrash size={12} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredApplications.length === 0 && (
          <div className="text-center py-20 border border-dashed border-white/10 rounded-3xl bg-white/[0.01]">
            <FaBriefcase className="mx-auto text-6xl text-white/5 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">No applications found</h3>
            <p className="text-gray-500 text-sm">Try adjusting your filters or search term</p>
          </div>
        )}

        {/* Add Candidate Modal */}
        <AnimatePresence>
          {isAdding && (
            <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsAdding(false)}
                className="absolute inset-0 bg-black/80 backdrop-blur-md"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 30 }}
                className="relative w-full max-w-2xl bg-[#0f172a] border border-white/10 rounded-[2.5rem] shadow-3xl p-8 max-h-[90vh] overflow-y-auto"
              >
                <button
                  onClick={() => setIsAdding(false)}
                  className="absolute top-6 right-6 text-gray-500 hover:text-white"
                >
                  <FaTimes />
                </button>
                <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-6">Manual Candidate Entry</h2>

                <form onSubmit={handleAdd} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Candidate Name</label>
                      <input required className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white text-sm focus:border-blue-500 outline-none"
                        value={newApp.name} onChange={e => setNewApp({ ...newApp, name: e.target.value })} placeholder="Full Name" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Email Address</label>
                      <input required type="email" className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white text-sm focus:border-blue-500 outline-none"
                        value={newApp.email} onChange={e => setNewApp({ ...newApp, email: e.target.value })} placeholder="email@example.com" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Phone Number</label>
                      <input required type="tel" className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white text-sm focus:border-blue-500 outline-none"
                        value={newApp.phone} onChange={e => setNewApp({ ...newApp, phone: e.target.value })} placeholder="+1 234 567 8900" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Applying For</label>
                      <input required className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white text-sm focus:border-blue-500 outline-none"
                        value={newApp.jobTitle} onChange={e => setNewApp({ ...newApp, jobTitle: e.target.value })} placeholder="e.g. Frontend Developer" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Cover Message / Notes</label>
                    <textarea className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white text-sm focus:border-blue-500 outline-none h-24"
                      value={newApp.message} onChange={e => setNewApp({ ...newApp, message: e.target.value })} placeholder="Enter candidate notes or message..." />
                  </div>
                  <div className="flex gap-4">
                    <button type="submit" className="flex-1 py-3 bg-blue-600 text-white font-black text-xs uppercase tracking-[0.2em] rounded-xl hover:bg-blue-500 transition-all">Add Candidate</button>
                    <button type="button" onClick={() => setIsAdding(false)} className="px-8 py-3 bg-white/5 text-white font-black text-xs uppercase tracking-[0.2em] rounded-xl hover:bg-white/10 transition-all">Cancel</button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Detail Modal */}
        <AnimatePresence>
          {selectedApp && (
            <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedApp(null)}
                className="absolute inset-0 bg-black/80 backdrop-blur-md"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 30 }}
                className="relative w-full max-w-2xl bg-[#0f172a] border border-white/10 rounded-[2.5rem] shadow-3xl p-8 max-h-[90vh] overflow-y-auto"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500"></div>

                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-2">
                      {selectedApp.name}
                    </h2>
                    <p className="text-sm text-blue-500 font-bold uppercase tracking-widest">
                      {selectedApp.jobTitle}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedApp(null)}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
                  >
                    <FaTimesCircle size={20} />
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                      <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Email</div>
                      <a href={`mailto:${selectedApp.email}`} className="text-sm text-white hover:text-blue-400 transition-colors break-all">
                        {selectedApp.email}
                      </a>
                    </div>
                    {selectedApp.phone && (
                      <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                        <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Phone</div>
                        <a href={`tel:${selectedApp.phone}`} className="text-sm text-white hover:text-purple-400 transition-colors">
                          {selectedApp.phone}
                        </a>
                      </div>
                    )}
                  </div>

                  <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                    <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Submitted</div>
                    <div className="text-sm text-white">{formatDate(selectedApp.submittedAt)}</div>
                  </div>

                  <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                    <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-3">Cover Message</div>
                    <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap">
                      {selectedApp.message}
                    </p>
                  </div>

                  <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                    <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-3">Status</div>
                    <select
                      value={selectedApp.status}
                      onChange={(e) => updateStatus(selectedApp.id, e.target.value)}
                      className={`w-full text-sm font-bold uppercase tracking-widest px-4 py-3 rounded-xl border cursor-pointer bg-transparent ${statusColors[selectedApp.status]}`}
                    >
                      {statuses.filter(s => s !== 'All').map(status => (
                        <option key={status} value={status} className="bg-[#0f172a]">{status}</option>
                      ))}
                    </select>
                  </div>

                  {selectedApp.resumeData && (
                    <div className="p-4 bg-blue-500/5 rounded-2xl border border-blue-500/10 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-500">
                          <FaFilePdf size={20} />
                        </div>
                        <div>
                          <div className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-1">Attachment</div>
                          <div className="text-xs text-white font-bold">{selectedApp.resumeFileName || 'Resume.pdf'}</div>
                        </div>
                      </div>
                      <button
                        onClick={() => downloadResume(selectedApp.resumeData, selectedApp.resumeFileName)}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                      >
                        <FaFileDownload /> Download
                      </button>
                    </div>
                  )}

                  <div className="flex gap-3 pt-4">
                    <a
                      href={`mailto:${selectedApp.email}?subject=Re: Application for ${selectedApp.jobTitle}`}
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black uppercase tracking-widest text-xs transition-all"
                    >
                      <FaEnvelope /> Reply via Email
                    </a>
                    <button
                      onClick={() => {
                        handleDelete(selectedApp.id);
                        setSelectedApp(null);
                      }}
                      className="px-6 py-3 bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white rounded-2xl transition-all"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ApplicationManager;
