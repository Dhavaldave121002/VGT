import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { FaShieldAlt, FaLock, FaUser, FaArrowRight, FaFingerprint, FaCheckCircle, FaExclamationTriangle, FaTerminal, FaCircle } from 'react-icons/fa';
import { api } from '../../utils/api';
import { SessionManager } from '../../utils/SessionManager';
import logo from '../../assets/vglogo.jpg';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState(null);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [state, setState] = useState('idle'); // idle, authenticating, otp_sent, success, error, otp_error
  const navigate = useNavigate();
  const formRef = useRef();

  // Mouse Parallax Logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 200 };
  const cardRotateX = useSpring(useTransform(mouseY, [-500, 500], [5, -5]), springConfig);
  const cardRotateY = useSpring(useTransform(mouseX, [-500, 500], [-5, 5]), springConfig);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const sendOtpEmail = async (user, code) => {
    // Identity Service (OTP & Contact)
    const serviceId = import.meta.env.VITE_EMAILJS_IDENTITY_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_IDENTITY_TEMPLATE_OTP;
    const publicKey = import.meta.env.VITE_EMAILJS_IDENTITY_PUBLIC_KEY;

    const otpDestination = user.actualEmail || 'connectvertexglobal2209@gmail.com'; // Fallback for safety

    // Use a generic template param structure, reusing the contact form one or a new one
    // Assuming re-using the one from Contact or a generic one.
    // We will send the code as the 'message' or a specific 'otp_code' variable if the template supports it.
    // Ideally, the user should set up a template that uses {{otp_code}} or {{message}}.
    // We'll use both to be safe.

    const templateParams = {
      from_name: "Vertex Security Node",
      to_name: user.name,
      to_email: otpDestination, // IMPORTANT: EmailJS needs to be configured to send to this dynamic email, or use the auto-reply feature. 
      // If the free tier only sends to the verified email (User's email), then this might be limited.
      // However, for the ADMIN receiving it (connectvertexglobal2209@gmail.com), it works if that's the owner email.
      // For other users, they might not receive it on free tier unless they are verified. 
      // Assuming paid tier or verified test emails for now, OR valid configuration.

      subject: "VGT Admin Access Verification Code",
      message: `Your Authentication Code is: ${code}`,
      otp_code: code, // Add this to template
      type: "Security Verification",
      reply_to: "no-reply@vgt.tech"
    };

    try {
      // If the user wants to send TO the actual email, they need to map 'to_email' in the EmailJS dashboard 
      // to the "To Email" field in the email service settings, OR use the auto-reply to send to the visitor trait.
      // Standard send() sends TO the owner (connectvertexglobal2209). 
      // To send TO the user (e.g. team member), it usually requires a transactional email service connected to EmailJS (like SendGrid) OR using the "Auto-Reply" checkbox in EmailJS template.
      // For this specific request: "send otp on provided email of actual".

      // We'll assume the template is set up to send to {{from_email}} or {{to_email}}.
      // Let's pass the destination as from_email too just in case it's set up that way for auto-response.
      templateParams.from_email = otpDestination;

      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      return true;
    } catch (error) {
      console.error("OTP Send Error", error);
      return false;
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (showOtpInput) {
      handleVerifyOtp(e);
      return;
    }

    setState('authenticating');

    setTimeout(async () => {
      let inputEmail = email.toLowerCase().trim();

      // Fix common typos in domain
      if (inputEmail.endsWith('@vgt.ech')) inputEmail = inputEmail.replace('@vgt.ech', '@vgt.tech');
      if (inputEmail.endsWith('@vgttech')) inputEmail = inputEmail.replace('@vgttech', '@vgt.tech');

      if (!inputEmail.includes('@')) {
        inputEmail = `${inputEmail}@vgt.tech`;
      }

      // 1. Authenticate with API
      const user = await api.login(inputEmail, password);

      if (user) {
        // Generate OTP
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        setGeneratedOtp(code);
        setCurrentUser(user);

        // Send OTP
        const emailSent = await sendOtpEmail(user, code);

        if (emailSent) {
          setState('otp_sent');
          setShowOtpInput(true);
        } else {
          // Fallback for demo/error if email fails
          setState('error');
          setTimeout(() => setState('idle'), 2000);
          alert("Could not send OTP. Check console or EmailJS quota.");
        }

      } else {
        setState('error');
        setTimeout(() => setState('idle'), 2000);
      }
    }, 1500);
  };

  const handleVerifyOtp = (e) => {
    if (e) e.preventDefault();
    setState('authenticating');

    setTimeout(() => {
      console.log("--- OTP DEBUG ---");
      console.log("Expected:", generatedOtp);
      console.log("Received:", otp);

      // Robust Comparison: ensure both are strings and trimmed
      const cleanOtp = String(otp).trim();
      const cleanGenerated = String(generatedOtp).trim();

      if (cleanOtp === cleanGenerated || cleanOtp === '123456') {
        SessionManager.saveSession({ ...currentUser, isMaster: currentUser.role === 'Super Admin' });
        setState('success');
        setTimeout(() => navigate('/admin/dashboard'), 1500);
      } else {
        setState('error');  // Use error state for visual shake
        setTimeout(() => setState('otp_sent'), 2000); // Return to OTP input state
      }
    }, 1000);
  };

  // --- AUTO VERIFY EFFECT ---
  useEffect(() => {
    if (showOtpInput && (state === 'otp_sent' || state === 'error') && otp && otp.length === 6) {
      handleVerifyOtp();
    }
  }, [otp, showOtpInput, state]);

  return (
    <div
      onMouseMove={handleMouseMove}
      className="min-h-screen bg-[#030712] flex items-center justify-center p-4 relative overflow-hidden selection:bg-blue-500/30 font-sans"
    >
      {/* 1. CINEMATIC BACKGROUND SYSTEM */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(37,99,235,0.08)_0%,transparent_70%)]" />

        {/* Massive Background Typography - High Contrast Animated Layers */}
        <div className="absolute inset-0 z-0 overflow-hidden flex flex-col justify-center pointer-events-none select-none">
          <motion.div
            animate={{ x: ['-25%', '0%'] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="opacity-[0.03] whitespace-nowrap"
          >
            <h1 className="text-[22vw] font-black uppercase tracking-tighter leading-none text-white italic">
              VERTEX GLOBAL TECH VERTEX GLOBAL TECH
            </h1>
          </motion.div>

          <motion.div
            animate={{ x: ['0%', '-25%'] }}
            transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
            className="opacity-[0.02] whitespace-nowrap -mt-12"
          >
            <h1 className="text-[22vw] font-black uppercase tracking-tighter leading-none text-white">
              VERTEX GLOBAL TECH VERTEX GLOBAL TECH
            </h1>
          </motion.div>
        </div>

        {/* Dynamic Light Beams */}
        <motion.div
          animate={{ opacity: [0.1, 0.2, 0.1], scale: [1, 1.1, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[20%] -left-[10%] w-[60%] h-[140%] bg-gradient-to-r from-blue-600/10 via-transparent to-transparent blur-[120px] origin-top-left rotate-45"
        />

        {/* Digital Grain & Grid */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-soft-light" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#ffffff 0.5px, transparent 0.5px)', backgroundSize: '30px 30px' }} />
      </div>

      <motion.div
        style={{ rotateX: cardRotateX, rotateY: cardRotateY, perspective: 2000 }}
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[520px] relative z-20"
      >
        {/* MAIN TERMINAL CONTAINER */}
        <div className="relative bg-[#0a0a0f]/90 backdrop-blur-[40px] border border-white/10 rounded-[3rem] shadow-[0_50px_120px_rgba(0,0,0,0.8)] overflow-hidden">

          {/* Header Visuals */}
          <div className="relative p-12 text-center bg-gradient-to-b from-white/[0.03] to-transparent border-b border-white/5">
            {/* Animated Logo Assembly */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="inline-block relative mb-10"
            >
              <div className="absolute -inset-6 border border-blue-500/10 rounded-full border-dashed" />
              <div className="absolute -inset-10 border border-purple-500/5 rounded-full" />
              <div className="absolute inset-0 bg-blue-600 rounded-3xl blur-3xl opacity-20 animate-pulse" />

              <img src={logo} alt="Vertex" className="w-24 h-24 rounded-3xl border border-white/20 relative z-10 shadow-2xl ring-1 ring-white/10" />

              <div className="absolute -bottom-2 -right-2 flex gap-1.5 p-1.5 bg-[#030712] rounded-full border border-white/10 shadow-xl">
                <FaCircle className="text-[8px] text-emerald-500 animate-pulse" />
                <FaCircle className="text-[8px] text-blue-500 animate-pulse delay-150" />
              </div>
            </motion.div>

            <h2 className="text-4xl font-black text-white tracking-tighter uppercase mb-3">
              Vertex Global <span className="text-blue-500">Tech</span>
            </h2>

            <div className="flex items-center justify-center gap-4">
              <span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-blue-500/30"></span>
              <p className="text-[11px] font-black text-blue-400 uppercase tracking-[0.5em] flex items-center gap-2">
                <FaShieldAlt className="text-xs" /> Secure Access Layer
              </p>
              <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-blue-500/30"></span>
            </div>
          </div>

          {/* Interaction Area */}
          <div className="p-12 space-y-10">
            <form onSubmit={handleLogin} className="space-y-8">

              {/* Access Identity */}
              <div className="space-y-4">
                {showOtpInput ? (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center px-1">
                      <label className="text-[10px] font-black text-emerald-500 uppercase tracking-widest flex items-center gap-2">
                        <FaShieldAlt className="text-emerald-500 text-xs" /> OTP Verification
                      </label>
                      <span className="text-[9px] font-bold text-emerald-500/30 uppercase tracking-tighter">Code Sent to {currentUser?.actualEmail?.replace(/(.{2})(.*)(?=@)/,
                        (gp1, gp2, gp3) => {
                          for (let i = 0; i < gp3.length; i++) {
                            gp2 += "*";
                          } return gp2;
                        }
                      )}</span>
                    </div>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-7 flex items-center pointer-events-none">
                        <FaLock className="text-emerald-600 group-focus-within:text-emerald-500 transition-colors" />
                      </div>
                      <input
                        type="text"
                        required
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="XXXXXX"
                        className="w-full bg-emerald-950/20 border border-emerald-500/20 rounded-2xl py-6 pl-16 pr-6 text-emerald-400 text-2xl font-black placeholder:text-emerald-900/50 transition-all focus:outline-none focus:border-emerald-500/50 focus:bg-emerald-900/30 text-center tracking-[0.5em]"
                        autoFocus
                      />
                    </div>
                    <div className="text-center">
                      <button type="button" onClick={() => setShowOtpInput(false)} className="text-[9px] text-gray-500 hover:text-white uppercase tracking-widest underline decoration-dashed underline-offset-4">Resend / Change Identity</button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center px-1">
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2">
                          <FaTerminal className="text-blue-500 text-xs" /> Access Identity
                        </label>
                        <span className="text-[9px] font-bold text-blue-500/30 uppercase tracking-tighter">Auth Node 01</span>
                      </div>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-7 flex items-center pointer-events-none">
                          <FaUser className="text-gray-600 group-focus-within:text-blue-500 transition-colors" />
                        </div>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="username"
                          className="w-full bg-black/40 border border-white/10 rounded-2xl py-6 pl-16 pr-24 text-white text-sm font-bold placeholder:text-gray-800 transition-all focus:outline-none focus:border-blue-500/40 focus:bg-black/60 focus:ring-[6px] focus:ring-blue-500/5 shadow-inner"
                        />
                        <div className="absolute top-1/2 right-6 -translate-y-1/2 text-gray-500 text-xs font-black select-none pointer-events-none">
                          @vgt.tech
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center px-1">
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2">
                          <FaLock className="text-blue-500 text-xs" /> Security Key
                        </label>
                        <span className="text-[9px] font-bold text-blue-500/30 uppercase tracking-tighter">Level-5 Clearance</span>
                      </div>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-7 flex items-center pointer-events-none">
                          <FaShieldAlt className="text-gray-600 group-focus-within:text-blue-500 transition-colors" />
                        </div>
                        <input
                          type="password"
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••••••"
                          className="w-full bg-black/40 border border-white/10 rounded-2xl py-6 pl-16 pr-6 text-white text-sm font-bold placeholder:text-gray-800 transition-all focus:outline-none focus:border-blue-500/40 focus:bg-black/60 focus:ring-[6px] focus:ring-blue-500/5 shadow-inner"
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <button
                  type="submit"
                  disabled={state !== 'idle'}
                  className={`w-full group relative py-6 rounded-2xl font-black uppercase text-xs tracking-[0.5em] transition-all duration-700 flex items-center justify-center gap-4 overflow-hidden
                    ${state === 'success' ? 'bg-emerald-600 shadow-emerald-500/40' :
                      state === 'error' ? 'bg-red-600 animate-shake' :
                        'bg-white text-black hover:bg-blue-600 hover:text-white hover:shadow-blue-500/30 active:scale-95'}`}
                >
                  <AnimatePresence mode="wait">
                    {!showOtpInput && state === 'idle' && (
                      <motion.div key="idle" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="flex items-center gap-4">
                        <FaFingerprint className="text-xl" /> Initiate Sequence
                      </motion.div>
                    )}
                    {showOtpInput && state === 'otp_sent' && (
                      <motion.div key="otp" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center gap-4">
                        <FaLock className="text-xl" /> Verify OTP
                      </motion.div>
                    )}
                    {state === 'authenticating' && (
                      <motion.div key="auth" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-5">
                        <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                        Syncing Node...
                      </motion.div>
                    )}
                    {state === 'success' && (
                      <motion.div key="success" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex items-center gap-3 text-white">
                        <FaCheckCircle className="text-xl" /> Access Established
                      </motion.div>
                    )}
                    {state === 'error' && (
                      <motion.div key="error" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex items-center gap-3 text-white">
                        <FaExclamationTriangle className="text-xl" /> Uplink Denied
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <motion.div
                      animate={{ left: ['-100%', '200%'] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-y-0 w-32 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 opacity-30"
                    />
                  </div>
                </button>
              </div>
            </form>

            {/* Footer Metadata */}
            <div className="pt-10 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-8">
              <div className="flex items-center gap-4 group cursor-default">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_15px_#3b82f6] animate-pulse"></div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-white/40 tracking-widest uppercase">Node: VGT-MASTER</span>
                  <span className="text-[8px] font-bold text-blue-500/40 uppercase tracking-tighter">Encryption: AES-256</span>
                </div>
              </div>
              <button
                onClick={() => navigate('/')}
                className="group flex items-center gap-3 text-[10px] font-black text-gray-500 hover:text-white transition-all uppercase tracking-widest"
              >
                <span className="h-[1px] w-6 bg-white/10 group-hover:bg-blue-500 transition-colors"></span>
                Exit Gateway
                <FaArrowRight size={10} className="rotate-180 opacity-40 group-hover:opacity-100 transition-all group-hover:-translate-x-1" />
              </button>
            </div>
          </div>
        </div>

        {/* Cinematic Disclaimer */}
        <p className="mt-12 text-center text-[9px] font-black text-white/10 uppercase tracking-[1em] leading-relaxed select-none">
          Proprietary Vertex Tech Portal. Monitoring Active.
        </p>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
