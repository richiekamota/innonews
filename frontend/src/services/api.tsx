import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:8086',
    withCredentials: true,
    withXSRFToken: true,
});

export default apiClient;
