import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import "./UploadFileStyles.css";

export const UploadFile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const submitHandler = async (data) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("style", data.style);
    formData.append("medium", data.medium);
    formData.append("height_px", data.height_px);
    formData.append("width_px", data.width_px);
    formData.append("height_cm", data.height_cm);
    formData.append("width_cm", data.width_cm);
    formData.append("is_downloadable", data.is_downloadable || false);

    try {
      await axios.post("http://127.0.0.1:8000/api/v1/pages/upload/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("File uploaded successfully");
    } catch (err) {
      console.error(err);
      alert("File upload failed");
    }
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="w-2/3 mx-auto p-6 text-white">
      <div className="border-dashed border-2 border-gray-400 p-10 text-center mb-6">
        <label className="cursor-pointer">
          <input
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
          {file ? (
            <div>
              <span className="text-6xl">📄</span>
              <p className="mt-2 text-lg text-gray-300">{file.name}</p>
            </div>
          ) : (
            <p className="mt-2 text-gray-500">Click to upload</p>
          )}
          <h1 className="text-3xl">Upload File</h1>
        </label>
        {errors.file && <p className="text-red-500">{errors.file.message}</p>}
      </div>

      {file && (
        <div className="space-y-4">
          <input {...register("title", { required: "Title is required" })} className="upload-input" placeholder="Title" />
          {errors.title && <p className="text-red-500">{errors.title.message}</p>}

          <textarea {...register("description")} className="upload-input" placeholder="Description"></textarea>

          <input {...register("authors")} className="upload-input" placeholder="Author(s)" />

          <input {...register("category", { required: "Category is required" })} className="upload-input" placeholder="Category" />
          {errors.category && <p className="text-red-500">{errors.category.message}</p>}

          <input {...register("style")} className="upload-input" placeholder="Style" />
          <input {...register("medium")} className="upload-input" placeholder="Medium" />

          <div className="grid grid-cols-2 gap-2">
            <input type="number" {...register("height_px")} className="upload-input" placeholder="Height (px)" />
            <input type="number" {...register("width_px")} className="upload-input" placeholder="Width (px)" />
            <input type="number" {...register("height_cm")} className="upload-input" placeholder="Height (cm)" />
            <input type="number" {...register("width_cm")} className="upload-input" placeholder="Width (cm)" />
          </div>

          <label className="flex items-center space-x-2">
            <input type="checkbox" {...register("is_downloadable")} className="w-5 h-5" />
            <span>Is Downloadable</span>
          </label>

          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 p-2 rounded">Submit</button>
        </div>
      )}
    </form>
  );
};
