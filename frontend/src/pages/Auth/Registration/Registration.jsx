import { useForm } from "react-hook-form";
import onSubmit from "../../../utils/register";
import "../Registration/Registration.css";
import { Link } from "react-router-dom";
import favicov from "../../.././assets/logo.ico";
import googleLogo from "../assets/google-logo.png";
import facebookLogo from "../assets/facebook-logo.png";
import appleLogo from "../assets/apple-logo.png";

export const Registration = () => {
    const {register, formState: { errors }, handleSubmit, watch, } = useForm();
    // const [showPassword, setShowPassword] = useState({
    //     password: false,
    //     passwordConfirmation: false,
    // });

    // const togglePasswordVisibility = (isVisible, field) => {
    //     setShowPassword((prev) => ({
    //         ...prev,
    //         [field]: isVisible,
    //     }));
    // };

    return (
        <div className="flex">
            <div className="outline-1 outline text-center py-14 w-4/6">
                <h1 className="text-8xl mb-10 mt-6">Sign Up</h1>
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
                        placeholder="Email"
                        type="email"
                        {...register("email", { 
                            required: "Email is required",
                            pattern: {
                                value: /^\S+@\S+$/i,
                                message: "Invalid email format",
                            }
                        })}
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm">{errors.email.message}</p>
                    )}

                    <input
                        className="input-field"
                        placeholder="Password"
                        // type={showPassword.password ? "text" : "password"}
                        {...register("password", { 
                            required: "Password is required",
                            minLength: {
                                value: 6,
                                message: "Password must be at least 6 characters",
                            },
                        })}
                    />
                    {errors.password && (
                        <p className="text-red-500 text-sm">{errors.password.message}</p>
                    )}

                    <input
                        className="input-field"
                        placeholder="Confirm Password"
                        // type={showPassword.passwordConfirmation ? "text" : "password"}
                        {...register("passwordConfirmation", {
                            required: "Please confirm your password",
                            validate: (value) =>
                                value === watch("password") || "Passwords do not match",
                        })}
                    />
                    {errors.passwordConfirmation && (
                        <p className="text-red-500 text-sm">{errors.passwordConfirmation.message}</p>
                    )}

                    <button type="submit" className="outline my-5 p-2">
                        Register
                    </button>
                </form>
            </div>

            <div className="outline-1 outline w-2/6 flex flex-col justify-center items-center">
                <div className="flex flex-col justify-center items-center">
                    <img className="h-36 outline rounded-full" src={favicov} alt="logo-photo" />
                </div>
                <div className="my-5 flex justify-center gap-4">
                    <img className="h-12 rounded-full" src={googleLogo} alt="logo-google" />
                    <img className="h-12 rounded-full" src={facebookLogo} alt="logo-facebook" />
                    <img className="h-12 rounded-full" src={appleLogo} alt="logo-apple" />
                </div>
                <h1>Welcome to Musique!</h1>
                <Link to="/auth/login">
                    <h1 className="text-gray-400 italic">Already Registered?</h1>
                </Link>
            </div>
        </div>
    );
};
