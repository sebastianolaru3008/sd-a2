import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api',
});

axiosInstance.interceptors.request.use(
    async config => {
        const token = localStorage.getItem('accessToken');
        config.headers = {
            Authorization: `${token}`,
            // 'Accept': 'application/json',
            'Content-Type': 'application/json',
        };
        return config;
    },
    error => {
        Promise.reject(error);
    },
);
