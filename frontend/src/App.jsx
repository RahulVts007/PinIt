import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { initializeAuth } from './redux/thunks/authThunks';
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
  const [initError, setInitError] = useState(null);
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(state => state.auth);

  useEffect(() => {
    const init = async () => {
      try {
        dispatch(initializeAuth());
        setTimeout(() => setLoading(false), 500);
      } catch (error) {
        console.error('App initialization error:', error);
        setInitError(error.message || 'Failed to initialize app');
        setLoading(false);
      }
    };

    init();
  }, [dispatch]);

  if (initError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Unable to Start App</h1>
          <p className="text-gray-600 mb-4">{initError}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

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

      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
