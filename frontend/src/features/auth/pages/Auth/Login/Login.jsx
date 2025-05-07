import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../../contexts/useAuth.jsx";

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
        <div className="w-full max-w-md mx-auto bg-black rounded-xl shadow-lg overflow-hidden p-6">
            <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>

            <form onSubmit={handleSubmit(handleLogin)} className="space-y-5">
                <div className="space-y-1">
                    <label className="text-sm font-medium" htmlFor="username">
                        Username
                    </label>
                    <input
                        id="username"
                        type="text"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        placeholder="Enter your username"
                        disabled={isLoading}
                        {...register("username", { required: "Username is required" })}
                    />
                    {errors.username && <p className="text-sm text-red-600 mt-1">{errors.username.message}</p>}
                </div>

                <div className="space-y-1">
                    <label className="text-sm font-medium" htmlFor="password">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        placeholder="Enter your password"
                        disabled={isLoading}
                        {...register("password", { required: "Password is required" })}
                    />
                    {errors.password && <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>}
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <input
                            id="remember-me"
                            type="checkbox"
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor="remember-me" className="ml-2 block text-sm">
                            Remember me
                        </label>
                    </div>

                    <a href="/auth/forgot-password" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                        Forgot your password?
                    </a>
                </div>

                {loginError && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
                        {loginError}
                    </div>
                )}

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <span className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Signing in...
                        </span>
                    ) : (
                        "Sign In"
                    )}
                </button>

                <p className="text-center text-sm mt-4">
                    Don't have an account?{" "}
                    <a
                        href="/auth/register"
                        className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                        Create an account
                    </a>
                </p>
            </form>
        </div>
    );
};