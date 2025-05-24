import { motion } from 'framer-motion';
import zeus_logo from '../assets/zeus-logo.png';

const SplashScreen = () => {
  return (
    <div className="h-screen bg-gradient-to-r from-primary-400 to-primary-700 flex items-center justify-center">
      <div className="container max-w-6xl mx-auto px-8 flex flex-col md:flex-row items-center justify-between">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-white mb-8 md:mb-0"
        >
          <h2 className="text-4xl font-light mb-2">2025</h2>
          <h1 className="text-7xl font-bold">ZEUS</h1>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-md"
        >
          <img 
            src={zeus_logo}
            alt="Zeus Logo" 
            className="w-full h-auto scale-169 drop-shadow-xl"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default SplashScreen;