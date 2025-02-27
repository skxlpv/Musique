import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../../contexts/useAuth";

export const PrivateRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            navigate("/auth/login", { replace: true });
        }
    }, [isAuthenticated, loading, navigate]);

    if (loading) {
        return <div className="w-full h-full flex justify-center items-center">
            <h1 className="text-white text-2xl">Loading...</h1>
        </div>;
    }

    return isAuthenticated ? children : null;
};
