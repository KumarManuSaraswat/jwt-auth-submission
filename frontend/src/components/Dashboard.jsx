import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  // Bring in user data and auth status from context
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Protect the route: if not authenticated, kick them to login
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  if (!user) return null;

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Dashboard</h2>
      <p>Welcome to the protected area!</p>
      <p>Your stored email is: <strong>{user.email}</strong></p>
    </div>
  );
}