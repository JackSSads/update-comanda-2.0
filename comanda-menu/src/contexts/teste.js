import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { AuthService } from "../service/auth";

const AuthContext = createContext();

const LOCAL_STORAGE_KEY_ACCESS_TOKEN = 'APP_ACCESS_TOKEN';

export const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState();

    useEffect(() => {
        const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY_ACCESS_TOKEN);

        if (accessToken) {
            setAccessToken(JSON.parse(accessToken));
        } else {
            setAccessToken(undefined);
        };
    }, []);

    const handleLogin = useCallback(async (email, password) => {
        const result = await AuthService.auth(email, password);

        if (result instanceof Error) {
            return result.message;
        } else {
            localStorage.setItem(LOCAL_STORAGE_KEY_ACCESS_TOKEN, JSON.stringify(result.accessToken));
            setAccessToken(result.accessToken);
        };

    }, []);

    const handleLogout = useCallback(() => {
        localStorage.removeItem(LOCAL_STORAGE_KEY_ACCESS_TOKEN);
        setAccessToken(undefined);
    }, []);

    const isAuthenticated = useMemo(() => accessToken !== undefined, [accessToken]);

    return (
        <AuthContext.Provider value={{ login: handleLogin, isAuthenticated, logout: handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};
