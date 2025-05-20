import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './stores/authStore';
import Layout from './components/layout/Layout';
import LoadingScreen from './components/common/LoadingScreen';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/Dashboard';
import OrganizationPage from './pages/OrganizationPage';
import JoinOrganization from './pages/JoinOrganization';
import CreateOrganization from './pages/CreateOrganization';
import UserProfile from './pages/UserProfile';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, initializeAuth } = useAuthStore();

  useEffect(() => {
    // Simulate authentication initialization
    const init = async () => {
      await initializeAuth();
      // Add artificial delay to showcase loading screen
      setTimeout(() => setLoading(false), 2000);
    };

    init();
  }, [initializeAuth]);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Routes>
      <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />
      <Route path="/register" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Register />} />
      
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/organization/:id" element={<OrganizationPage />} />
          <Route path="/join/:inviteCode" element={<JoinOrganization />} />
          <Route path="/create-organization" element={<CreateOrganization />} />
          <Route path="/profile" element={<UserProfile />} />
        </Route>
      </Route>

      <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;