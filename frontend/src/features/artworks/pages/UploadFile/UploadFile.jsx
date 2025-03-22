import React, { useState } from "react";
import { useForm } from "react-hook-form";
import api from "../../../../services/api"
import { useNavigate } from "react-router-dom";
import { routes } from "../../../../routes";

export const UploadFile = () => {
  const { register, handleSubmit } = useForm();
  const [file, setFile] = useState(null);
  const [fileType, setFileType] = useState(null);
  const nav = useNavigate();

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

      if (fileType === "audio"){
        nav(routes.musicians_page.url)
      } else if (fileType === "image"){
        nav(routes.artists_page.url)
      } else if (fileType === "document"){
        nav(routes.writers_page.url)
      }

    } catch (err) {
      console.error(err);
      alert("File upload failed");
    }
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="flex flex-col items-center w-full">
      {!file ?
      <div className="flex flex-col items-center m-5">
        <label htmlFor="file-upload" className="medium-header pb-10 button-card-5xl outline-dashed outline-white">Upload</label>
        <input
          id="file-upload"
          className="hidden"
          type="file"
          onChange={handleFileChange}
          required
        />
      </div>
      :
      <div className="flex flex-col items-center m-5">
        <label htmlFor="file-upload" className="button-card-5xl outline-dashed outline-white overflow-hidden">{file.name}</label>
        <input
          id="file-upload"
          className="hidden"
          type="file"
          onChange={handleFileChange}
          required
        />
      </div>
      }
      {file && (
        <div className="flex flex-col px-20 w-1/2">
          <h1 className="small-header !mt-2 !mb-4">General Information</h1>
          <input {...register("title")} placeholder="Title" required />
          <input {...register("description")} placeholder="Description" />
          <input {...register("category")} placeholder="Category" required />
          {fileType === 'audio' && (
            <>
              <h1 className="small-header !mt-2 !mb-4">Arrangement Details</h1>
              <input {...register("genre")} placeholder="Genre" required />
              <input {...register("bpm")} placeholder="BPM" required />
            </>
          )}

          {fileType === 'image' && (
            <>
              <h1 className="small-header !mt-2 !mb-4">Artwork Details</h1>
              <input {...register("style")} placeholder="Style" required />
              <input {...register("medium")} placeholder="Medium" required />
              <input type="number" {...register("height_px")} placeholder="Height (px)" required />
              <input type="number" {...register("width_px")} placeholder="Width (px)" required />
            </>
          )}

          {fileType === 'document' && (
            <>
              <h1 className="small-header !pt-0 !mt-2 !mb-4">Writing Information</h1>
              <input {...register("word_count")} placeholder="Word Count" required />
              <input {...register("language")} placeholder="Language" required />
            </>
          )}
          <div className="flex flex-row justify-between">
            <div className="flex flex-row justify-between">
              <input id="is_downloadable" type="checkbox" {...register("is_downloadable")}
              className="checkbox"/>
              <label htmlFor="is_downloadable">File Can Be Downloaded</label>
            </div>
            <div>
              <button className="button-card" type="submit">Upload</button>
            </div>
          </div>
        </div>
      )}
    </form>
  );
};
