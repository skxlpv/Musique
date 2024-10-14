import React, { useState } from "react";
import "./Registration.css";
import google_logo from "../Registration/assets/google-logo.png";
import userIcon from "./assets/user-icon.png";
import emailIcon from "./assets/email-icon.png";
import passwordIcon from "./assets/password-icon.png";
import eyeIcon from "./assets/eyeIcon.png";
import { useForm } from "react-hook-form";
import onSubmit from "../../utils/register_submit";
import { InputField } from "./components/InputField";
import { HeaderButton } from "../../components/HeaderButton/HeaderButton";

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
    <div className="content-container flex-center-all-row registration-container-padding">
      <div className="registration-form flex-center-all-row">
        <div className="register-container-text flex-center-all-column">
          <h4>REGISTER</h4>
          <h5 style={{ color: "gray" }}>Welcome to MUSIQUE</h5>
          <a href="google.com">
            <img alt="google-auth" src={google_logo}></img>
          </a>
        </div>

        <div className="register-container-inputs flex-center-all-column">
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

            <HeaderButton
              buttonTitle={"REGISTER"}
              boxShadowColor={"#004DFF"}
              shadowIntensity={10}
              isSubmit={true}
              onClick={handleSubmit}
            />
          </form>
        </div>
      </div>
    </div>
  );
};
