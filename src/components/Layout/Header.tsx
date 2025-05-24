import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Bell, User, Settings, LogOut, ChevronDown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const location = useLocation();

  const today = format(
    new Date(),
    "EEEE, d 'de' MMMM 'de' yyyy",
    { locale: ptBR }
  );

  // Capitalize first letter
  const formattedToday = today.charAt(0).toUpperCase() + today.slice(1);

  const isDashboard = location.pathname === '/';

  return (
    <header className="bg-white border-b border-gray-200 py-4 px-6">
      <div className="flex justify-between items-center">
        {isDashboard ? (
          <div>
            <h2 className="text-xl font-semibold">Bem-vindo, Sr. {user?.name}</h2>
            <p className="text-sm text-gray-500">Hoje é {formattedToday}.</p>
          </div>
        ) : (
          <div>
            { }
          </div>
        )}

        <div className="flex items-center space-x-4">
          {/* Notification icon */}
          <button className="p-2 rounded-full hover:bg-gray-100">
            <Bell size={20} className="text-gray-600" />
          </button>

          {/* User profile dropdown */}
          <div className="relative">
            <button
              className="flex items-center space-x-2"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="h-8 w-8 rounded-full"
                  />
                ) : (
                  <span className="text-primary-600 font-medium">
                    {user?.name.charAt(0)}
                  </span>
                )}
              </div>
              <div className="text-left">
                <p className="font-medium text-sm">{user?.name}</p>
                <p className="text-xs text-gray-500">{user?.role}</p>
              </div>
              <ChevronDown size={16} className="text-gray-500" />
            </button>

            {/* Dropdown menu */}
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-10">
                <button className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                  <User size={16} />
                  <span>Perfil</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                  <Settings size={16} />
                  <span>Configurações</span>
                </button>
                <hr className="my-1 border-gray-200" />
                <button
                  onClick={logout}
                  className="flex items-center space-x-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50 w-full text-left"
                >
                  <LogOut size={16} />
                  <span>Sair</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;