import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Send } from 'lucide-react';
import { Table } from '../../components/Common/Table';
import SuccessModal from '../../components/Common/SuccessModal';
import { clients, employees, addBudget } from '../../data/mockData';
import { format } from 'date-fns';

const NewBudget = () => {
  const [formData, setFormData] = useState({
    number: `ORC-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
    description: '',
    estimatedValue: '',
    expectedCosts: '',
    client: '',
    responsibleMember: '',
  });
  
  const [budgetDrafts, setBudgetDrafts] = useState<any[]>([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create new draft
    const newDraft = {
      id: String(Date.now()),
      ...formData,
      estimatedValue: parseFloat(formData.estimatedValue) || 0,
      expectedCosts: parseFloat(formData.expectedCosts) || 0,
      createdAt: format(new Date(), 'dd/MM/yyyy'),
      status: 'pending'
    };
    
    setBudgetDrafts(prev => [...prev, newDraft]);
    
    // Reset form but keep the number
    setFormData({
      number: `ORC-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
      description: '',
      estimatedValue: '',
      expectedCosts: '',
      client: '',
      responsibleMember: '',
    });
  };

  const handleSendBudget = (id: string) => {
    const budgetToSend = budgetDrafts.find(draft => draft.id === id);
    if (budgetToSend) {
      // Add budget to the main list
      addBudget(budgetToSend);
      
      // Remove from drafts
      setBudgetDrafts(prev => prev.filter(draft => draft.id !== id));
      setShowSuccessModal(true);
    }
  };

  const handleModalClose = () => {
    setShowSuccessModal(false);
    navigate('/budget');
  };

  // Format currency for display
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center">
          <Link to="/budget" className="text-primary-500 hover:underline flex items-center mr-4">
            <ArrowLeft size={16} className="mr-1" />
            Voltar
          </Link>
          <div className="flex items-center">
            <CreditCard size={24} className="text-gray-800 mr-2" />
            <div>
              <h1 className="text-2xl font-bold">Criar orçamento</h1>
              <p className="text-gray-500">Criar um novo orçamento de projeto</p>
            </div>
          </div>
        </div>
        
        {/* Create budget form */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-6">
            Por favor, preencha o formulário abaixo para criar um orçamento
          </h2>
          
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Budget number */}
            <div>
              <label htmlFor="number" className="block text-sm font-medium text-gray-700 mb-1">
                Número do orçamento
              </label>
              <input
                type="text"
                id="number"
                name="number"
                value={formData.number}
                onChange={handleChange}
                readOnly
                className="input-field bg-gray-50"
              />
            </div>
            
            {/* Estimated value */}
            <div>
              <label htmlFor="estimatedValue" className="block text-sm font-medium text-gray-700 mb-1">
                Valor estimado (R$)
              </label>
              <input
                type="number"
                id="estimatedValue"
                name="estimatedValue"
                value={formData.estimatedValue}
                onChange={handleChange}
                required
                step="0.01"
                min="0"
                className="input-field"
              />
            </div>
            
            {/* Project description */}
            <div className="md:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Descrição do projeto
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={3}
                className="input-field"
              ></textarea>
            </div>
            
            {/* Expected costs */}
            <div>
              <label htmlFor="expectedCosts" className="block text-sm font-medium text-gray-700 mb-1">
                Custos previstos (R$)
              </label>
              <input
                type="number"
                id="expectedCosts"
                name="expectedCosts"
                value={formData.expectedCosts}
                onChange={handleChange}
                required
                step="0.01"
                min="0"
                className="input-field"
              />
            </div>
            
            {/* Associated client */}
            <div>
              <label htmlFor="client" className="block text-sm font-medium text-gray-700 mb-1">
                Cliente associado
              </label>
              <select
                id="client"
                name="client"
                value={formData.client}
                onChange={handleChange}
                required
                className="input-field"
              >
                <option value="" disabled>Selecione o cliente</option>
                {clients.map((client) => (
                  <option key={client} value={client}>{client}</option>
                ))}
              </select>
            </div>
            
            {/* Responsible member */}
            <div>
              <label htmlFor="responsibleMember" className="block text-sm font-medium text-gray-700 mb-1">
                Membro responsável
              </label>
              <select
                id="responsibleMember"
                name="responsibleMember"
                value={formData.responsibleMember}
                onChange={handleChange}
                required
                className="input-field"
              >
                <option value="" disabled>Selecione o responsável</option>
                {employees.map((employee) => (
                  <option key={employee.id} value={employee.name}>{employee.name}</option>
                ))}
              </select>
            </div>
            
            <div className="md:col-span-2 flex justify-end">
              <button type="submit" className="btn-primary">
                Criar orçamento
              </button>
            </div>
          </form>
        </div>
        
        {/* Budget request table */}
        {budgetDrafts.length > 0 && (
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Solicitação de orçamento</h2>
            
            <Table
              columns={[
                { header: 'S/N', accessor: (_, index) => index + 1, width: 'w-16' },
                { header: 'Orçamento nº', accessor: 'number' },
                { header: 'Descrição do projeto', accessor: 'description' },
                { 
                  header: 'Valor estimado (R$)', 
                  accessor: (item) => formatCurrency(item.estimatedValue)
                },
                { header: 'Data de criação', accessor: 'createdAt' },
                { 
                  header: 'Ação', 
                  accessor: (item) => (
                    <button
                      onClick={() => handleSendBudget(item.id)}
                      className="btn-primary flex items-center py-1 px-3"
                    >
                      <Send size={14} className="mr-1" />
                      Enviar
                    </button>
                  ),
                  width: 'w-24'
                },
              ]}
              data={budgetDrafts}
              keyExtractor={(item) => item.id}
            />
          </div>
        )}
      </div>
      
      {showSuccessModal && (
        <SuccessModal
          title="Parabéns"
          message="Seu orçamento foi enviado com sucesso."
          buttonText="Ok"
          onClose={handleModalClose}
        />
      )}
    </>
  );
};

export default NewBudget;