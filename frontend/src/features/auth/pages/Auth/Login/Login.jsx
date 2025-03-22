import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../../contexts/useAuth";

export const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [loginError, setLoginError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();

    const handleLogin = async (data) => {
        setIsLoading(true);
        setLoginError("");

        try {
            const success = await login(data.username, data.password);

            if (success) {
                // Use replace to avoid back button issues
                navigate("/", { replace: true });
            } else {
                setLoginError("Login failed. Please check your credentials.");
            }
        } catch (error) {
            setLoginError("An error occurred during login. Please try again.");
            console.error("Login error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(handleLogin)} className="flex flex-col text-black gap-4">
            <input
                type="text"
                placeholder="Username"
                className="p-2 rounded"
                disabled={isLoading}
                {...register("username", { required: "Username is required" })}
            />
            {errors.username && <p className="text-red-500">{errors.username.message}</p>}

            <input
                type="password"
                placeholder="Password"
                className="p-2 rounded"
                disabled={isLoading}
                {...register("password", { required: "Password is required" })}
            />
            {errors.password && <p className="text-red-500">{errors.password.message}</p>}

            {loginError && <p className="text-red-500">{loginError}</p>}

            <button
                type="submit"
                className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
                disabled={isLoading}
            >
                {isLoading ? "Logging in..." : "Login"}
            </button>
        </form>
    );
};
