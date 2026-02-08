import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTrash, FaEdit, FaExclamationTriangle } from 'react-icons/fa';

const ConfirmModal = ({ show, title, message, onConfirm, onCancel, type = 'danger' }) => {
  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCancel}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md bg-[#0f172a] border border-white/10 rounded-[2.5rem] p-10 shadow-2xl overflow-hidden"
          >
            <div className={`absolute -right-4 -top-4 w-40 h-40 opacity-[0.03] rotate-12 ${type === 'danger' ? 'text-red-500' : type === 'warning' ? 'text-amber-500' : 'text-blue-500'}`}>
              {type === 'danger' ? <FaTrash size={160} /> : type === 'warning' ? <FaExclamationTriangle size={160} /> : <FaEdit size={160} />}
            </div>

            <h3 className={`text-2xl font-black mb-4 uppercase tracking-tighter ${type === 'danger' ? 'text-red-500' : type === 'warning' ? 'text-amber-500' : 'text-blue-500'}`}>
              {title}
            </h3>
            <p className="text-gray-400 font-medium mb-10 leading-relaxed text-sm">
              {message}
            </p>

            <div className="flex gap-4">
              <button
                onClick={() => {
                  onConfirm?.();
                  onCancel();
                }}
                className={`flex-1 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${type === 'danger' ? 'bg-red-600 hover:bg-red-500 shadow-red-900/20' :
                    type === 'warning' ? 'bg-amber-600 hover:bg-amber-500 shadow-amber-900/20' :
                      'bg-blue-600 hover:bg-blue-500 shadow-blue-900/20'
                  } text-white shadow-xl active:scale-95`}
              >
                CONFIRM_PROTOCOL
              </button>
              <button
                onClick={onCancel}
                className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all"
              >
                ABORT
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmModal;
