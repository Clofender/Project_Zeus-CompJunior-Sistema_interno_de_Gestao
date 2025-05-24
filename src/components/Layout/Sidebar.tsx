import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Users, 
  FileText, 
  CreditCard,
  MessageSquare,
  FileCheck,
  Wrench,
  Truck,
  Package,
  Bell,
  GraduationCap,
  ShoppingCart,
  LogOut 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import comp_logo from '../../assets/compjunior.png';

const Sidebar = () => {
  const location = useLocation();
  const { logout } = useAuth();
  
  const menuItems = [
    { 
      path: '/', 
      label: 'Dashboard', 
      icon: <Home size={18} /> 
    },
    { 
      path: '/employees', 
      label: 'Funcionários', 
      icon: <Users size={18} /> 
    },
    { 
      path: '/payment-receipts', 
      label: 'Comprovantes de pagamento', 
      icon: <FileText size={18} /> 
    },
    { 
      path: '/received-payments', 
      label: 'Pagamentos Recebidos', 
      icon: <CreditCard size={18} /> 
    },
    { 
      path: '/announcements', 
      label: 'Comunicados', 
      icon: <MessageSquare size={18} /> 
    },
    { 
      path: '/circulars', 
      label: 'Circulares', 
      icon: <FileCheck size={18} /> 
    },
    { 
      path: '/maintenance', 
      label: 'Manutenção', 
      icon: <Wrench size={18} /> 
    },
    { 
      path: '/logistics', 
      label: 'Logística', 
      icon: <Truck size={18} /> 
    },
    { 
      path: '/budget', 
      label: 'Orçamento', 
      icon: <CreditCard size={18} /> 
    },
    { 
      path: '/inventory', 
      label: 'Estoques e inventário', 
      icon: <Package size={18} /> 
    },
    { 
      path: '/notifications', 
      label: 'Notificações', 
      icon: <Bell size={18} /> 
    },
    { 
      path: '/training', 
      label: 'Capacitação', 
      icon: <GraduationCap size={18} /> 
    },
    { 
      path: '/acquisitions', 
      label: 'Aquisições', 
      icon: <ShoppingCart size={18} /> 
    },
  ];

  const isActive = (path: string) => {
    return location.pathname === path || 
      (path !== '/' && location.pathname.startsWith(path));
  };

  return (
    <aside className="w-64 border-r border-gray-200 bg-white h-screen overflow-y-auto">
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="p-6">
          <div className="flex items-center">
            <img 
              src={comp_logo} 
              alt="CompJr Logo" 
              className="h-8 w-8"
            />
            <div className="ml-2">
              <div className="font-bold text-gray-900">CompJR</div>
              <div className="text-xs text-gray-500">Sistema ERP</div>
            </div>
          </div>
        </div>

        {/* Nav items */}
        <nav className="flex-1 py-4 px-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`sidebar-item ${isActive(item.path) ? 'active' : ''}`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
        
        {/* Logout */}
        <div className="py-4 px-4 border-t border-gray-200">
          <button
            onClick={logout}
            className="sidebar-item w-full text-left hover:bg-red-50"
          >
            <LogOut size={18} className="text-red-500" />
            <span className="text-red-500">Sair</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;