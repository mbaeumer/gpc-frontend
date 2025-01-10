import axios from 'axios';

export default defineNuxtPlugin(() => {
    const axiosInstance = axios.create({
        baseURL: 'http://localhost:8080', // Base URL for your REST API
    });

    return {
        provide: {
            axios: axiosInstance,
        },
    };
});
