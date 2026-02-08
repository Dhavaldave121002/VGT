import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaShieldVirus, FaFingerprint, FaKey, FaChevronRight } from 'react-icons/fa';

const AdminVerify = () => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(60);
  const [isVerifying, setIsVerifying] = useState(false);
  const inputs = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer(prev => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleChange = (index, value) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    if (value && index < 3) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const handleVerify = () => {
    setIsVerifying(true);
    // Simulate auth verification
    setTimeout(() => {
      navigate('/admin/dashboard');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6 relative overflow-hidden font-mono">
      {/* HUD Telemetry Elements */}
      <div className="absolute top-10 left-10 text-[10px] text-blue-500/40 hidden md:block">
        <p>SEC_AUTH_LEVEL: 05</p>
        <p>IDENT_STATUS: PENDING</p>
        <p>SCANCODE: 0X8892-VGT</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="glass-panel p-8 md:p-10 border-blue-500/20 text-center relative overflow-hidden">

          <div className="w-20 h-20 rounded-full bg-blue-600/10 border border-blue-500/20 flex items-center justify-center mx-auto mb-8 relative">
            <FaFingerprint className="text-blue-500 text-3xl animate-pulse" />
            <motion.div
              className="absolute inset-x-0 h-[1px] bg-blue-400"
              animate={{ top: ['20%', '80%', '20%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
          </div>

          <h2 className="text-xl font-bold text-white tracking-[0.2em] uppercase mb-4">Biometric Confirmation</h2>
          <p className="text-gray-500 text-xs mb-8 leading-relaxed">
            A secure verification link was sent to your authorized terminal. Please enter the 4-digit security token to proceed.
          </p>

          <div className="flex gap-4 justify-center mb-10">
            {otp.map((digit, i) => (
              <input
                key={i}
                ref={el => inputs.current[i] = el}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                className="w-14 h-16 bg-black/50 border border-white/10 rounded-xl text-center text-2xl font-bold text-blue-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-all"
              />
            ))}
          </div>

          <div className="flex flex-col gap-6">
            <button
              onClick={handleVerify}
              disabled={isVerifying || otp.join('').length < 4}
              className="w-full py-4 bg-gradient-to-r from-blue-700 to-blue-600 hover:from-blue-600 hover:to-blue-500 text-white font-bold rounded-xl transition-all shadow-lg active:scale-95 disabled:opacity-50 disabled:grayscale"
            >
              {isVerifying ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  VALIDATING...
                </span>
              ) : (
                <span className="tracking-widest flex items-center justify-center gap-2">
                  CONFIRM ACCESS <FaChevronRight className="text-xs" />
                </span>
              )}
            </button>

            <div className="flex justify-between items-center text-[10px] font-bold tracking-tighter">
              <span className="text-gray-600">TOKEN EXPIRES IN: <span className="text-blue-500">{timer}S</span></span>
              <button
                onClick={() => setTimer(60)}
                className="text-blue-500 hover:text-blue-400 transition-colors uppercase underline underline-offset-4"
              >
                Resend Token
              </button>
            </div>
          </div>

          {/* Background Glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminVerify;
