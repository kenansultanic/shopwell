import * as api from "../api/user";
import { setUser, updateUser, setRestrictions } from "../state/authSlice";

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

export const updateUserInfo = (infoToUpdate, id) => async dispatch => {

    const response = await api.updateUserInfo(infoToUpdate, id);

    if (response.status === 200) {
        const { updated } = response.data;
        dispatch(updateUser({ updated }));
    }

    return response;
};

export const getRestrictions = () => async dispatch => {

    const response = await api.getRestrictions();

    if (response.status === 200) {
        const { restrictions } = response.data;
        dispatch(setRestrictions({ restrictions }));
    }

    return response;
};

export const updateUserRestrictions = (data, type) => async dispatch => {

    const response = await api.updateUserRestrictions(data, type);

    if (response.status === 200) {
        const { updated: user } = response.data;
        dispatch(setUser({ user }));
    }

    return response;
};

export const updateAllowExtraEmails = (allow, id) => async dispatch => {

    const response = await api.allowExtraEmails(allow, id);

    if (response.status === 200) {
        const { updated: user } = response.data;
        dispatch(setUser({ user }));
    }

    return response;
};