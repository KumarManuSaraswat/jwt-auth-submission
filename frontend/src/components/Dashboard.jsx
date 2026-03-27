
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  // Notice we removed the useEffect and useNavigate! 
  // ProtectedRoute handles the security now.
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Dashboard</h2>
      <p>Welcome to the protected area!</p>
      <p>Your stored email is: <strong>{user.email}</strong></p>
    </div>
  );
}