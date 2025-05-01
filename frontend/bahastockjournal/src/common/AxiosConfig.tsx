import axios from "axios";
import { checkTokenExpiration, refreshToken } from "./ChecksToken";

const api = axios.create({
    baseURL: 'http://localhost:5000',
});

api.interceptors.request.use(
    async (config) => {
        const token = localStorage.getItem('token');

        if (!token) return config;

        const isTokenExpired = checkTokenExpiration();
        if (isTokenExpired) {
            await refreshToken();
        }

        const newToken = localStorage.getItem('token');
        if (newToken) {
            config.headers.Authorization = `Bearer ${newToken}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
