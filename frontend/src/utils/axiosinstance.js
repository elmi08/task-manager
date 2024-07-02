import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: "http://localhost:8000",
    headers: {
        'Content-Type': 'application/json',
        'BaseUrl': "http://localhost:8000"
    },
})

axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("token");
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        console.log('Request Config:', config);
        return config;
    },
    (error) => {
        console.log('Request Config:', config);
        console.error('Error:', error);
        return Promise.reject(error);
    }
)


export default axiosInstance;
