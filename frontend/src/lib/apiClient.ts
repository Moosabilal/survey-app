import axios from 'axios';
import { ROUTES } from '../constants/routes';

export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
});

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            if (window.location.pathname !== ROUTES.ADMIN_LOGIN) {
                window.location.href = ROUTES.ADMIN_LOGIN;
            }
        }
        return Promise.reject(error);
    }
);
