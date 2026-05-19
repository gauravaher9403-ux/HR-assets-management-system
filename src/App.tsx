import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useStore } from './lib/store';
import Layout from './components/Layout';
import Login from './components/Login';
import Dashboard from './pages/Dashboard';
import Employees from './pages/Employees';
import Assets from './pages/Assets';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import UserManagement from './pages/UserManagement';

function App() {
  const { currentUser, initialize, initializing } = useStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  if (initializing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-lg font-medium text-gray-700">Loading app...</div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    );
  }

  const isAdmin = currentUser.role === 'admin';
  const isHR = currentUser.role === 'hr';

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          {(isAdmin || isHR) && <Route path="/employees" element={<Employees />} />}
          <Route path="/assets" element={<Assets />} />
          {(isAdmin || isHR) && <Route path="/reports" element={<Reports />} />}
          {(isAdmin || isHR) && <Route path="/user-management" element={<UserManagement />} />}
          {isAdmin && <Route path="/settings" element={<Settings />} />}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
