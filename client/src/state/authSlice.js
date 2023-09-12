import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    mode: 'light',
    user: null,
    error: null,
    notifications: [],
    numberOfUnreadNotifications: 0
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        updateMode: state => { state.mode = state.mode === 'light' ? 'dark' : 'light' },
        setUser: (state, action) => {
            state.user = action.payload.user
        },
        updateUser: (state, action) => { state.user = action.payload.updated },
        setRestrictions: (state, action) => { state.restrictions = action.payload.restrictions; },
        setCredentials: (state, action) => {
            state.user = action.payload.user;
        },
        setError: (state, action) => { state.error = action.payload.error; },
        appendNotifications: (state, action) => {
            const index = state.notifications.findIndex(item => item._id === action.payload.newNotification._id);
            if (index === -1)
                state.notifications.unshift({ ...action.payload.newNotification, isRead: action.payload.isRead });
        },
        setNotificationStatusToRead: state => {
            state.notifications.forEach((value, index, array) => {
                array[index] = { ...value, isRead: true };
            });
        },
        deleteNotifications: state => { state.notifications = []; },
        logout: state => {
            state.user = null;
            state.notifications = [];
            state.mode = 'light';
        }
    }
});

export const {
    updateMode,
    setCredentials,
    logout,
    setUser,
    updateUser,
    setRestrictions,
    appendNotifications,
    setNotificationStatusToRead,
    deleteNotifications,
    setError
} = authSlice.actions;

export const selectCurrentUser = state => state.auth.user;

export const selectRestrictions = state => state.auth.restrictions;

export const selectCurrentAccessToken = state => state.accessToken;

export const selectRefreshToken = state => state.refreshToken;

export const selectThemeMode = state => state.auth.mode;

export const selectNotifications = state => state.auth.notifications;

export const selectError = state => state.auth.error;

export default authSlice.reducer;