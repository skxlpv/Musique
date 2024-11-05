import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import favicov from "../../.././assets/logo.ico";
import googleLogo from "../assets/google-logo.png";
import facebookLogo from "../assets/facebook-logo.png";
import appleLogo from "../assets/apple-logo.png";
import { Link } from "react-router-dom";

export const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loginError, setLoginError] = useState("");
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const csrfToken = Cookies.get('csrftoken');
            const response = await fetch("http://localhost:8000/api/v1/login/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": csrfToken,
                },
                body: JSON.stringify(data),
                credentials: "include" // Ensures cookies are sent with the request
            });

            if (!response.ok) {
                throw new Error("Invalid username or password");
            }

            navigate("/");
        } catch (error) {
            setLoginError(error.message);
        }
    };

    const handleLogout = async () => {
        try {
            const csrfToken = Cookies.get('csrftoken');
            const response = await fetch("http://localhost:8000/api/v1/logout/", {
                method: "POST",
                headers: {
                    "X-CSRFToken": csrfToken,
                },
                credentials: "include"
            });

            if (response.ok) {
                navigate("/auth/login");
            } else {
                throw new Error("Failed to logout");
            }
        } catch (error) {
            setLoginError(error.message);
        }
    };

    return (
        <div className="flex">
            <div className="outline-1 outline w-2/6 flex flex-col justify-center items-center">
                <div className="flex flex-col justify-center items-center ">
                    <img className="h-36 outline rounded-full" src={favicov} alt="logo-photo" />
                </div>
                <div className="my-5 w-2/4 flex justify-center gap-4">
                    <img className="h-12 rounded-full" src={googleLogo} alt="logo-google" />
                    <img className="h-12 rounded-full" src={facebookLogo} alt="logo-facebook" />
                    <img className="h-12 rounded-full" src={appleLogo} alt="logo-apple" />
                </div>
                <h1>Great to See You Back!</h1>
                <Link to="/auth/register">
                    <h1 className="text-gray-400 italic">Need An Account?</h1>
                </Link>
            </div>

            <div className="outline-1 outline text-center py-14 w-4/6 flex flex-col justify-center">
                <h1 className="text-8xl mb-10 mt-6">Log In</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col px-36">
                    <input
                        className="input-field"
                        placeholder="Username"
                        {...register("username", { required: "Username is required" })}
                    />
                    {errors.username && (
                        <p className="text-red-500 text-sm">{errors.username.message}</p>
                    )}

                    <input
                        className="input-field"
                        placeholder="Password"
                        type="password"
                        {...register("password", { required: "Password is required" })}
                    />
                    {errors.password && (
                        <p className="text-red-500 text-sm">{errors.password.message}</p>
                    )}

                    <button type="submit" className="outline my-5 p-2">Log In</button>
                    {loginError && <p className="text-red-500 text-sm">{loginError}</p>}
                </form>
                <button onClick={handleLogout} className="outline my-5 p-2">Log Out</button>
            </div>
        </div>
    );
};
