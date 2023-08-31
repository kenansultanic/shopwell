import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    mode: 'light',
    user: null,
    error: null,
    notifications: []
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setMode: state => { state.mode = state.mode === 'light' ? 'dark' : 'light' },
        setUser: (state, action) => {
            state.user = action.payload.user
        },
        setCredentials: (state, action) => {
            state.user = action.payload.user;
        },
        setError: (state, action) => { state.error = action.payload.error; },
        appendNotifications: (state, action) => {
                state.notifications.push(action.payload.newNotification);
        },
        deleteNotifications: state => { state.notifications = []; },
        logout: state => {
            state.user = null;
        }
    }
});

export const { setMode, setCredentials, logout, setUser, appendNotifications, deleteNotifications, setError } = authSlice.actions;

export const selectCurrentUser = state => state.auth.user;

export const selectCurrentAccessToken = state => state.accessToken;

export const selectRefreshToken = state => state.refreshToken;

export const selectThemeMode = state => state.auth.mode;

export const selectNotifications = state => state.auth.notifications;

export const selectError = state => state.auth.error;

export default authSlice.reducer;