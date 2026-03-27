import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // 1. Check for token to protect the route
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/'); // Kick them out if no token exists
      return;
    }

    // 2. Retrieve persisted user info
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [navigate]);

  const handleLogout = () => {
    // Clear session storage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // Redirect to login
    navigate('/');
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Welcome to your Dashboard!</h2>
      <p>Logged in as: <strong>{user.email}</strong></p>
      <button onClick={handleLogout} style={{ marginTop: '20px', padding: '10px 20px' }}>
        Logout
      </button>
    </div>
  );
}