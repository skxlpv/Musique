import axios from "axios";
import "../Registration/Registration.css";
import { useForm } from "react-hook-form";

export const Registration = () => {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const onErrors = (errors) => {console.log(errors)};

    const handleRegistration = async (data) => {
        const response = await axios({
            method: "POST",
            data: {
                username: data.username,
                email: data.email,
                password: data.password
            },
            withCredentials: true,
            url: "http://127.0.0.1:8000/api/v1/register/"
        })
        return response
    }

    const registerRequirements = {
        username: {
            required: "Username is required",
        },
        email: {
            required: "Email is required",
            pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "invalid email address"
            }        
        },
        password: {
            required: "Password is required",
            minLength: {
                value: 8,
                message: "Password must have at least 8 characters"
            }
        }
    }

    return(
        <div>
            <form className="flex flex-col gap-4 text-black" onSubmit={handleSubmit(handleRegistration, onErrors)}>
                <input type="text" name="username" {...register('username', registerRequirements.username)} />
                {errors?.username && <p className="text-white italic">{errors.username.message}</p>}

                <input type="email" name="email" {...register('email', registerRequirements.email)} />
                {errors?.email && <p className="text-white italic">{errors.email.message}</p>}

                <input type="password" name="password" {...register('password', registerRequirements.password)} />
                {errors?.password && <p className="text-white italic">{errors.password.message}</p>}

                <button className="text-white" type="submit">Register</button>
            </form>
        </div>
    )
};
