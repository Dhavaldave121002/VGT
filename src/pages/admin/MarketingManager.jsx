import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPaperPlane, FaUserAstronaut, FaCompass, FaExternalLinkAlt, FaInfoCircle } from 'react-icons/fa';
import emailjs from '@emailjs/browser';

import { api } from '../../utils/api';
import { SessionManager } from '../../utils/SessionManager';

const MarketingManager = () => {
  const [email, setEmail] = useState('');
  const [sending, setSending] = useState(false);
  const [subscribers, setSubscribers] = useState([]);
  const [status, setStatus] = useState({ type: '', msg: '' });
  const navigate = useNavigate();

  useEffect(() => {
    // Role Check
    if (!SessionManager.requireAuth(navigate, true)) return;

    fetchSubscribers();
  }, [navigate]);

  const fetchSubscribers = async () => {
    const data = await api.fetchAll('subscribers');
    setSubscribers(data);
  };

  const handleDispatch = async (e) => {
    e.preventDefault();
    if (!email) return;

    setSending(true);
    setStatus({ type: '', msg: '' });

    try {
      // EmailJS Configuration (Same as Newsletter)
      const SERVICE_ID = import.meta.env.VITE_EMAILJS_MARKETING_SERVICE_ID;
      const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_MARKETING_TEMPLATE_NEWSLETTER;
      const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_MARKETING_PUBLIC_KEY;

      // Parameters matching the Newsletter Template structure
      const templateParams = {
        to_email: email,
        from_name: "Vertex Global Tech Admin",
        type: "Marketing Brief Dispatch",
        message: "Here is the requested digital transformation roadmap and marketing brief.", // Dynamic message content
        otp_code: "", // Empty as not needed
        page_source: "Admin Marketing Node"
      };

      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);

      setStatus({ type: 'success', msg: 'MARKETING_PAYLOAD_DELIVERED_SUCCESSFULLY' });
      setEmail('');
    } catch (error) {
      console.error('Marketing Dispatch Error:', error);
      setStatus({ type: 'error', msg: 'DISPATCH_FAILURE: PROTOCOL_INTERRUPTED' });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] p-6 md:p-10 font-sans">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse shadow-[0_0_10px_#a855f7]"></div>
            <span className="text-purple-500 font-black text-[10px] uppercase tracking-[0.4em]">Propulsion_Engine</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">
            Marketing <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">Node</span>
          </h1>
          <p className="text-gray-500 font-medium uppercase tracking-[0.3em] text-[10px] mt-2">Targeted Outreach & Client Acquisition Pipeline</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Status Stats */}
          <div className="bg-[#0f172a]/40 border border-purple-500/20 p-8 rounded-[2rem] relative overflow-hidden group">
            <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity rotate-12">
              <FaUserAstronaut size={120} className="text-purple-500" />
            </div>
            <h3 className="text-purple-500 text-[10px] font-black uppercase tracking-widest mb-4 flex items-center gap-2">
              System_Status
            </h3>
            <p className="text-white font-black text-2xl uppercase tracking-tight">Ready_For_Deployment</p>
            <div className="mt-6 flex items-center gap-4">
              <div className="flex -space-x-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-[#0f172a] bg-purple-600/20 flex items-center justify-center text-[10px] text-purple-400 font-bold italic">B{i}</div>
                ))}
              </div>
              <span className="text-gray-500 text-[10px] font-bold uppercase tracking-widest leading-none">Global_Beacons_Active</span>
            </div>
          </div>

          <div className="bg-[#0f172a]/40 border border-blue-500/20 p-8 rounded-[2rem] relative overflow-hidden group">
            <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity -rotate-12">
              <FaCompass size={120} className="text-blue-500" />
            </div>
            <h3 className="text-blue-500 text-[10px] font-black uppercase tracking-widest mb-4 flex items-center gap-2">
              Outreach_Vector
            </h3>
            <p className="text-white font-black text-2xl uppercase tracking-tight">B2B_Service_Marketing</p>
            <div className="mt-6 flex items-center gap-2 text-gray-500 text-[10px] font-bold uppercase tracking-widest">
              <FaInfoCircle /> Protocol: 256-BIT_ENCRYPTED_SEND
            </div>
          </div>
        </div>

        {/* Dispatch Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#0f172a]/60 backdrop-blur-2xl border border-white/5 p-10 md:p-16 rounded-[3rem] shadow-3xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>

          <div className="text-center mb-12">
            <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-2">Initialize Dispatch</h2>
            <p className="text-gray-500 text-xs font-medium max-w-sm mx-auto">Enter the target email address to deploy our digital transformation roadmap payload.</p>
          </div>

          <form onSubmit={handleDispatch} className="space-y-8">
            <div className="space-y-4">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] ml-2">Target_Client_Identity (Email)</label>
              <div className="relative group">
                <FaPaperPlane className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-purple-500 transition-colors" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="CLIENT_IDENTIFIER@SECURE.HOST"
                  className="w-full bg-black/40 border border-white/10 rounded-3xl py-7 pl-16 pr-8 text-white placeholder-gray-800 focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 outline-none transition-all font-black tracking-widest text-sm uppercase"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={sending}
              className={`w-full py-7 rounded-3xl font-black uppercase text-xs tracking-[0.4em] transition-all flex items-center justify-center gap-4 active:scale-95 shadow-2xl ${sending ? 'bg-gray-800 text-gray-500 cursor-not-allowed' : 'bg-purple-600 text-white hover:bg-purple-500 hover:shadow-purple-900/40'}`}
            >
              {sending ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                  Synchronizing_Data...
                </>
              ) : (
                <>
                  <FaPaperPlane /> Deploy_Marketing_Brief
                </>
              )}
            </button>

            <AnimatePresence>
              {status.msg && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className={`p-6 rounded-2xl border ${status.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' : 'bg-red-500/10 border-red-500/20 text-red-500'} text-[10px] font-black uppercase tracking-widest text-center`}
                >
                  {status.msg}
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </motion.div>

        {/* SUBSCRIBERS LIST SECTION */}
        <div className="mt-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></div>
            <h4 className="text-white font-black text-[10px] uppercase tracking-[0.4em]">Subscribed_Identities</h4>
          </div>

          <div className="bg-[#0f172a]/40 border border-white/5 rounded-[2rem] overflow-hidden">
            {subscribers.length > 0 ? (
              <div className="grid gap-px bg-white/5">
                {subscribers.map((sub, idx) => (
                  <div key={sub.id || idx} className="bg-[#0f172a] p-6 flex flex-col md:flex-row items-center justify-between gap-4 group hover:bg-[#1e293b] transition-colors">
                    <div className="flex items-center gap-4 w-full md:w-auto">
                      <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 font-bold text-xs uppercase">
                        {sub.email.substring(0, 2)}
                      </div>
                      <div>
                        <div className="text-white font-bold text-sm">{sub.email}</div>
                        <div className="text-[9px] text-gray-500 font-black uppercase tracking-widest mt-1">
                          Since {new Date(sub.subscribed_at).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-[8px] font-black text-emerald-500 uppercase tracking-widest">Active_Node</span>
                      <button
                        onClick={async () => {
                          if (window.confirm('Terminate this subscription node?')) {
                            await api.delete('subscribers', sub.id);
                            fetchSubscribers();
                          }
                        }}
                        className="text-gray-600 hover:text-red-500 transition-colors p-2"
                      >
                        <span className="text-[8px] font-black uppercase tracking-widest">Terminate</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-10 text-center text-gray-500 text-xs font-black uppercase tracking-widest">
                No active subscriptions detected in the grid.
              </div>
            )}
          </div>
        </div>

        <footer className="mt-12 text-center">
          <p className="text-gray-700 text-[8px] font-black uppercase tracking-[0.5em]">System_Integrity: VERIFIED_ENCRYPTION_LAYER</p>
        </footer>
      </div>
    </div>
  );
};

export default MarketingManager;
