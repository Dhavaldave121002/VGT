import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEnvelope, FaPhone, FaUser, FaClock, FaTrash, FaEye, FaCalendarAlt, FaCheck, FaTimes, FaFilter, FaSearch, FaExclamationTriangle } from 'react-icons/fa';
import ConfirmModal from '../../components/Admin/ConfirmModal';
import { api } from '../../utils/api';

const ContactManager = () => {
  const [contacts, setContacts] = useState([]);
  const [meetings, setMeetings] = useState([]);
  const [activeTab, setActiveTab] = useState('contacts'); // 'contacts' or 'meetings'
  const [selectedItem, setSelectedItem] = useState(null);
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [confirmModal, setConfirmModal] = useState({ show: false, title: '', message: '', onConfirm: null, type: 'danger' });

  const showConfirm = (title, message, onConfirm, type = 'danger') => {
    setConfirmModal({ show: true, title, message, onConfirm, type });
  };

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const contactsData = await api.fetchAll('contacts');
    setContacts(contactsData);

    const meetingsData = await api.fetchAll('meetings');
    setMeetings(meetingsData);
  };

  const handleDelete = (id, type) => {
    showConfirm(
      `PURGE ${type.toUpperCase()} RECORD?`,
      `This will permanently remove this ${type} from the database.`,
      async () => {
        if (type === 'contact') {
          await api.delete('contacts', id);
        } else {
          await api.delete('meetings', id);
        }
        loadData();
        if (selectedItem?.id === id) setSelectedItem(null);
      }
    );
  };

  const updateStatus = async (id, newStatus, type) => {
    const table = type === 'contact' ? 'contacts' : 'meetings';
    const items = type === 'contact' ? contacts : meetings;
    const item = items.find(i => i.id === id);
    if (item) {
      // Create update object
      const updateData = { ...item, status: newStatus };
      // Cleanse data for update (remove created_at if API doesn't handle read-only well, but our API ignores non-column fields or handles them if valid)
      // Usually good to just send partial update if API supports it, or full object.
      // My generic API supports PUT with full fields (excluding ID in SET clause).
      await api.save(table, updateData);
      loadData();
    }
  };

  const formatDate = (isoString) => {
    if (!isoString) return 'N/A';
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) +
      ' AT ' + date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const currentData = activeTab === 'contacts' ? contacts : meetings;
  const filteredData = currentData.filter(item => {
    const matchesStatus = filterStatus === 'All' || item.status === filterStatus;
    const matchesSearch = (item.name || "").toLowerCase().includes(searchTerm.toLowerCase()) || (item.email || "").toLowerCase().includes(searchTerm.toLowerCase()) || (item.service || "").toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const statuses = ['All', 'New', 'Contacted', 'Scheduled', 'Completed', 'Cancelled'];
  const statusColors = {
    'New': 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    'Contacted': 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
    'Scheduled': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    'Completed': 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
    'Cancelled': 'bg-red-500/10 text-red-400 border-red-500/20'
  };

  return (
    <div className="p-6 md:p-10 min-h-screen bg-[#020617] font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black text-white uppercase tracking-tighter mb-2">Comms <span className="text-blue-500">Node</span></h1>
            <p className="text-gray-500 font-medium uppercase tracking-[0.3em] text-[10px]">Interaction & Session Governance</p>
          </div>
          <div className="flex gap-4">
            <div className={`px-6 py-3 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-center gap-2 shadow-xl ${activeTab !== 'contacts' && 'opacity-50'}`}>
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></div>
              <span className="text-blue-500 font-black text-[10px] uppercase tracking-widest">{contacts.length} Active_Inquiries</span>
            </div>
            <div className={`px-6 py-3 bg-purple-500/10 border border-purple-500/20 rounded-2xl flex items-center gap-2 shadow-xl ${activeTab !== 'meetings' && 'opacity-50'}`}>
              <div className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse"></div>
              <span className="text-purple-500 font-black text-[10px] uppercase tracking-widest">{meetings.length} Scheduled_Links</span>
            </div>
          </div>
        </header>

        <div className="flex gap-4 mb-12 border-b border-white/5 pb-6 overflow-x-auto no-scrollbar">
          <button onClick={() => setActiveTab('contacts')} className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-3 shadow-lg active:scale-95 ${activeTab === 'contacts' ? 'bg-blue-600 text-white shadow-blue-900/40' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}><FaEnvelope /> Transmission Log</button>
          <button onClick={() => setActiveTab('meetings')} className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-3 shadow-lg active:scale-95 ${activeTab === 'meetings' ? 'bg-purple-600 text-white shadow-purple-900/40' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}><FaCalendarAlt /> Meeting Grid</button>
        </div>

        <div className="bg-[#0f172a]/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] shadow-xl overflow-hidden mb-8">
          <div className="p-8 border-b border-white/5 flex flex-col md:flex-row gap-6 items-center">
            <div className="flex-1 relative w-full">
              <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500" />
              <input type="text" placeholder="Protocol: SEARCH IDENTITY OR SERVICE..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-2xl pl-14 pr-6 py-4 text-white text-[10px] font-black uppercase tracking-widest placeholder-gray-700 focus:outline-none focus:border-blue-500 transition-all" />
            </div>
            <div className="flex gap-2 flex-wrap justify-center">
              {statuses.map(status => (
                <button key={status} onClick={() => setFilterStatus(status)} className={`px-5 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${filterStatus === status ? 'bg-blue-600 text-white shadow-lg' : 'bg-white/5 text-gray-500 hover:text-white'}`}>{status}</button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full">
              <thead>
                <tr className="text-[10px] font-black text-gray-500 uppercase tracking-widest text-left border-b border-white/5 bg-white/[0.01]">
                  <th className="py-6 px-10">Timestamp</th>
                  <th className="py-6 px-10">Identity</th>
                  <th className="py-6 px-10">Comm_Link</th>
                  <th className="py-6 px-10">Sector</th>
                  {activeTab === 'meetings' && <th className="py-6 px-10">Sync_Clock</th>}
                  <th className="py-6 px-10">Protocol_Status</th>
                  <th className="py-6 px-10 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredData.map((item, idx) => (
                  <tr key={item.id} className="group/row transition-all hover:bg-white/[0.02]">
                    <td className="py-8 px-10 text-[10px] font-black text-gray-500 uppercase tracking-tight">{formatDate(item.submittedAt || item.created_at || item.submittedAt)}</td>
                    <td className="py-8 px-10">
                      <div className="space-y-1">
                        <span className="text-white font-black text-sm uppercase tracking-tight group-hover:text-blue-400 transition-colors block">{item.name}</span>
                        <span className="text-gray-500 text-[10px] font-black uppercase tracking-widest">{item.subject || 'N/A'}</span>
                      </div>
                    </td>
                    <td className="py-8 px-10">
                      <div className="space-y-1">
                        <div className="text-gray-300 text-xs font-medium">{item.email}</div>
                        {item.phone && <div className="text-gray-500 text-[10px] font-black uppercase">{item.phone}</div>}
                      </div>
                    </td>
                    <td className="py-8 px-10"><span className="text-blue-500 font-black text-[10px] uppercase tracking-widest px-3 py-1 bg-blue-500/10 rounded-lg">{item.service || 'N/A'}</span></td>
                    {activeTab === 'meetings' && (
                      <td className="py-8 px-10"><span className="text-emerald-500 font-black text-[10px] uppercase tracking-widest flex items-center gap-2"><FaClock /> {item.date} @ {item.time}</span></td>
                    )}
                    <td className="py-8 px-10">
                      <select value={item.status || 'New'} onChange={(e) => updateStatus(item.id, e.target.value, activeTab === 'contacts' ? 'contact' : 'meeting')} className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border ${statusColors[item.status] || 'bg-white/5'} bg-transparent cursor-pointer focus:outline-none`}>
                        {statuses.filter(s => s !== 'All').map(status => <option key={status} value={status} className="bg-gray-900">{status}</option>)}
                      </select>
                    </td>
                    <td className="py-8 px-10 text-right">
                      <div className="flex gap-2 justify-end">
                        <button onClick={() => setSelectedItem(item)} className="p-3 text-white/20 hover:text-blue-500 transition-all"><FaEye size={14} /></button>
                        <button onClick={() => handleDelete(item.id, activeTab === 'contacts' ? 'contact' : 'meeting')} className="p-3 text-white/20 hover:text-red-500 transition-all"><FaTrash size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredData.length === 0 && <div className="p-32 text-center text-gray-700 font-black uppercase tracking-[0.5em] text-[10px]">No active data streams detected</div>}
        </div>

        <AnimatePresence>
          {selectedItem && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedItem(null)} className="absolute inset-0 bg-black/90 backdrop-blur-md" />
              <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="relative bg-[#0f172a] border border-white/10 rounded-[2.5rem] p-10 max-w-2xl w-full shadow-3xl overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500"></div>
                <button onClick={() => setSelectedItem(null)} className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors"><FaTimes size={20} /></button>
                <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-10">{activeTab === 'contacts' ? 'Data Transmission' : 'Scheduled Sync'}</h3>
                <div className="space-y-8">
                  <div className="grid grid-cols-2 gap-8">
                    <div><label className="text-[8px] font-black text-gray-500 uppercase tracking-widest block mb-1">Subject_Node</label><p className="text-white font-black text-lg uppercase tracking-tight">{selectedItem.name}</p></div>
                    <div><label className="text-[8px] font-black text-gray-500 uppercase tracking-widest block mb-1">Sector_Origin</label><p className="text-blue-500 font-black text-lg uppercase tracking-tight">{selectedItem.service || 'General'}</p></div>
                  </div>
                  <div><label className="text-[8px] font-black text-gray-500 uppercase tracking-widest block mb-1">Inquiry_Topic</label><p className="text-purple-400 font-black text-md uppercase tracking-tight">{selectedItem.subject || 'N/A'}</p></div>
                  <div className="grid grid-cols-2 gap-8">
                    <div><label className="text-[8px] font-black text-gray-500 uppercase tracking-widest block mb-1">Comm_Address</label><p className="text-gray-300 font-medium text-sm">{selectedItem.email}</p></div>
                    <div><label className="text-[8px] font-black text-gray-500 uppercase tracking-widest block mb-1">Secure_Line</label><p className="text-gray-300 font-medium text-sm">{selectedItem.phone || 'N/A'}</p></div>
                  </div>
                  {activeTab === 'meetings' && (
                    <div className="p-6 bg-purple-500/10 border border-purple-500/20 rounded-2xl"><label className="text-[8px] font-black text-purple-400 uppercase tracking-widest block mb-2">Sync_Schedule</label><p className="text-white font-black text-xl uppercase tracking-tighter">{selectedItem.date} @ {selectedItem.time}</p></div>
                  )}
                  <div><label className="text-[8px] font-black text-gray-500 uppercase tracking-widest block mb-2">Payload_Content</label><p className="text-gray-400 text-sm leading-relaxed p-6 bg-black/40 border border-white/5 rounded-2xl italic">"{selectedItem.message}"</p></div>
                  <div className="flex justify-between items-center pt-6 border-t border-white/5"><span className="text-[9px] font-black text-gray-600 uppercase tracking-widest">Protocol_Logged: {formatDate(selectedItem.created_at || selectedItem.submittedAt)}</span><button onClick={() => setSelectedItem(null)} className="px-8 py-3 bg-white/5 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10">Dismiss</button></div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        <ConfirmModal
          show={confirmModal.show}
          title={confirmModal.title}
          message={confirmModal.message}
          type={confirmModal.type}
          onConfirm={confirmModal.onConfirm}
          onCancel={() => setConfirmModal({ ...confirmModal, show: false })}
        />
      </div>
    </div>
  );
};

export default ContactManager;
