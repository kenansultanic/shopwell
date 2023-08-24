import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import * as constants from "constants";
import localStorage from "redux-persist/es/storage";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null);
    const [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null);
    const [mode, setMode] = useState(() => localStorage.getItem('mode') || 'light');

    const contextData = {
        user,
        authTokens,
        mode
    }

    return (
      <AuthContext.Provider value={contextData}>
          { children }
      </AuthContext.Provider>
    );
}