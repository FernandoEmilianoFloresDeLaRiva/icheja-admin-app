import axios from 'axios';
import { API_BASE_URL } from './consts';

axios.defaults.baseURL = API_BASE_URL;

axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.timeout = 10000; 

axios.interceptors.request.use(
  (config) => {
    console.log('Request URL:', config.url);
    console.log('Full URL:', (config.baseURL || '') + (config.url || ''));
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    console.log('Response status:', response.status);
    return response;
  },
  (error) => {
    console.error('Axios error:', error);
    if (error.response?.status === 401) {
      console.log('Usuario no autenticado');
    }
    return Promise.reject(error);
  }
);

export default axios; 