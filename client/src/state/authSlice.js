import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    mode: 'light',
    user: null,
    accessToken: null,
    refreshToken: null,
    error: null
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setMode: state => { state.mode = state.mode === 'light' ? 'dark' : 'light' },
        setUser: (state, action) => { state.user = action.payload.user },
        setCredentials: (state, action) => {
            state.user = action.payload.user;
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
        },
        setError: (state, action) => { state.error = action.payload.error; },
        logout: state => {
            state.user = null;
            state.accessToken = null;
            state.refreshToken = null;
        }
    }
});

export const { setMode, setCredentials, logout, setUser, setError } = authSlice.actions;

export const selectCurrentUser = state => state.auth.user;

export const selectCurrentAccessToken = state => state.accessToken;

export const selectRefreshToken = state => state.refreshToken;

export const selectThemeMode = state => state.auth.mode;

export const selectError = state => state.auth.error;

export default authSlice.reducer;