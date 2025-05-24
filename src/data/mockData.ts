import { DashboardStats, Employee, Budget } from '../types';
import { addDays, format, subDays, subMonths } from 'date-fns';

// Helper to format dates consistently
const formatDate = (date: Date): string => {
  return format(date, 'dd/MM/yyyy');
};

// Current date for reference
const today = new Date();

// Mock dashboard stats
export const dashboardStats: DashboardStats = {
  totalEmployees: 250,
  totalFolders: 500,
  totalProjects: 20,
  totalBuildings: 15,
  employeeChange: 12,
  folderChange: 86,
  projectChange: 5,
  buildingChange: 4,
  applications: {
    total: 500,
    pending: 80,
    approved: 370,
    rejected: 50,
  },
  announcements: [
    {
      id: '1',
      title: 'Reunião Trimestral',
      sentFrom: 'Diretoria',
      sentTo: 'Todos',
      date: formatDate(subDays(today, 2)),
    },
    {
      id: '2',
      title: 'Processo seletivo interno',
      sentFrom: 'RH',
      sentTo: 'Todos',
      date: formatDate(subDays(today, 4)),
    },
    {
      id: '3',
      title: 'Confraternização de equipe',
      sentFrom: 'RH',
      sentTo: 'Todos',
      date: formatDate(subDays(today, 7)),
    },
  ],
  paymentReceipts: [
    {
      id: '1',
      subject: 'Salário Abril/2025',
      date: formatDate(subMonths(today, 1)),
      designation: 'RH',
      status: 'approved',
    },
    {
      id: '2',
      subject: 'Bônus Q1/2025',
      date: formatDate(subMonths(today, 2)),
      designation: 'Financeiro',
      status: 'approved',
    },
    {
      id: '3',
      subject: 'Reembolso viagem',
      date: formatDate(subDays(today, 5)),
      designation: 'Financeiro',
      status: 'pending',
    },
  ],
  employees: [
    {
      id: '1',
      name: 'Maria Silva',
      email: 'maria.silva@compjr.com',
      role: 'Desenvolvedor',
      phone: '(31) 99999-8888',
      birthDate: formatDate(new Date(1996, 3, 15)),
      joinDate: formatDate(new Date(2023, 6, 10)),
      area: 'Tecnologia',
      gender: 'Feminino',
      skills: ['React', 'TypeScript', 'Node.js'],
    },
    {
      id: '2',
      name: 'Carlos Mendes',
      email: 'carlos.mendes@compjr.com',
      role: 'Designer',
      phone: '(31) 98888-7777',
      birthDate: formatDate(new Date(1998, 7, 25)),
      joinDate: formatDate(new Date(2024, 1, 5)),
      area: 'Design',
      gender: 'Masculino',
      skills: ['UI/UX', 'Figma', 'Adobe XD'],
    },
    {
      id: '3',
      name: 'João Pereira',
      email: 'joao.pereira@compjr.com',
      role: 'Gerente de Projetos',
      phone: '(31) 97777-6666',
      birthDate: formatDate(new Date(1994, 11, 3)),
      joinDate: formatDate(new Date(2022, 9, 15)),
      area: 'Gestão',
      gender: 'Masculino',
      skills: ['Scrum', 'Liderança', 'Orçamentos'],
    },
  ],
};

// Mock employees for the employee list
let employees: Employee[] = [
  ...dashboardStats.employees,
  ...Array(10).fill(null).map((_, index) => ({
    id: `${index + 4}`,
    name: `Funcionário ${index + 4}`,
    email: `funcionario${index + 4}@compjr.com`,
    phone: `(31) 9${6666 - index}-${5555 - index}`,
    birthDate: formatDate(new Date(1990 + index, index % 12, (index % 28) + 1)),
    joinDate: formatDate(subMonths(today, index + 1)),
    area: index % 3 === 0 ? 'Tecnologia' : index % 3 === 1 ? 'Design' : 'Gestão',
    role: index % 4 === 0 ? 'Desenvolvedor' : index % 4 === 1 ? 'Designer' : index % 4 === 2 ? 'Analista' : 'Gerente',
    gender: index % 2 === 0 ? 'Masculino' : 'Feminino',
    skills: ['Skill 1', 'Skill 2', 'Skill 3'],
  })),
];

