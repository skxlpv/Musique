import { createContext, useContext, useEffect, useState } from "react";
import { get_current_user, is_authenticated, login as apiLogin, logout as apiLogout } from "../../../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(null);

    const checkAuth = async () => { 
        setLoading(true);
        try {
            const authStatus = await is_authenticated();
            setIsAuthenticated(authStatus);
            
            if (authStatus) {
                const userInfo = await get_current_user();
                setUserData(userInfo);
            } else {
                setUserData(null);
            }
        } catch {
            setIsAuthenticated(false);
            setUserData(null);
        } finally {
            setLoading(false);
        }
    };

    const login = async (username, password) => {
        try {
            const success = await apiLogin(username, password);
            if (success) {
                await checkAuth();  // Re-check auth status after login
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
                // Clear all auth-related state immediately
                setIsAuthenticated(false);
                setUserData(null);
                await checkAuth();  // Verify logout with backend
            }
            return success;
        } catch (error) {
            console.error("Logout error:", error);
            return false;
        }
    };

    useEffect(() => {
        checkAuth();
    }, []); // Run only on initial mount

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            loading,
            login,
            logout,
            refreshAuth: checkAuth,
            userData
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);