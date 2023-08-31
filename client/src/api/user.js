import { axiosClient as axios } from "./AxiosClient";

export const register = values => axios.post('/auth/register', { ...values });

export const login = (email, password) => axios.post('/auth/login', { email, password });

export const googleLogin = email => axios.post('/auth/google-login', { email });

export const getProduct = id => axios.get(`/product/${id}`);


export const leaveReview = (code, userID, rating, comment, name) => axios.post(
    `/product/leave-review/${code}`,
    { userID, rating, comment, userName: name }
);

export const getReviews = (code, page) => axios.get(`/product/reviews/${code}`, { params: { page } });

export const deleteReview = id => axios.delete(`/product/reviews/${id}`);