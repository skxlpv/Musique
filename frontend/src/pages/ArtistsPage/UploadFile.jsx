import React, { useState } from "react";
import { useForm } from "react-hook-form";
import api from "../../utils/api"

export const UploadFile = () => {
  const { register, handleSubmit, watch } = useForm();
  const [file, setFile] = useState(null);
  const [fileType, setFileType] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const ext = selectedFile.name.split('.').pop().toLowerCase();
      if (['mp3', 'wav',].includes(ext)) {
        setFileType('audio');
      } else if (['jpg', 'jpeg', 'png', 'gif'].includes(ext)) {
        setFileType('image');
      } else if (['pdf', 'doc', 'docx'].includes(ext)) {
        setFileType('document');
      } else {
        setFileType('other');
      }
    }
  };

  const submitHandler = async (data) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("is_downloadable", data.is_downloadable || false);

    if (fileType === 'audio') {
      formData.append("genre", data.genre);
      formData.append("bpm", data.bpm);
    } else if (fileType === 'image') {
      formData.append("style", data.style);
      formData.append("medium", data.medium);
      formData.append("height_px", data.height_px);
      formData.append("width_px", data.width_px);
    } else if (fileType === 'document') {
      formData.append("word_count", data.word_count);
      formData.append("language", data.language);
    }

    try {
      await api.post("http://127.0.0.1:8000/api/v1/upload-file/", formData, {
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
    <form onSubmit={handleSubmit(submitHandler)} className="flex flex-col text-black">
      <input type="file" onChange={handleFileChange} required />
      {file && (
        <>
          <input {...register("title")} placeholder="Title" required />
          <textarea {...register("description")} placeholder="Description" />
          <input {...register("category")} placeholder="Category" required />
          <input type="checkbox" {...register("is_downloadable")} /> Is Downloadable

          {fileType === 'audio' && (
            <>
              <input {...register("genre")} placeholder="Genre" required />
              <input {...register("bpm")} placeholder="BPM" required />
            </>
          )}

          {fileType === 'image' && (
            <>
              <input {...register("style")} placeholder="Style" required />
              <input {...register("medium")} placeholder="Medium" required />
              <input {...register("height_px")} placeholder="Height (px)" required />
              <input {...register("width_px")} placeholder="Width (px)" required />
            </>
          )}

          {fileType === 'document' && (
            <>
              <input {...register("word_count")} placeholder="Word Count" required />
              <input {...register("language")} placeholder="Language" required />
            </>
          )}

          <button type="submit">Upload</button>
        </>
      )}
    </form>
  );
};