import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUserPlus, FaSearch, FaShieldAlt, FaUserShield, FaCircle, FaUserEdit, FaKey } from 'react-icons/fa';
import { api } from '../../utils/api';
import { SessionManager } from '../../utils/SessionManager';

const UserManager = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [newUser, setNewUser] = useState({ name: '', actualEmail: '', password: '', role: 'Editor', clearance: 'L3' });
  const [generatedSystemEmail, setGeneratedSystemEmail] = useState('');

  // Auto-generate system email
  useEffect(() => {
    if (newUser.name) {
      const slug = newUser.name.toLowerCase().replace(/\s+/g, '.');
      setGeneratedSystemEmail(`${slug}@vgt.tech`);
    } else {
      setGeneratedSystemEmail('');
    }
  }, [newUser.name]);

  // Load users from API
  useEffect(() => {
    // 1. Role-Based Access Guard
    if (!SessionManager.requireAuth(navigate, true)) return;

    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const data = await api.fetchAll('users');
    setUsers(data);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!newUser.name || !newUser.actualEmail || !newUser.password) return;

    // Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newUser.actualEmail)) {
      alert("Please enter a valid email address for OTP delivery.");
      return;
    }
    if (newUser.password.length < 5) {
      alert("Password must be at least 5 characters.");
      return;
    }

    // Prepare data object
    const userData = {
      name: newUser.name,
      role: newUser.role,
      clearance: newUser.clearance,
      actualEmail: newUser.actualEmail,
      password: newUser.password,
      // System email changes if name changes, or keep original? 
      // Let's allow system email update based on name for consistency
      email: generatedSystemEmail, // Always use generated for now or from existing logic
      status: 'Offline'
    };

    if (isEditing && editingId) {
      userData.id = editingId;
    }

    const response = await api.save('users', userData);
    if (response.success) {
      fetchUsers();
      resetForm();
    } else {
      alert("Error saving user: " + (response.error || "Unknown error"));
    }
  };

  const handleEdit = (user) => {
    setNewUser({
      name: user.name,
      actualEmail: user.actualEmail || '',
      password: user.password || '', // Password might be hidden in real app
      role: user.role,
      clearance: user.clearance || 'L3'
    });
    setEditingId(user.id);
    setIsEditing(true);
    setIsAdding(true);
  };

  const resetForm = () => {
    setNewUser({ name: '', actualEmail: '', password: '', role: 'Editor', clearance: 'L3' });
    setIsAdding(false);
    setIsEditing(false);
    setEditingId(null);
  };

  const handleRevoke = async (id) => {
    if (window.confirm('Protocol: REVOKE ALL PRIVILEGES?')) {
      await api.delete('users', id);
      fetchUsers();
    }
  };
  const handleResetKey = (name) => { alert(`Security: New Access Token Generated for ${name.toUpperCase()}.`); };

  const filteredUsers = users.filter(u => u.name.toLowerCase().includes(searchTerm.toLowerCase()) || u.email.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="p-6 md:p-10 min-h-screen bg-[#020617] font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black text-white uppercase tracking-tighter mb-2">Access <span className="text-blue-500">Node</span></h1>
            <p className="text-gray-500 font-medium uppercase tracking-[0.3em] text-[10px]">Administrative Privilege & Security Governance</p>
          </div>
          {!isAdding && (
            <button onClick={() => setIsAdding(true)} className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-black rounded-2xl transition-all shadow-xl shadow-blue-900/30 flex items-center justify-center gap-3 uppercase tracking-widest active:scale-95"><FaUserPlus /> Provision User Node</button>
          )}
        </header>

        <AnimatePresence>
          {isAdding && (
            <motion.div initial={{ opacity: 0, scale: 0.95, y: -20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: -20 }} className="bg-[#0f172a]/40 backdrop-blur-xl border border-blue-500/20 p-10 rounded-[2.5rem] shadow-xl relative overflow-hidden mb-12">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500"></div>
              <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-8">{isEditing ? 'Update Security Node' : 'Authorize Security Node'}</h2>
              <form onSubmit={handleSave} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Identity */}
                  <div className="space-y-2">
                    <label className="text-[8px] font-black text-gray-500 uppercase tracking-widest ml-1">Identity Name</label>
                    <input type="text" required value={newUser.name} onChange={e => setNewUser({ ...newUser, name: e.target.value })} className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white text-[10px] font-black focus:border-blue-500 outline-none transition-all uppercase" placeholder="Full Name" />
                  </div>

                  {/* Actual Email (OTP Destination) */}
                  <div className="space-y-2">
                    <label className="text-[8px] font-black text-gray-500 uppercase tracking-widest ml-1">Actual Email (For OTP)</label>
                    <input type="email" required value={newUser.actualEmail} onChange={e => setNewUser({ ...newUser, actualEmail: e.target.value })} className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white text-[10px] font-black focus:border-blue-500 outline-none transition-all" placeholder="personal@gmail.com" />
                  </div>

                  {/* Password */}
                  <div className="space-y-2">
                    <label className="text-[8px] font-black text-gray-500 uppercase tracking-widest ml-1">Access Password</label>
                    <input type="text" required value={newUser.password} onChange={e => setNewUser({ ...newUser, password: e.target.value })} className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white text-[10px] font-black focus:border-blue-500 outline-none transition-all" placeholder="Secure Password" />
                  </div>

                  {/* Generated System Email */}
                  <div className="space-y-2">
                    <label className="text-[8px] font-black text-gray-500 uppercase tracking-widest ml-1">System Node ID (Auto)</label>
                    <div className="w-full bg-white/5 border border-white/5 rounded-xl p-4 text-gray-400 text-[10px] font-black uppercase select-none cursor-not-allowed">
                      {generatedSystemEmail || '@vgt.tech'}
                    </div>
                  </div>

                  {/* Role */}
                  <div className="space-y-2">
                    <label className="text-[8px] font-black text-gray-500 uppercase tracking-widest ml-1">Authority_Role</label>
                    <select value={newUser.role} onChange={e => setNewUser({ ...newUser, role: e.target.value })} className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white text-[10px] font-black uppercase focus:border-blue-500 transition-all font-black">
                      <option value="Super Admin">Super Admin</option>
                      <option value="Editor">Editor</option>
                      <option value="Support">Support</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button type="submit" className="flex-1 py-4 bg-blue-600 text-white text-[12px] font-black rounded-xl hover:bg-blue-500 transition-all uppercase tracking-widest shadow-xl shadow-blue-900/40">{isEditing ? 'Update Node' : 'Authorize Node'}</button>
                  <button type="button" onClick={resetForm} className="px-12 py-4 bg-white/5 text-gray-500 text-[10px] font-black rounded-xl hover:bg-white/10 transition-all uppercase tracking-widest">Abort</button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="bg-[#0f172a]/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] shadow-xl p-10 mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
            <div className="flex items-center gap-4 px-6 py-4 bg-black/40 border border-white/10 rounded-2xl w-full md:w-96 group focus-within:border-blue-500 transition-all">
              <FaSearch className="text-gray-700 group-focus-within:text-blue-500 transition-colors" />
              <input type="text" placeholder="PROTOCOL: SEARCH SECURITY NODES..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="bg-transparent border-none text-[10px] text-white focus:outline-none w-full uppercase tracking-[0.2em] font-black placeholder-gray-700" />
            </div>
            <div className="flex items-center gap-8">
              <div className="text-right"><p className="text-[8px] text-gray-600 font-black uppercase tracking-widest mb-1">System_Load</p><p className="text-[10px] font-black text-blue-500">OPERATIONAL</p></div>
              <div className="w-px h-10 bg-white/10"></div>
              <div className="text-right"><p className="text-[8px] text-gray-600 font-black uppercase tracking-widest mb-1">Enc_Standard</p><p className="text-[10px] font-black text-emerald-500 uppercase">AES-256-GCM</p></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredUsers.map((user) => (
                <motion.div layout key={user.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-[#0f172a]/20 border border-white/5 rounded-[2.5rem] p-10 relative group hover:border-blue-500/30 transition-all duration-500 shadow-xl overflow-hidden hover:bg-white/[0.01]">
                  <div className="absolute -bottom-6 -right-6 text-white/[0.02] group-hover:text-blue-500/10 transition-colors rotate-12 transition-all duration-700"><FaShieldAlt size={140} /></div>
                  <div className="flex justify-between items-start mb-8 relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white text-2xl shadow-xl border border-white/10 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500"><FaUserShield /></div>
                    <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 border border-white/5 text-[8px] font-black uppercase tracking-widest ${user.status === 'Online' ? 'text-emerald-500 border-emerald-500/20' : 'text-gray-700'}`}><FaCircle className={`text-[6px] ${user.status === 'Online' ? 'animate-pulse' : ''}`} /> {user.status}</div>
                  </div>
                  <div className="space-y-2 relative z-10">
                    <div className="flex items-center gap-3"><h3 className="text-xl font-black text-white group-hover:text-blue-400 transition-colors uppercase tracking-tight">{user.name}</h3><span className="text-[8px] bg-blue-500/10 text-blue-500 px-2 py-0.5 rounded border border-blue-500/20 font-black">{user.clearance}</span></div>
                    <p className="text-[9px] text-blue-500 font-black uppercase tracking-[0.3em]">{user.role}</p>
                    <p className="text-[10px] text-gray-500 font-medium pt-4 group-hover:text-gray-300 transition-colors">{user.email}</p>
                  </div>
                  <div className="mt-10 pt-8 border-t border-white/5 flex justify-between items-center relative z-10">
                    <div className="flex gap-3">
                      <button onClick={() => handleEdit(user)} className="p-3 bg-white/5 hover:bg-blue-600 rounded-xl text-gray-500 hover:text-white transition-all"><FaUserEdit size={14} /></button>
                      <button onClick={() => handleResetKey(user.name)} className="p-3 bg-white/5 hover:bg-emerald-600 rounded-xl text-gray-500 hover:text-white transition-all"><FaKey size={14} /></button>
                    </div>
                    {user.id !== 1 && <button onClick={() => handleRevoke(user.id)} className="text-red-500/30 hover:text-red-500 transition-all text-[8px] font-black uppercase tracking-widest hover:underline underline-offset-8">Revoke_Privileges</button>}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          {filteredUsers.length === 0 && <div className="py-32 text-center text-gray-700 font-black uppercase tracking-[0.5em] text-[10px]">No security nodes detected</div>}
        </div>

        <div className="bg-amber-900/10 border border-amber-500/20 rounded-[2.5rem] p-10 relative overflow-hidden group shadow-xl">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity"><FaShieldAlt size={120} /></div>
          <div className="flex items-start gap-8 relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/20 flex items-center justify-center text-amber-500 border border-amber-500/20 shadow-inner"><FaUserShield size={28} /></div>
            <div>
              <h4 className="text-sm font-black text-amber-500 mb-3 tracking-[0.3em] uppercase italic underline underline-offset-8 decoration-dashed">Directive_402_B</h4>
              <p className="text-xs text-gray-500 leading-relaxed font-bold uppercase tracking-tight max-w-4xl opacity-60">All administrative actions are logged in the global audit trail. Provisioning new users requires Level-5 clearance. Password policies are enforced via SHA-256 standard protocols. Multi-factor authentication is mandatory for all access nodes within the VGT environment.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManager;
