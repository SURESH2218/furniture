import axios from 'axios';
import { store } from '../redux/store';
import { logout } from '../redux/slices/authSlice';

const API_URL = 'http://localhost:3000';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    console.log('Request Interceptor:', config.url);
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => {
    console.log('Response Interceptor:', response.config.url, response.status);
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        console.log('Attempting to refresh token');
        const refreshResponse = await axios.get(
          `${API_URL}/users/refresh-token`,
          {
            withCredentials: true,
          }
        );

        console.log('Token Refresh Response:', refreshResponse.data);
        return api(originalRequest);
      } catch (refreshError) {
        console.error('Token Refresh Failed', refreshError);
        store.dispatch(logout());
        window.location.href = '/auth';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
