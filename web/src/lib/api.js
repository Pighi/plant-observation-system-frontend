import axios from 'axios';

export function apiClient(token) {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000',
    headers: token ? { Authorization: `Bearer ${token}` } : {}
  });
  return instance;
}
