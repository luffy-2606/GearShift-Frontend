import axios from 'axios';

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

const apiClient = axios.create({
  baseURL: apiBaseUrl || '',
});

// Add authorization interceptor to include JWT token in all requests
apiClient.interceptors.request.use(
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

export default apiClient;

