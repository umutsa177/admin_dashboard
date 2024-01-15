import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        // Diğer headerlar buraya eklenebilir
    },
});

export default axiosInstance;
