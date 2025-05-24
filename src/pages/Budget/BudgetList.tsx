import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  CreditCard, 
  DollarSign, 
  TrendingUp, 
  BarChart, 
  PieChart,
  Pencil,
  Trash2
} from 'lucide-react';
import { Table } from '../../components/Common/Table';
import StatusBadge from '../../components/Common/StatusBadge';
import ConfirmDialog from '../../components/Common/ConfirmDialog';
import { budgets, annualBudgetTotal } from '../../data/mockData';

const BudgetList = () => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState<string | null>(null);
  
  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  // Calculate budget metrics
  const usedBudget = budgets.reduce((sum, budget) => 
    budget.status === 'approved' ? sum + budget.expectedCosts : sum, 0
  );
  
  const usedPercentage = Math.round((usedBudget / annualBudgetTotal) * 100);

  const handleDelete = (id: string) => {
    setSelectedBudget(id);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    // Remove budget from the list
    const index = budgets.findIndex(budget => budget.id === selectedBudget);
    if (index !== -1) {
      budgets.splice(index, 1);
    }
    setShowDeleteConfirm(false);
    setSelectedBudget(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center">
          <CreditCard size={24} className="text-gray-800 mr-2" />
          <h1 className="text-2xl font-bold">Orçamento</h1>
        </div>
        <p className="text-gray-500 mt-1">
          Visualize, crie e envie solicitação de orçamento.
        </p>
      </div>
      
      {/* Stat cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold mb-1">{formatCurrency(annualBudgetTotal)}</h3>
            <p className="text-sm text-gray-500 mb-2">Orçamento anual total</p>
            <p className="text-xs">
              <span className="text-success-500">↑ 5%</span> a mais que no ano passado
            </p>
          </div>
          <div className="p-3 rounded-lg bg-blue-500/10">
            <DollarSign size={24} className="text-blue-500" />
          </div>
        </div>
        
        <div className="card flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold mb-1">{formatCurrency(usedBudget)}</h3>
            <p className="text-sm text-gray-500 mb-2">Quantidade usada</p>
            <p className="text-xs">
              <span className="text-success-500">↑ 3%</span> a mais que no ano passado
            </p>
          </div>
          <div className="p-3 rounded-lg bg-orange-500/10">
            <TrendingUp size={24} className="text-orange-500" />
          </div>
        </div>
        
        <div className="card flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold mb-1">{formatCurrency(annualBudgetTotal - usedBudget)}</h3>
            <p className="text-sm text-gray-500 mb-2">Saldo orçamental total</p>
            <p className="text-xs">
              <span className="text-success-500">↑ 7%</span> a mais que no ano passado
            </p>
          </div>
          <div className="p-3 rounded-lg bg-purple-500/10">
            <BarChart size={24} className="text-purple-500" />
          </div>
        </div>
        
        <div className="card flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold mb-1">{usedPercentage}%</h3>
            <p className="text-sm text-gray-500 mb-2">Orçamento utilizado</p>
            <p className="text-xs">
              <span className="text-success-500">↑ 10%</span> a mais que no ano passado
            </p>
          </div>
          <div className="p-3 rounded-lg bg-green-500/10">
            <PieChart size={24} className="text-green-500" />
          </div>
        </div>
      </div>
      
      {/* Create budget button */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Crie um orçamento</h2>
        <Link to="/budget/new" className="btn-primary inline-block">
          Criar orçamento
        </Link>
      </div>
      
      {/* Budget history table */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Histórico do orçamento</h2>
        
        <Table
          columns={[
            { header: 'S/N', accessor: (_, index) => index + 1, width: 'w-16' },
            { header: 'Orçamento nº', accessor: 'number' },
            { header: 'Descrição do projeto', accessor: 'description' },
            { 
              header: 'Valor estimado (R$)', 
              accessor: (item) => formatCurrency(item.estimatedValue)
            },
            { 
              header: 'Custos previstos (R$)', 
              accessor: (item) => formatCurrency(item.expectedCosts)
            },
            { header: 'Cliente associado', accessor: 'client' },
            { 
              header: 'Status', 
              accessor: (item) => <StatusBadge status={item.status} />
            },
            { 
              header: 'Ações', 
              accessor: (item) => (
                <div className="flex gap-2">
                  <Link 
                    to={`/budget/edit/${item.id}`}
                    className="p-1 text-primary-500 hover:bg-primary-50 rounded"
                  >
                    <Pencil size={16} />
                  </Link>
                  <button 
                    onClick={() => handleDelete(item.id)}
                    className="p-1 text-danger-500 hover:bg-danger-50 rounded"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ),
              width: 'w-24'
            },
          ]}
          data={budgets}
          keyExtractor={(item) => item.id}
        />
      </div>

      {/* Delete confirmation dialog */}
      {showDeleteConfirm && (
        <ConfirmDialog
          title="Excluir orçamento"
          message="Tem certeza que deseja excluir este orçamento? Esta ação não pode ser desfeita."
          onConfirm={confirmDelete}
          onCancel={() => setShowDeleteConfirm(false)}
        />
      )}
    </div>
  );
};

export default BudgetList;