import axios from "axios";
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
    // Handle the error
    return Promise.reject(error);
});
