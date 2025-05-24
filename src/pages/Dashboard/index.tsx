import { 
  Users, 
  FileText, 
  LayoutGrid, 
  Building2, 
  ArrowUp 
} from 'lucide-react';
import StatCard from '../../components/Common/StatCard';
import { Table } from '../../components/Common/Table';
import StatusBadge from '../../components/Common/StatusBadge';
import { dashboardStats } from '../../data/mockData';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* Stat cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total de funcionários"
          value={dashboardStats.totalEmployees}
          change={{
            value: dashboardStats.employeeChange,
            text: "a mais que no último trimestre",
            isPositive: true
          }}
          icon={<Users size={24} className="text-white" />}
          color="bg-orange-500"
        />
        
        <StatCard
          title="Total de candidaturas"
          value={dashboardStats.totalFolders}
          change={{
            value: dashboardStats.folderChange,
            text: "a mais que no mês passado",
            isPositive: true
          }}
          icon={<FileText size={24} className="text-white" />}
          color="bg-blue-500"
        />
        
        <StatCard
          title="Total de projetos"
          value={dashboardStats.totalProjects}
          change={{
            value: dashboardStats.projectChange,
            text: "a mais que no último trimestre",
            isPositive: true
          }}
          icon={<LayoutGrid size={24} className="text-white" />}
          color="bg-purple-500"
        />
        
        <StatCard
          title="Total de departamentos"
          value={dashboardStats.totalBuildings}
          change={{
            value: dashboardStats.buildingChange,
            text: "novos departamentos este ano",
            isPositive: true
          }}
          icon={<Building2 size={24} className="text-white" />}
          color="bg-green-500"
        />
      </div>
      
      {/* Tables section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Announcements */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Comunicados</h2>
          <Table
            columns={[
              { header: 'S/N', accessor: (_, index) => index + 1, width: 'w-16' },
              { header: 'Título', accessor: 'title' },
              { header: 'Enviado de', accessor: 'sentFrom' },
              { header: 'Enviado para', accessor: 'sentTo' },
              { header: 'Status', accessor: () => (
                <StatusBadge status="approved" text="Aprovado" />
              )},
            ]}
            data={dashboardStats.announcements}
            keyExtractor={(item) => item.id}
          />
        </div>
        
        {/* Employee List */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Lista de funcionários</h2>
          <Table
            columns={[
              { header: 'S/N', accessor: (_, index) => index + 1, width: 'w-16' },
              { header: 'Nome', accessor: 'name' },
              { header: 'Função', accessor: 'role' },
              { header: 'Designação', accessor: 'area' },
            ]}
            data={dashboardStats.employees}
            keyExtractor={(item) => item.id}
          />
        </div>
        
        {/* Payment receipts */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Comprovantes de pagamento</h2>
          <Table
            columns={[
              { header: 'S/N', accessor: (_, index) => index + 1, width: 'w-16' },
              { header: 'Assunto', accessor: 'subject' },
              { header: 'Data', accessor: 'date' },
              { header: 'Designação', accessor: 'designation' },
              { header: 'Status', accessor: (item) => (
                <StatusBadge status={item.status} />
              )},
            ]}
            data={dashboardStats.paymentReceipts}
            keyExtractor={(item) => item.id}
          />
        </div>
        
        {/* Job Applications */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">{dashboardStats.applications.total} Total de candidaturas</h2>
          <div className="flex items-center justify-center">
            <div className="w-48 h-48 relative">
              {/* Donut chart */}
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {/* Segments */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke="#FFC107"
                  strokeWidth="20"
                  strokeDasharray={`${(dashboardStats.applications.pending / dashboardStats.applications.total) * 251.2} 251.2`}
                  transform="rotate(-90 50 50)"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke="#198754"
                  strokeWidth="20"
                  strokeDasharray={`${(dashboardStats.applications.approved / dashboardStats.applications.total) * 251.2} 251.2`}
                  strokeDashoffset={`${-(dashboardStats.applications.pending / dashboardStats.applications.total) * 251.2}`}
                  transform="rotate(-90 50 50)"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke="#DC3545"
                  strokeWidth="20"
                  strokeDasharray={`${(dashboardStats.applications.rejected / dashboardStats.applications.total) * 251.2} 251.2`}
                  strokeDashoffset={`${-((dashboardStats.applications.pending + dashboardStats.applications.approved) / dashboardStats.applications.total) * 251.2}`}
                  transform="rotate(-90 50 50)"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="30"
                  fill="white"
                />
              </svg>
            </div>
          </div>
          
          {/* Legend */}
          <div className="flex justify-center space-x-8 mt-4">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-warning-500 rounded-full mr-2"></div>
              <span className="text-sm">{dashboardStats.applications.pending} Pendente</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-success-500 rounded-full mr-2"></div>
              <span className="text-sm">{dashboardStats.applications.approved} Aprovado</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-danger-500 rounded-full mr-2"></div>
              <span className="text-sm">{dashboardStats.applications.rejected} Rejeitado</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;