// Mock budgets for the budget list
let budgets: Budget[] = [
  {
    id: '1',
    number: 'ORC-2025-001',
    description: 'Website institucional',
    estimatedValue: 15000,
    expectedCosts: 9000,
    client: 'Empresa ABC',
    status: 'approved',
    createdAt: formatDate(subDays(today, 30)),
    responsibleMember: 'João Pereira',
  },
  {
    id: '2',
    number: 'ORC-2025-002',
    description: 'Aplicativo mobile',
    estimatedValue: 28000,
    expectedCosts: 18000,
    client: 'Startup XYZ',
    status: 'pending',
    createdAt: formatDate(subDays(today, 15)),
    responsibleMember: 'Maria Silva',
  },
  {
    id: '3',
    number: 'ORC-2025-003',
    description: 'Sistema de gestão',
    estimatedValue: 45000,
    expectedCosts: 30000,
    client: 'Corporação 123',
    status: 'rejected',
    createdAt: formatDate(subDays(today, 7)),
    responsibleMember: 'Carlos Mendes',
  },
  {
    id: '4',
    number: 'ORC-2025-004',
    description: 'E-commerce',
    estimatedValue: 32000,
    expectedCosts: 22000,
    client: 'Loja Virtual',
    status: 'approved',
    createdAt: formatDate(subDays(today, 45)),
    responsibleMember: 'João Pereira',
  },
  {
    id: '5',
    number: 'ORC-2025-005',
    description: 'Dashboard analytics',
    estimatedValue: 18000,
    expectedCosts: 11000,
    client: 'Data Insights',
    status: 'pending',
    createdAt: formatDate(subDays(today, 3)),
    responsibleMember: 'Maria Silva',
  },
];

// Calculate total annual budget
export const annualBudgetTotal = budgets.reduce((sum, budget) => {
  return budget.status === 'approved' ? sum + budget.estimatedValue : sum;
}, 0);

// Users for authentication
export const users = [
  {
    id: '1',
    name: 'João Jão',
    email: 'joao.jao@compjr.com',
    password: 'senha123',
    role: 'RH',
    avatar: '/assets/images/avatar.jpg',
  },
];

export const areas = [
  'Tecnologia',
  'Design',
  'Marketing',
  'Gestão',
  'Financeiro',
  'RH',
  'Comercial',
];

export const roles = [
  'Desenvolvedor',
  'Designer',
  'Analista',
  'Gerente',
  'Diretor',
  'Estagiário',
  'Trainee',
];

export const skills = [
  'React',
  'TypeScript',
  'Node.js',
  'UI/UX',
  'Figma',
  'Adobe XD',
  'Scrum',
  'Liderança',
  'Orçamentos',
  'Marketing Digital',
  'SEO',
  'Social Media',
  'Vendas',
  'Negociação',
  'Gestão de Pessoas',
];

export const clients = [
  'Empresa ABC',
  'Startup XYZ',
  'Corporação 123',
  'Loja Virtual',
  'Data Insights',
  'Tech Solutions',
  'Marketing Agency',
  'Digital Commerce',
];

// Helper functions to add new items
export const addEmployee = (employee: Employee) => {
  const newEmployee = {
    ...employee,
    id: String(employees.length + 1),
  };
  employees = [...employees, newEmployee];
  return newEmployee;
};

export const addBudget = (budget: Budget) => {
  const newBudget = {
    ...budget,
    id: String(budgets.length + 1),
  };
  budgets = [...budgets, newBudget];
  return newBudget;
};

export { employees, budgets }