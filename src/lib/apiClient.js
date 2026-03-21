import axios from 'axios';

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

const apiClient = axios.create({
  baseURL: apiBaseUrl || '',
});

export default apiClient;

