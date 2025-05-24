export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  birthDate: string;
  joinDate: string;
  area: string;
  role: string;
  gender: string;
  skills: string[];
  avatar?: string;
}

export interface Budget {
  id: string;
  number: string;
  description: string;
  estimatedValue: number;
  expectedCosts: number;
  client: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  responsibleMember?: string;
}

export interface Announcement {
  id: string;
  title: string;
  sentFrom: string;
  sentTo: string;
  date: string;
}

export interface PaymentReceipt {
  id: string;
  subject: string;
  date: string;
  designation: string;
  status: 'pending' | 'approved';
}

export interface JobApplication {
  id: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface DashboardStats {
  totalEmployees: number;
  totalFolders: number;
  totalProjects: number;
  totalBuildings: number;
  employeeChange: number;
  folderChange: number;
  projectChange: number;
  buildingChange: number;
  applications: {
    total: number;
    pending: number;
    approved: number;
    rejected: number;
  };
  announcements: Announcement[];
  paymentReceipts: PaymentReceipt[];
  employees: Employee[];
}