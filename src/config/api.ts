import axios from "axios";
import { useNavigate } from 'react-router-dom';
// import i18n from "../utils/i18n.ts";

// @ts-ignore
export const baseUrl = `${import.meta.env.VITE_BACKEND_HOST}/api`;

export const http = axios.create({
    baseURL: baseUrl,
    headers: {
        Accept: "application/json",
    },
})

http.interceptors.request.use((config) => {
    const authData = localStorage.getItem('authenticate');
    if (authData) {
        try {
            const { token } = JSON.parse(authData);
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
        } catch (error) {
            console.error('Error parsing authentication data:', error);
        }
    }
    return config;
}, (error) => {
    console.error("error - 29", error);
    if (error.response?.status === 401) {
        const navigate = useNavigate();
        navigate("/login");
    }
    return Promise.reject(error);
});
