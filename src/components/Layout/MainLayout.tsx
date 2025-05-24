import { Outlet, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Sidebar from './Sidebar';
import Header from './Header';

const MainLayout = () => {
  const { isAuthenticated } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>
      
      {/* Mobile Sidebar */}
      <div className={`md:hidden sidebar ${isSidebarOpen ? 'sidebar-open' : ''}`}>
        <Sidebar />
      </div>
      
      {/* Mobile sidebar overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        />
      )}
      
      {/* Mobile sidebar trigger */}
      <div className="md:hidden fixed bottom-4 right-4 z-50">
        <button 
          className="p-4 bg-primary-500 text-white rounded-full shadow-lg"
          onClick={toggleSidebar}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header />
        
        {/* Content area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <Outlet />
          
          {/* Footer */}
          <footer className="mt-10 py-4 text-center text-gray-500 text-sm">
            <p>Copyright © {new Date().getFullYear()} CompJr. Todos os direitos reservados</p>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;