import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import AuthLayout from '../../components/Auth/AuthLayout';
import { useAuth } from '../../context/AuthContext';

const VerifyCode = () => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();
  const { resetEmail, verifyCode } = useAuth();

  // Redirect if no reset email
  useEffect(() => {
    if (!resetEmail) {
      navigate('/forgot-password');
    }
  }, [resetEmail, navigate]);

  const handleChange = (value: string, index: number) => {
    if (value.length > 1) {
      value = value[0];
    }
    
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    
    // Auto focus next or previous input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    } else if (!value && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const fullCode = code.join('');
    if (fullCode.length !== 6) {
      setError('Por favor, digite o código completo de 6 dígitos.');
      return;
    }
    
    setIsSubmitting(true);
    
    // Validate code
    const isValid = verifyCode(fullCode);
    
    setTimeout(() => {
      setIsSubmitting(false);
      
      if (isValid) {
        navigate('/reset-password');
      } else {
        setError('Código inválido. Por favor, tente novamente.');
      }
    }, 1000);
  };

  const verificationIllustration = "https://images.pexels.com/photos/6963944/pexels-photo-6963944.jpeg";

  return (
    <AuthLayout
      title="Verificação de email"
      subtitle="Recuperação de senha"
      illustration={verificationIllustration}
      illustrationAlt="Pessoa usando celular com proteção de senha"
    >
      <p className="text-gray-600 mb-8">
        Por favor, digite o código de 6 dígitos que foi enviado para seu endereço de e-mail.
      </p>
      
      <form onSubmit={handleSubmit}>
        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-3 bg-red-50 text-red-500 rounded-md text-sm"
          >
            {error}
          </motion.div>
        )}
        
        <div className="mb-8">
          <div className="flex justify-between space-x-2">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-12 h-12 text-center text-xl font-bold border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-300"
              />
            ))}
          </div>
        </div>
        
        <button 
          type="submit" 
          className="w-full btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Verificando...' : 'Verificar'}
        </button>
      </form>
    </AuthLayout>
  );
};

export default VerifyCode;