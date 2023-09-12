import axios from 'axios';

const baseURL = 'http://localhost:4000';
const axiosClient = axios.create({
    baseURL,
    withCredentials: true
});

axiosClient.interceptors.request.use(
    config => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken)
            config.headers.authorization = `Bearer ${accessToken}`;
        return config;
    },
    error => {
        Promise.reject(error.response || error.message);
    }
);

axiosClient.interceptors.response.use(
    response => response,
    error => {
        let originalRequest = error.config;
        let store = JSON.parse(localStorage.getItem('persist:root'));
        let refreshToken = localStorage.getItem('refreshToken');

        if (refreshToken && error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            return axios
                .post(`${baseURL}/auth/new-access-token`, { refreshToken })
                .then(response => {
                    if (response.status === 200) {
                        localStorage.setItem('accessToken', response.data.accessToken);
                        originalRequest.headers.authorization = `Bearer ${response.data.accessToken}`;
                        return axios(originalRequest);
                    }
                })
                .catch(error => {
                    console.error(error)
                });
        }
        return Promise.reject(error.response || error.message);
    }
);

export const getAxiosInstance = token => axios.create({
        baseURL: 'http://localhost:4000',
        withCredentials: true,
        headers: { authorization: `Bearer ${token}` }
});


export { axiosClient };
export default axios.create({
    baseURL: 'http://localhost:4000',
    withCredentials: true
});

