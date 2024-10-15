import React, { useState } from "react";
import google_logo from "../assets/google-logo.png";
import userIcon from "../assets/user-icon.png";
import emailIcon from "../assets/email-icon.png";
import passwordIcon from "../assets/password-icon.png";
import eyeIcon from "../assets/eyeIcon.png";
import { useForm } from "react-hook-form";
import onSubmit from "../../../utils/register_submit";
import { InputField } from "../components/InputField";
import { HeaderButton } from "../../../components/HeaderButton/HeaderButton";
import { Link } from "react-router-dom";
import "../AuthPage.css"

export const Registration = () => {
    const form = useForm();
    const { register, formState: { errors }, watch, handleSubmit } = form;
    const [showPassword, setShowPassword] = useState({
        password: false,
        passwordConfirmation: false,
    });

    const togglePasswordVisibility = (isVisible, field) => {
        setShowPassword((prev) => ({
        ...prev,
        [field]: isVisible,
        }));
    };

    return (
    <div className="auth-form flex-center-all-row" style={
        {
            backgroundImage: `
                linear-gradient(#B9B7FF, #000000),
                linear-gradient(#B9B7FF, #000000)
            `,
            borderTop: `2px solid #B9B7FF`
        }}>
        <div className="auth-container-text flex-center-all-column">
            <h4>REGISTER</h4>
            <h5 style={{ color: "gray" }}>Welcome to MUSIQUE</h5>
            <a href="google.com"><img alt="google-auth" src={google_logo}></img></a>
        </div>

        <div className="auth-container-inputs flex-center-all-column">
            <form onSubmit={handleSubmit(onSubmit)}>
                <InputField
                id="username"
                placeholder="Username..."
                register={register}
                validation={{ required: "Username is required" }}
                img={userIcon}
                error={errors.username}
                />

                <InputField
                id="email"
                type="email"
                placeholder="Email..."
                register={register}
                validation={{
                    required: "Email is required",
                    pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Email should contain @ symbol",
                    },
                }}
                img={emailIcon}
                error={errors.email}
                />

                <InputField
                id="password"
                type={showPassword.password ? "text" : "password"}
                placeholder="Password..."
                register={register}
                validation={{
                    required: "Password is required",
                    minLength: {
                    value: 8,
                    message: "Password should be 8 characters long",
                    },
                }}
                img={passwordIcon}
                showPasswordImg={eyeIcon}
                togglePasswordVisibility={togglePasswordVisibility}
                error={errors.password}
                />

                <InputField
                id="passwordConfirmation"
                type={showPassword.passwordConfirmation ? "text" : "password"}
                placeholder="Confirm password..."
                register={register}
                validation={{
                    required: "Password confirmation is required",
                    minLength: {
                    value: 8,
                    message: "Password should be 8 characters long",
                    },
                    validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                }}
                img={passwordIcon}
                showPasswordImg={eyeIcon}
                togglePasswordVisibility={togglePasswordVisibility}
                error={errors.passwordConfirmation}
                />
                <div className="auth-navigation-container">
                    <HeaderButton
                    buttonTitle={"REGISTER"}
                    boxShadowColor={"#004DFF"}
                    shadowIntensity={10}
                    isSubmit={true}
                    onClick={handleSubmit}
                    />
                    <h5 className="already-authed-label">
                        <Link to="/auth/login">
                            Already registered?        
                        </Link>
                    </h5>
                </div>
            </form>
        </div>
    </div>
  );
};
