import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

interface SuccessModalProps {
  title: string;
  message: string;
  buttonText: string;
  onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({
  title,
  message,
  buttonText,
  onClose,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: 'spring', damping: 20 }}
        className="w-full max-w-md p-8 bg-white rounded-lg shadow-xl"
      >
        <div className="flex flex-col items-center text-center">
          <div className="w-20 h-20 mb-6 rounded-full bg-success-500/10 flex items-center justify-center">
            <CheckCircle size={48} className="text-success-500" />
          </div>
          
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600 mb-6">{message}</p>
          
          <button
            onClick={onClose}
            className="w-full btn-primary"
          >
            {buttonText}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SuccessModal;