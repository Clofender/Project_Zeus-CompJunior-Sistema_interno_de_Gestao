import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';
import AuthLayout from '../../components/Auth/AuthLayout';
import SuccessModal from '../../components/Common/SuccessModal';
import { useAuth } from '../../context/AuthContext';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();
  const { resetEmail, resetPassword } = useAuth();

  // Redirect if no reset email
  useEffect(() => {
    if (!resetEmail) {
      navigate('/forgot-password');
    }
  }, [resetEmail, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!password || !confirmPassword) {
      setError('Por favor, preencha todos os campos.');
      return;
    }
    
    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }
    
    setIsSubmitting(true);
    
    // Reset password
    const success = resetPassword(password);
    
    setTimeout(() => {
      setIsSubmitting(false);
      
      if (success) {
        setShowSuccessModal(true);
      } else {
        setError('Não foi possível redefinir sua senha. Por favor, tente novamente.');
      }
    }, 1000);
  };

  const handleModalClose = () => {
    setShowSuccessModal(false);
    navigate('/login');
  };

  const resetPasswordIllustration = "https://images.pexels.com/photos/927022/pexels-photo-927022.jpeg";

  return (
    <>
      <AuthLayout
        title="Redefinição de senha"
        subtitle="Recuperação de senha"
        illustration={resetPasswordIllustration}
        illustrationAlt="Pessoa pensando em frente ao computador"
      >
        <p className="text-gray-600 mb-8">
          Por favor, digite uma nova senha.
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
          
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Nova senha
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field pr-10"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          
          <div className="mb-8">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Confirmar nova senha
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="input-field pr-10"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          
          <button 
            type="submit" 
            className="w-full btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Redefinindo...' : 'Redefinir'}
          </button>
        </form>
      </AuthLayout>
      
      {showSuccessModal && (
        <SuccessModal
          title="Parabéns"
          message="Você alterou sua senha com sucesso."
          buttonText="Voltar para o login"
          onClose={handleModalClose}
        />
      )}
    </>
  );
};

export default ResetPassword;