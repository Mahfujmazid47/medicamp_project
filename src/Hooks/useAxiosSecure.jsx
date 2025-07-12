// useAxiosSecure.js
import axios from 'axios';
import { useNavigate } from 'react-router';
import useAuth from './useAuth'; // তোমার custom hook

const useAxiosSecure = () => {
    const { logOut } = useAuth();
    const navigate = useNavigate();

    const axiosSecure = axios.create({
        baseURL: 'http://localhost:3000', // 🔁 Adjust to your backend
    });

    // Request Interceptor
    axiosSecure.interceptors.request.use(
        config => {
            const token = localStorage.getItem('token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        error => Promise.reject(error)
    );

    // Response Interceptor
    axiosSecure.interceptors.response.use(
        response => response,
        error => {
            const status = error.response?.status;
            if (status === 401 || status === 403) {
                logOut().then(() => {
                    navigate('/auth/login');
                });
            }
            return Promise.reject(error);
        }
    );

    return axiosSecure;
};

export default useAxiosSecure;
