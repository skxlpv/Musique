import React, {useState} from "react";
import google_logo from "../assets/google-logo.png";
import userIcon from "../assets/user-icon.png";
import passwordIcon from "../assets/password-icon.png";
import eyeIcon from "../assets/eyeIcon.png";
import onSubmit from "../../../utils/register_submit";
import { InputField } from "./../../Auth/components/InputField";
import { HeaderButton } from "../../../components/HeaderButton/HeaderButton";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import "../AuthPage.css"


export const Login = () => {
    const form = useForm();
    const { register, formState: { errors }, handleSubmit } = form;
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
                    linear-gradient(#E9BAFF, #000000),
                    linear-gradient(#E9BAFF, #000000)
                `,
                borderTop: `2px solid #E9BAFF`
            }}>
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
                    <div className="auth-navigation-container">
                        <HeaderButton
                            buttonTitle={"LOGIN"}
                            boxShadowColor={"#E6AFFF"}
                            shadowIntensity={10}
                            isSubmit={true}
                            onClick={handleSubmit}
                        />

                        <h5 className="already-authed-label">
                            <Link to="/auth/register">
                                Have an account?        
                            </Link>
                        </h5>
                    </div>
                </form>
            </div>

            <div className="auth-container-text flex-center-all-column">
                <h4>LOGIN</h4>
                <h5 style={{ color: "gray" }}>Great to see you again!</h5>
                <a href="google.com">
                    <img alt="google-auth" src={google_logo}></img>
                </a>
            </div>
        </div>
      );
}