import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

export const Login = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleLogin = async (data) => {
        try {
            await axios.post(
                "http://127.0.0.1:8000/api/v1/login/", 
                {
                    username: data.username,
                    password: data.password
                },
                {
                    withCredentials: true
                }
            );            
            navigate("/", { state: { loggedIn: true } });
    
        } catch (error) {
            console.error("Login failed:", error.response?.data);
        }
    };    

    return (
        <form onSubmit={handleSubmit(handleLogin)} className="flex flex-col text-black gap-4">
            <input type="text" {...register("username", { required: "Username is required" })} />
            {errors.username && <p>{errors.username.message}</p>}

            <input type="password" {...register("password", { required: "Password is required" })} />
            {errors.password && <p>{errors.password.message}</p>}

            <button type="submit" className="text-white">Login</button>
        </form>
    );
};
