import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaExclamationCircle } from 'react-icons/fa';

const FormError = ({ error, show = true }) => {
  if (!error || !show) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
        className="flex items-center gap-2 mt-2 text-red-500 text-xs font-medium"
        role="alert"
        aria-live="polite"
      >
        <FaExclamationCircle className="flex-shrink-0" size={12} />
        <span>{error}</span>
      </motion.div>
    </AnimatePresence>
  );
};

export default FormError;
