import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, Search, Filter, Plus, Pencil, Trash2, Eye } from 'lucide-react';
import { Table } from '../../components/Common/Table';
import ConfirmDialog from '../../components/Common/ConfirmDialog';
import { employees } from '../../data/mockData';

const EmployeeList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filterValue, setFilterValue] = useState('Todos');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);
  const itemsPerPage = 12;
  
  // Filter employees based on search term and filter value
  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          employee.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterValue === 'Todos' || employee.area === filterValue;
    
    return matchesSearch && matchesFilter;
  });
  
  // Paginate employees
  const indexOfLastEmployee = currentPage * itemsPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - itemsPerPage;
  const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);

  const handleDelete = (id: string) => {
    setSelectedEmployee(id);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    // Remove employee from the list
    const index = employees.findIndex(emp => emp.id === selectedEmployee);
    if (index !== -1) {
      employees.splice(index, 1);
    }
    setShowDeleteConfirm(false);
    setSelectedEmployee(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center">
          <Users size={24} className="text-gray-800 mr-2" />
          <h1 className="text-2xl font-bold">Todos os funcionários</h1>
        </div>
        <p className="text-gray-500 mt-1">
          Visualizar, pesquisar e adicionar novos funcionários
        </p>
      </div>
      
      {/* Filter bar */}
      <div className="card flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
        {/* Search */}
        <div className="relative w-full md:w-96">
          <input
            type="text"
            placeholder="Digite o nome de pesquisa"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-10"
          />
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
        
        <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-4">
          {/* Filter dropdown */}
          <div className="relative w-full md:w-48">
            <select
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              className="input-field appearance-none pl-10"
            >
              <option>Todos</option>
              <option>Tecnologia</option>
              <option>Design</option>
              <option>Gestão</option>
            </select>
            <Filter size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
          
          {/* Employee count */}
          <div className="text-gray-700">
            <span className="font-bold">{employees.length}</span> Total de funcionários
          </div>
          
          {/* Add new button */}
          <Link to="/employees/new" className="btn-primary flex items-center">
            <Plus size={18} className="mr-1" />
            Adicionar novo
          </Link>
        </div>
      </div>
      
      {/* Employee table */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Todos os funcionários</h2>
        
        <Table
          columns={[
            { header: 'S/N', accessor: (_, index) => indexOfFirstEmployee + index + 1, width: 'w-16' },
            { header: 'Nome', accessor: 'name' },
            { header: 'Telefone', accessor: 'phone' },
            { header: 'Nascimento', accessor: 'birthDate' },
            { header: 'Ingresso', accessor: 'joinDate' },
            { header: 'Email', accessor: 'email' },
            { header: 'Área', accessor: 'area' },
            { header: 'Cargo', accessor: 'role' },
            { 
              header: 'Ações', 
              accessor: (item) => (
                <div className="flex gap-2">
                  <Link 
                    to={`/employees/view/${item.id}`}
                    className="p-1 text-gray-500 hover:bg-gray-50 rounded"
                  >
                    <Eye size={16} />
                  </Link>
                  <Link 
                    to={`/employees/edit/${item.id}`}
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
              width: 'w-32'
            },
          ]}
          data={currentEmployees}
          keyExtractor={(item) => item.id}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          totalItems={filteredEmployees.length}
          onChangePage={setCurrentPage}
        />
      </div>

      {/* Delete confirmation dialog */}
      {showDeleteConfirm && (
        <ConfirmDialog
          title="Excluir funcionário"
          message="Tem certeza que deseja excluir este funcionário? Esta ação não pode ser desfeita."
          onConfirm={confirmDelete}
          onCancel={() => setShowDeleteConfirm(false)}
        />
      )}
    </div>
  );
};

export default EmployeeList;