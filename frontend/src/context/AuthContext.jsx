import { createContext, useState, useEffect, useContext } from 'react';
import api from '../utils/api';

// 1. Create the Context
const AuthContext = createContext();

// 2. Create the Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true); // Handles initial load

  // Restore auth state on page refresh
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setLoading(false); // Finished checking storage
  }, []);

  // Centralized Login Logic
  const login = async (email, password) => {
    try {
      // Look how clean this is now! No headers, no JSON.stringify
      const response = await api.post('/login', { email, password });
      
      // Axios automatically parses JSON into the `.data` property
      const data = response.data; 

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      setToken(data.token);
      setUser(data.user);
    } catch (error) {
      // Axios puts server error messages inside error.response.data
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  };

  // Centralized Logout Logic
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  // Helper to check auth status
  const isAuthenticated = !!user;

  return (
    // 1. Add `loading` to the value object
    <AuthContext.Provider value={{ user, token, isAuthenticated, login, logout, loading }}>
      {/* 2. Render children immediately so our ProtectedRoute can show the loading text */}
      {children}
    </AuthContext.Provider>
  );
};

// 3. Create a custom hook for easy access
export const useAuth = () => {
  return useContext(AuthContext);
};