import axios from 'axios';

export const axiosConfig = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL ?? 'http://localhost:3001',
});
