import axios from 'axios';

const API = axios.create({
    // baseURL: 'http://localhost:8000/api',
    baseURL: 'https://cabgo.onrender.com/api',
});

// This is the "Integration" part: it attaches the JWT from localStorage
API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

export default API;