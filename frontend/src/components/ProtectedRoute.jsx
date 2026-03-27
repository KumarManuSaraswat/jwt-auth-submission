import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  // 1. Handle loading state
  if (loading) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>Checking authentication...</div>;
  }

  // 2. Redirect unauthenticated users to login
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // 3. Render the protected component if logged in
  return children;
}