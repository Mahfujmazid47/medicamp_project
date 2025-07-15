// useAxiosSecure.js
import axios from 'axios';
import { useNavigate } from 'react-router';
import useAuth from './useAuth'; // তোমার custom hook
import Swal from 'sweetalert2';

const useAxiosSecure = () => {
    const { logOut } = useAuth();
    const navigate = useNavigate();

    const axiosSecure = axios.create({
         baseURL: import.meta.env.VITE_API_BASE_URL, // 🔁 Adjust to your backend
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
                Swal.fire({
                    title: 'Access Denied!',
                    text: 'Your session has expired or you are not authorized. Please login again.',
                    icon: 'warning',
                    confirmButtonText: 'Login',
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                }).then(() => {
                    logOut().then(() => {
                        navigate('/auth/login');
                    });
                });
            }
            return Promise.reject(error);
        }
    );

    return axiosSecure;
};

export default useAxiosSecure;
