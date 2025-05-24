import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import AuthLayout from '../../components/Auth/AuthLayout';
import { useAuth } from '../../context/AuthContext';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { setResetEmail } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email) {
      setError('Por favor, digite seu endereço de e-mail.');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setResetEmail(email);
      navigate('/verify-code');
    }, 1000);
  };

  const forgotPasswordIllustration = "https://images.pexels.com/photos/927022/pexels-photo-927022.jpeg";

  return (
    <AuthLayout
      title="Esqueceu sua senha?"
      subtitle="Recuperação de senha"
      illustration={forgotPasswordIllustration}
      illustrationAlt="Pessoa pensando em frente ao computador"
    >
      <p className="text-gray-600 mb-8">
        Insira o endereço de e-mail vinculado a esta conta e lhe enviaremos um código para que você possa alterar sua senha.
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
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Endereço de email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Entre com seu email"
            className="input-field"
          />
        </div>
        
        <button 
          type="submit" 
          className="w-full btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Enviando...' : 'Enviar'}
        </button>
      </form>
    </AuthLayout>
  );
};

export default ForgotPassword;