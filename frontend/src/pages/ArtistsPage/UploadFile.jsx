import React from "react";
import { useForm } from "react-hook-form";

export const UploadFile = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm()
    const submitHandler = (data) => console.log(data)
    
      console.log(watch("example")) // watch input value by passing the name of i

    return(
        <form onSubmit={handleSubmit(submitHandler)}>
            <div className="w-full">
                <div className="bg-neutral-900 w-full h-56 flex flex-row items-center justify-center outline-dashed mb-20">
                    <h1 className="text-5xl">
                        +Upload File
                    </h1>
                </div>
                <div className="">
                    <h1>User</h1>
                    <h1>Author</h1>
                    <h1>Title</h1>
                    <h1>Description</h1>
                    <h1>Category</h1>
                    <h1>Is Public</h1>
                    <h1>Is Downloadable</h1>
                </div>
            </div>
        </form>
    )
}