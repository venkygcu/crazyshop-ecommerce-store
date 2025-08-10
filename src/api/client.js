import axios from 'axios';

const API_VERSION = process.env.REACT_APP_API_VERSION || 'v1';
const API_BASE = process.env.REACT_APP_API_BASE_URL
  ? `${process.env.REACT_APP_API_BASE_URL}/${API_VERSION}`
  : '/api';

const client = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

client.interceptors.request.use((config) => {
  try {
    const token = localStorage.getItem('authToken');
    if (token) config.headers.Authorization = `Bearer ${token}`;
  } catch (e) {
    // no-op
  }
  return config;
});

client.interceptors.response.use(
  (resp) => resp,
  (error) => {
    if (error?.response?.status === 401) {
      // Optionally handle global unauthorized
      // e.g., redirect to login or clear token
      // localStorage.removeItem('authToken');
    }
    return Promise.reject(error);
  }
);

export default client;
