import { useState, useEffect } from "react";
import api from "../utils/api"

export const useAuth = () => {
    const [auth, setAuth] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const authCheck = async () => {
            setLoading(true);
            try {
                const response = await api.get("api/v1/check_auth/");
                setAuth(response.data);
            } catch (error) {
                setAuth(null);
            } finally {
                setLoading(false);
            }
        };

        authCheck();
    }, []);

    return { auth, loading };
};