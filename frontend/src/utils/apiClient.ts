import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000',
  withCredentials: false,
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    // Basic logging; extend for toast notifications
    if (error.response) {
      console.error('API Error:', error.response.status, error.response.data);
    }
    return Promise.reject(error);
  }
);

export interface Paginated<T> { items: T[]; total: number }
