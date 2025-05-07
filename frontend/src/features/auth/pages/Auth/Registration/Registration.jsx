import { register_user } from "../../../../../services/api";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const Registration = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [registrationError, setRegistrationError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleRegistration = async (data) => {
        setIsLoading(true);
        setRegistrationError("");

        try {
            const response = await register_user(data);
            if (response) {
                navigate('/auth/login');
            } else {
                setRegistrationError("Registration failed. User may already exist.");
            }
        } catch (error) {
            setRegistrationError("An error occurred during registration.");
            console.error("Registration error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const registerRequirements = {
        username: {
            required: "Username is required",
        },
        email: {
            required: "Email is required",
            pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address"
            }
        },
        password: {
            required: "Password is required",
            minLength: {
                value: 8,
                message: "Password must have at least 8 characters"
            }
        }
    };

    return (
        <div className="w-full max-w-md mx-auto rounded-xl shadow-lg overflow-hidden p-6">
            <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>

            <form className="space-y-5" onSubmit={handleSubmit(handleRegistration)}>
                <div className="space-y-1">
                    <label className="text-sm font-medium" htmlFor="username">
                        Username
                    </label>
                    <input
                        id="username"
                        type="text"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        placeholder="Enter your username"
                        {...register('username', registerRequirements.username)}
                        disabled={isLoading}
                    />
                    {errors?.username && <p className="text-sm text-red-600 mt-1">{errors.username.message}</p>}
                </div>

                <div className="space-y-1">
                    <label className="text-sm font-medium" htmlFor="email">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        placeholder="Enter your email"
                        {...register('email', registerRequirements.email)}
                        disabled={isLoading}
                    />
                    {errors?.email && <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>}
                </div>

                <div className="space-y-1">
                    <label className="text-sm font-medium" htmlFor="password">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        placeholder="Create a password"
                        {...register('password', registerRequirements.password)}
                        disabled={isLoading}
                    />
                    {errors?.password && <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>}
                </div>

                {registrationError && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
                        {registrationError}
                    </div>
                )}

                <button
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    type="submit"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <span className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Creating account...
                        </span>
                    ) : (
                        "Create Account"
                    )}
                </button>

                <p className="text-center text-sm mt-4">
                    Already have an account?{" "}
                    <a
                        href="/auth/login"
                        className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                        Sign in
                    </a>
                </p>
            </form>
        </div>
    );
};