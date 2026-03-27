import axios from 'axios';

// 1. Configure the Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// 2. Request Interceptor: Attach the token automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 3. Response Interceptor: Handle 401 Unauthorized globally
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized access - redirecting to login');
      // Clear storage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // Force redirect to login page
      window.location.href = '/'; 
    }
    return Promise.reject(error);
  }
);

export default api;