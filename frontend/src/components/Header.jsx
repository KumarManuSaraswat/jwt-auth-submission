import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header style={{ padding: '10px 20px', background: '#eee', display: 'flex', justifyContent: 'space-between' }}>
      <h3>My App</h3>
      <div>
        {isAuthenticated ? (
          <>
            <span style={{ marginRight: '15px' }}>Hello, {user.email}</span>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <span>Not logged in</span>
        )}
      </div>
    </header>
  );
}