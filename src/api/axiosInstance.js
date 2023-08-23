import axios from 'axios';

export const createAxios = axios.create({
    baseURL: 'http://localhost:5000',
    timeout: 10000,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});