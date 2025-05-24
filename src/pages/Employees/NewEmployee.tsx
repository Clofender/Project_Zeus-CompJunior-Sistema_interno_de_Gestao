import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, Camera, ArrowLeft } from 'lucide-react';
import SuccessModal from '../../components/Common/SuccessModal';
import { areas, roles, skills, addEmployee } from '../../data/mockData';
import { format } from 'date-fns';

const NewEmployee = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    gender: '',
    role: '',
    area: '',
    birthDate: '',
    phone: '',
    joinDate: '',
    skills: [] as string[],
  });
  
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSkillsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setFormData(prev => ({ ...prev, skills: selectedOptions }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Add new employee to the list
    addEmployee({
      ...formData,
      id: '', // Will be set by addEmployee function
      avatar: avatarPreview || undefined,
    });
    
    setShowSuccessModal(true);
  };

  const handleModalClose = () => {
    setShowSuccessModal(false);
    navigate('/employees');
  };

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center">
          <Link to="/employees" className="text-primary-500 hover:underline flex items-center mr-4">
            <ArrowLeft size={16} className="mr-1" />
            Voltar
          </Link>
          <div className="flex items-center">
            <UserPlus size={24} className="text-gray-800 mr-2" />
            <div>
              <h1 className="text-2xl font-bold">Novo funcionário</h1>
              <p className="text-gray-500">Criar um novo funcionário</p>
            </div>
          </div>
        </div>
        
        {/* Form */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-6">Adicionar funcionário</h2>
          
          <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-8">
            {/* Left column - Photo upload */}
            <div className="w-full lg:w-1/4 flex flex-col items-center">
              <div className="w-40 h-40 rounded-full bg-gray-100 flex items-center justify-center mb-4 overflow-hidden relative">
                {avatarPreview ? (
                  <img 
                    src={avatarPreview} 
                    alt="Preview" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Camera size={40} className="text-gray-400" />
                )}
                
                <input
                  type="file"
                  id="avatar"
                  accept="image/jpeg, image/png, image/jpg"
                  className="sr-only"
                  onChange={handlePhotoChange}
                />
              </div>
              
              <label 
                htmlFor="avatar" 
                className="block text-center cursor-pointer mb-2 text-primary-500"
              >
                Carregar foto
              </label>
              
              <p className="text-xs text-gray-500 text-center mb-1">
                Formato permitido JPG, JPEG, e PNG
              </p>
              <p className="text-xs text-gray-500 text-center mb-8">
                Tamanho máximo 2MB
              </p>
            </div>
            
            {/* Right column - Form fields */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Nome
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="input-field"
                />
              </div>
              
              {/* Birth date */}
              <div>
                <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Data de nascimento
                </label>
                <input
                  type="date"
                  id="birthDate"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleChange}
                  required
                  className="input-field"
                />
              </div>
              
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="input-field"
                />
              </div>
              
              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Número de telefone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="input-field"
                />
              </div>
              
              {/* Gender */}
              <div>
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                  Gênero
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                  className="input-field"
                >
                  <option value="" disabled>Selecione o gênero</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Feminino">Feminino</option>
                  <option value="Outro">Outro</option>
                </select>
              </div>
              
              {/* Join date */}
              <div>
                <label htmlFor="joinDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Data de ingresso
                </label>
                <input
                  type="date"
                  id="joinDate"
                  name="joinDate"
                  value={formData.joinDate}
                  onChange={handleChange}
                  required
                  className="input-field"
                />
              </div>
              
              {/* Role */}
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                  Cargo
                </label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                  className="input-field"
                >
                  <option value="" disabled>Selecione o cargo</option>
                  {roles.map((role) => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>
              
              {/* Skills */}
              <div>
                <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-1">
                  Habilidades
                </label>
                <select
                  id="skills"
                  name="skills"
                  value={formData.skills}
                  onChange={handleSkillsChange}
                  multiple
                  className="input-field h-36"
                >
                  {skills.map((skill) => (
                    <option key={skill} value={skill}>{skill}</option>
                  ))}
                </select>
              </div>
              
              {/* Area */}
              <div>
                <label htmlFor="area" className="block text-sm font-medium text-gray-700 mb-1">
                  Área
                </label>
                <select
                  id="area"
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  required
                  className="input-field"
                >
                  <option value="" disabled>Selecione a área</option>
                  {areas.map((area) => (
                    <option key={area} value={area}>{area}</option>
                  ))}
                </select>
              </div>
            </div>
          </form>
          
          <div className="mt-8 flex justify-end">
            <button 
              type="submit" 
              onClick={handleSubmit}
              className="btn-primary"
            >
              Adicionar
            </button>
          </div>
        </div>
      </div>
      
      {showSuccessModal && (
        <SuccessModal
          title="Parabéns"
          message="Você adicionou com sucesso um novo funcionário."
          buttonText="Continue"
          onClose={handleModalClose}
        />
      )}
    </>
  );
};

export default NewEmployee;