    import "../Registration/Registration.css"
    import { useForm } from "react-hook-form";
    import userIcon from "./assets/user-icon.png";
    import emailIcon from "./assets/email-icon.png";
    import passwordIcon from "./assets/password-icon.png";
    import { useState, useEffect } from 'react';
    import axios from "axios"

    /* 
    TODO:
    1. Add a function to check if the email is already in use
    2. Add a function to check if the password is strong enough
    3. 
    */

    export const Registration = () => {
        const form = useForm();
        const [submitStatus, setSubmitStatus] = useState(null);
        const { register, formState: { errors }, watch, handleSubmit } = form;

        const [errorHeight, setErrorHeight] = useState({
            username: 0,
            email: 0,
            password: 0,
            passwordConfirmation: 0
        });

        const onSubmit = async (data) => {
            await axios.post("https://66fbdd4f8583ac93b40d8a14.mockapi.io/api/v1/users/create", {...data})
            .then((response) => { 
                setSubmitStatus(response.status);
                console.log(response);
            })
            .catch((error) => {
                setSubmitStatus(error.response.status);
                console.error(error)
            })
        };

        useEffect(() => {
            setErrorHeight({
                username: errors.username ? 50 : 0,
                email: errors.email ? 50 : 0,
                password: errors.password ? 50 : 0,
                passwordConfirmation: errors.passwordConfirmation ? 50 : 0
            });
        }, [errors]);

        return (
            <div className="content-container">
                <div className="registration-form">
                    <h1 className="title">Registration Form</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* USERNAME */}
                        <div className="input-container">
                            <div className="input-field-container">
                                <img alt="user-icon" src={userIcon}></img>
                                <input 
                                    type="text" 
                                    id="username" 
                                    placeholder="Your username..." 
                                    {...register("username", { required: "Username is required" })} />
                            </div>
                            <div
                                className="error-container"
                                style={{
                                    maxHeight: `${errorHeight.username}px`,
                                    opacity: errors.username ? 1 : 0
                                }}
                            >
                                <h5 role="alert" className="error-message">
                                    {errors.username?.message}
                                </h5>
                            </div>
                        </div>

                        {/* EMAIL */}
                        <div className="input-container">
                            <div className="input-field-container">
                                <img alt="email-icon" src={emailIcon}></img>
                                <input 
                                    type="text" 
                                    id="email" 
                                    placeholder="Your email..." 
                                    {...register("email", { 
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                            message: "Email should contain @ symbol"
                                        }
                                
                                    })}
                                />
                            </div>
                            <div
                                className="error-container"
                                style={{
                                    maxHeight: `${errorHeight.email}px`,
                                    opacity: errors.email ? 1 : 0
                                }}
                            >
                                <h5 role="alert" className="error-message">
                                    {errors.email?.message}
                                </h5>
                            </div>
                        </div>

                        {/* PASSWORD */}
                        <div className="input-container">
                            <div className="input-field-container">
                                <img alt="password-icon" src={passwordIcon}></img>
                                <input 
                                    type="password" 
                                    id="password" 
                                    placeholder="Your password..." 
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: {
                                            value: 8,
                                            message: "Password should be 8 characters long"
                                        }
                                    })} 
                                />
                            </div>
                            <div
                                className="error-container"
                                style={{
                                    maxHeight: `${errorHeight.password}px`,
                                    opacity: errors.password ? 1 : 0
                                }}
                            >
                                <h5 role="alert" className="error-message">
                                    {errors.password?.message}
                                </h5>
                            </div>
                        </div>

                        {/* PASSWORD CONFIRMATION */}
                        <div className="input-container">
                            <div className="input-field-container">
                                <img alt="password-icon" src={passwordIcon}></img>
                                <input 
                                    type="password" 
                                    id="passwordConfirmation" 
                                    placeholder="Confirm password" 
                                    {...register("passwordConfirmation", {
                                        required: "Password confirmation is required",
                                        minLength: {
                                            value: 8,
                                            message: "Password should be 8 characters long"
                                        },
                                        validate: (value) => value === watch("password") || "Passwords do not match"
                                    })} 
                                />
                            </div>
                            <div
                                className="error-container"
                                style={{
                                    maxHeight: `${errorHeight.passwordConfirmation}px`,
                                    opacity: errors.passwordConfirmation ? 1 : 0
                                }}
                            >
                                <h5 role="alert" className="error-message">
                                    {errors.passwordConfirmation?.message}
                                </h5>
                            </div>
                        </div>
                        
                        {/* SUBMIT */}
                        <div className="register-button-container">
                            <button type="submit" className="register-button">REGISTER</button>
                        </div>

                        <div className="submit-status-container" style={{"color": `${submitStatus === 201 ?  "greenyellow" : "orangered"}`}}>

                            {submitStatus === 201 ? "Form has been submitted" : submitStatus === null? "" : "The error has occured while submitting the form"}
                        </div>
                    </form>
                </div>
            </div>
        );
    };
