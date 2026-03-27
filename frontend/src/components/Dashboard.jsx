import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';

export default function Dashboard() {
  const { user } = useAuth();
  const [secretMessage, setSecretMessage] = useState('');

  useEffect(() => {
    // Let's fetch protected data when the dashboard loads
    const fetchProtectedData = async () => {
      try {
        // We don't need to attach a token here! api.js does it for us.
        const response = await api.get('/me'); 
        setSecretMessage(response.data.message);
      } catch (error) {
        console.error("Failed to fetch protected data", error);
      }
    };

    if (user) {
      fetchProtectedData();
    }
  }, [user]);

  if (!user) return null;

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Dashboard</h2>
      <p>Welcome to the protected area!</p>
      <p>Your stored email is: <strong>{user.email}</strong></p>
      
      {/* Display the data fetched securely from the backend */}
      <div style={{ marginTop: '20px', padding: '15px', background: '#e0ffe0', borderRadius: '5px' }}>
        <strong>Backend says:</strong> {secretMessage ? secretMessage : 'Loading protected data...'}
      </div>
    </div>
  );
}