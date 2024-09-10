
import axios from 'axios';

// Backend URL
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// Create an Axios instance.
const axiosInstance = axios.create({
    baseURL: BACKEND_URL
});

// Add a request interceptor to include the token in the Authorization header dynamically
axiosInstance.interceptors.request.use(
    config => {
        const token = localStorage.getItem('userToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default axiosInstance;