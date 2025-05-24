import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

// Authentication
import SplashScreen from './pages/SplashScreen';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import ForgotPassword from './pages/Auth/ForgotPassword';
import VerifyCode from './pages/Auth/VerifyCode';
import ResetPassword from './pages/Auth/ResetPassword';

// Main App
import MainLayout from './components/Layout/MainLayout';
import Dashboard from './pages/Dashboard';
import EmployeeList from './pages/Employees/EmployeeList';
import NewEmployee from './pages/Employees/NewEmployee';
import BudgetList from './pages/Budget/BudgetList';
import NewBudget from './pages/Budget/NewBudget';

// Context
import { AuthProvider } from './context/AuthContext';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Auth routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-code" element={<VerifyCode />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          
          {/* Protected routes */}
          <Route element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="employees" element={<EmployeeList />} />
            <Route path="employees/new" element={<NewEmployee />} />
            <Route path="budget" element={<BudgetList />} />
            <Route path="budget/new" element={<NewBudget />} />
          </Route>
          
          {/* Redirect to login if no route matches */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;