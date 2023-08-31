import * as api from "../api/user";
import { setUser } from "../state/authSlice";
import {notificationSchema} from "../admin/common/schemas/formik-schema";

export const register = values => async dispatch => {

    const response = await api.register(values);

    if (response.status === 201) {
        const { user, accessToken, refreshToken } = response.data;
        dispatch(setUser({ user }));
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
    }

    return response;
};

export const login = (withGoogle, email, password) => async dispatch => {

    let response;

    if (withGoogle)
        response = await api.googleLogin(email);
    else response = await api.login(email, password);

    if (response.status === 200) {
        const { user, accessToken, refreshToken } = response.data;
        dispatch(setUser({ user }));
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
    }

    return response;
};