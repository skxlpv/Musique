import { register_user } from "../../../../../services/api";
import "./Registration.css";
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
        <div>
            <form className="flex flex-col gap-4 text-black" onSubmit={handleSubmit(handleRegistration)}>
                <input
                    type="text"
                    placeholder="Username"
                    className="p-2 rounded"
                    {...register('username', registerRequirements.username)}
                    disabled={isLoading}
                />
                {errors?.username && <p className="text-red-500">{errors.username.message}</p>}

                <input
                    type="email"
                    placeholder="Email"
                    className="p-2 rounded"
                    {...register('email', registerRequirements.email)}
                    disabled={isLoading}
                />
                {errors?.email && <p className="text-red-500">{errors.email.message}</p>}

                <input
                    type="password"
                    placeholder="Password"
                    className="p-2 rounded"
                    {...register('password', registerRequirements.password)}
                    disabled={isLoading}
                />
                {errors?.password && <p className="text-red-500">{errors.password.message}</p>}

                {registrationError && <p className="text-red-500">{registrationError}</p>}

                <button
                    className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
                    type="submit"
                    disabled={isLoading}
                >
                    {isLoading ? "Registering..." : "Register"}
                </button>
            </form>
        </div>
    );
};
