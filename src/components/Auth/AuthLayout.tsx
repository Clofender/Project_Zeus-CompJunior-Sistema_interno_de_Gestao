import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import comp_logo from '../../assets/compjunior.png';

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
  illustration: string;
  illustrationAlt: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  title,
  subtitle,
  illustration,
  illustrationAlt,
}) => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Form section */}
      <motion.div 
        className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Logo and create account button */}
        <div className="flex justify-between items-center mb-12">
          <div className="flex items-center">
            <img 
              src={comp_logo}
              alt="CompJr Logo" 
              className="h-8 w-8"
            />
            <div className="ml-2">
              <div className="font-bold text-gray-900">CompJR</div>
              <div className="text-xs text-gray-500">Sistema ERP</div>
            </div>
          </div>
          
          <Link to="/register" className="hidden md:block btn-outline">
            Criar Conta
          </Link>
        </div>
        
        {/* Title and subtitle */}
        <div className="mb-8">
          <p className="text-gray-500">{subtitle}</p>
          <h1 className="text-3xl font-bold mt-1">{title}</h1>
        </div>
        
        {/* Form */}
        {children}
        
        {/* Mobile create account button */}
        <Link to="/register" className="md:hidden w-full btn-outline mt-4">
          Criar Conta
        </Link>
      </motion.div>
      
      {/* Illustration section */}
      <motion.div 
        className="hidden md:flex md:w-1/2 bg-gray-100 items-center justify-center p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <img 
          src={illustration} 
          alt={illustrationAlt} 
          className="max-w-full max-h-[80vh] object-contain"
        />
      </motion.div>
    </div>
  );
};

export default AuthLayout;