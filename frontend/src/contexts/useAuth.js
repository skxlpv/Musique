import { createContext, useContext, useEffect, useState } from "react";
import { is_authenticated, login as apiLogin, logout as apiLogout } from "../utils/api";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    const checkAuth = async () => { 
        setLoading(true);
        try {
            const response = await is_authenticated();
            setIsAuthenticated(response);
        } catch {
            setIsAuthenticated(false);
        } finally {
            setLoading(false);
        }
    };

    const login = async (username, password) => {
        try {
            const success = await apiLogin(username, password);
            if (success) {
                setIsAuthenticated(true);
                return true;
            }
            return false;
        } catch (error) {
            console.error("Login error:", error);
            return false;
        }
    };

    const logout = async () => {
        try {
            const success = await apiLogout();
            if (success) {
                setIsAuthenticated(false);
            }
            return success;
        } catch (error) {
            console.error("Logout error:", error);
            return false;
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{
            isAuthenticated, 
            loading, 
            login,
            logout,
            refreshAuth: checkAuth
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);