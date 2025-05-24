import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';
import AuthLayout from '../../components/Auth/AuthLayout';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      await login(email, password);
    } catch (error) {
      setError('Email ou senha inválidos.');
    } finally {
      setIsLoading(false);
    }
  };

  const loginIllustration = "https://images.pexels.com/photos/6963944/pexels-photo-6963944.jpeg";

  return (
    <AuthLayout
      title="Faça o login novamente"
      subtitle="Bem vindo de volta!"
      illustration={loginIllustration}
      illustrationAlt="Pessoa usando celular com proteção de senha"
    >
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
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Entre com endereço de email"
            className="input-field"
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Senha
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••"
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
        
        <div className="flex justify-between items-center mb-6">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={remember}
              onChange={() => setRemember(!remember)}
              className="mr-2 h-4 w-4 text-primary-500 focus:ring-primary-500 border-gray-300 rounded"
            />
            <span className="text-sm text-gray-700">Lembrar</span>
          </label>
          
          <Link to="/forgot-password" className="text-sm text-primary-500 hover:underline">
            Eu esqueci minha senha
          </Link>
        </div>
        
        <button 
          type="submit" 
          className="w-full btn-primary"
          disabled={isLoading}
        >
          {isLoading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
    </AuthLayout>
  );
};

export default Login;