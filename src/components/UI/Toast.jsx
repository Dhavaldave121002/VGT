import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle, FaExclamationTriangle, FaTimesCircle, FaInfoCircle } from 'react-icons/fa';

const Toast = ({ show, type = 'success', message, onClose, duration = 4000 }) => {
  useEffect(() => {
    if (show && duration > 0) {
      const timer = setTimeout(() => {
        onClose?.();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);

  const config = {
    success: {
      icon: FaCheckCircle,
      bgColor: 'bg-emerald-500/90',
      borderColor: 'border-emerald-500',
      textColor: 'text-white'
    },
    error: {
      icon: FaTimesCircle,
      bgColor: 'bg-red-500/90',
      borderColor: 'border-red-500',
      textColor: 'text-white'
    },
    warning: {
      icon: FaExclamationTriangle,
      bgColor: 'bg-amber-500/90',
      borderColor: 'border-amber-500',
      textColor: 'text-white'
    },
    info: {
      icon: FaInfoCircle,
      bgColor: 'bg-blue-500/90',
      borderColor: 'border-blue-500',
      textColor: 'text-white'
    }
  };

  const { icon: Icon, bgColor, borderColor, textColor } = config[type] || config.success;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -50, x: 50 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: -50, x: 50 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed top-6 right-6 z-[9999] max-w-md"
          role="alert"
          aria-live="assertive"
        >
          <div className={`${bgColor} ${textColor} backdrop-blur-xl border ${borderColor} rounded-2xl shadow-2xl p-4 flex items-center gap-4`}>
            <Icon className="flex-shrink-0" size={24} />
            <p className="font-medium text-sm flex-1">{message}</p>
            <button
              onClick={onClose}
              className="flex-shrink-0 hover:opacity-70 transition-opacity"
              aria-label="Close notification"
            >
              <FaTimesCircle size={18} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
