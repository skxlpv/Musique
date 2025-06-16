import React, {useEffect, useState} from "react";
import { useForm } from "react-hook-form";
import api from "../../../../services/api";
import { useNavigate } from "react-router-dom";
import {routes} from "../../../../routes/index.jsx";

const CATEGORY_FIELDS = {
  music: {
    title: "Music Details",
    fields: [
      { name: "genre", type: "text", placeholder: "Genre", required: true },
      { name: "bpm", type: "number", placeholder: "BPM", required: false },
      { name: "duration_seconds", type: "number", placeholder: "Duration (seconds)", required: false },
      { name: "cover_art", type: "file", placeholder: "Cover Art", required: false }
    ],
    color: "purple"
  },
  visual_art: {
    title: "Artwork Details",
    fields: [
      { name: "style", type: "text", placeholder: "Style", required: true },
      { name: "medium", type: "text", placeholder: "Medium", required: true },
      { name: "width_px", type: "number", placeholder: "Width (px)", required: true },
      { name: "height_px", type: "number", placeholder: "Height (px)", required: true },
      { name: "dimensions_physical", type: "text", placeholder: "Physical Dimensions", required: false }
    ],
    color: "pink"
  },
  writing: {
    title: "Writing Information",
    fields: [
      { name: "author_name", type: "text", placeholder: "Author", required: true },
      { name: "word_count", type: "number", placeholder: "Word Count", required: true },
      { name: "language", type: "text", placeholder: "Language", required: true },
      { name: "writing_genre", type: "text", placeholder: "Genre", required: false },
      { name: "publication_date", type: "date", placeholder: "Publication Date", required: false }
    ],
    color: "teal"
  },
  theatre: {
    title: "Theatre Details",
    fields: [
      { name: "playwright", type: "text", placeholder: "Playwright", required: true },
      { name: "duration_minutes", type: "number", placeholder: "Duration (minutes)", required: false },
      { name: "cast_size", type: "number", placeholder: "Cast Size", required: false },
      { name: "period", type: "text", placeholder: "Historical Period", required: false }
    ],
    color: "orange"
  },
  crafts: {
    title: "Craft Details",
    fields: [
      { name: "materials", type: "text", placeholder: "Materials", required: true },
      { name: "difficulty_level", type: "select", placeholder: "Difficulty Level",
        options: ["beginner", "intermediate", "advanced", "master"], required: true },
      { name: "time_required", type: "text", placeholder: "Time Required", required: false },
      { name: "tools_required", type: "text", placeholder: "Tools Required", required: false }
    ],
    color: "amber"
  }
};

const COMMON_FIELDS = [
  { name: "title", type: "text", placeholder: "Title", required: true },
  { name: "description", type: "textarea", placeholder: "Description", required: false }
];

const colorMap = {
  theatre: 'text-white',
  writing: 'text-green-400',
  crafts: 'text-yellow-400',
  visual_art: 'text-pink-400',
  music: 'text-purple-400',
};

export const UploadFile = () => {
  const { register, handleSubmit, watch } = useForm();
  const [file, setFile] = useState(null);
  const [fileExtension, setFileExtension] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const nav = useNavigate();

  // Watch category changes
  const formCategory = watch("category");

  useEffect(() => {
    // Update selectedCategory when formCategory changes
    if (formCategory) {
      setSelectedCategory(formCategory);
    } else {
      // Set default category based on file extension if no category selected
      if (fileExtension) {
        if (['mp3', 'wav'].includes(fileExtension)) {
          setSelectedCategory('music');
        } else if (['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension)) {
          setSelectedCategory('visual_art');
        } else if (['doc', 'docx', 'rtf', 'txt'].includes(fileExtension)) {
          setSelectedCategory('writing');
        } else if (fileExtension === 'pdf') {
          setSelectedCategory('undefined');
        }
      }
    }
  }, [formCategory, fileExtension]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const ext = selectedFile.name.split('.').pop().toLowerCase();
      setFileExtension(ext);
    }
  };


  const submitHandler = async (data) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      COMMON_FIELDS.forEach(field => {
        if (data[field.name] !== undefined) {
          formData.append(field.name, data[field.name]);
        }
      });

      if (selectedCategory && CATEGORY_FIELDS[selectedCategory]) {
        CATEGORY_FIELDS[selectedCategory].fields.forEach(field => {
          if (field.type === "file") {
            if (data[field.name] && data[field.name][0]) {
              formData.append(field.name, data[field.name][0]);
            }
          } else if (data[field.name] !== undefined) {
            formData.append(field.name, data[field.name]);
          }
        });
      }
      console.log(formData);

      formData.append("is_downloadable", data.is_downloadable || false);

      let category = data.category || selectedCategory;
      if (!category) {
        if (['mp3', 'wav'].includes(fileExtension)) category = 'music';
        else if (['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension)) category = 'visual_art';
        else if (['doc', 'docx', 'rtf', 'txt'].includes(fileExtension)) category = 'writing';
        else if (fileExtension === 'pdf') category = 'writing'; // Default for PDFs
        else category = 'other';
      }
      formData.append("category", category);

      const response = await api.post("/api/v1/files/upload/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const navMap = {
        'music': routes.musicians_page.url,
        'visual_art': routes.artists_page.url,
        'writing': routes.writers_page.url,
        'theatre': routes.theatre_artists_page.url,
        'crafts': routes.craftspeople_page.url,
        'other': routes.home_page.url
      };

      // Redirect after successful upload
      if (response.status >= 200 && response.status < 300) {
        nav(navMap[category] || routes.home_page.url);
      } else {
        throw new Error("Upload failed with status: " + response.status);
      }

    } catch (err) {
      console.error("Upload error:", err.response?.data || err.message);
      alert(`Upload failed: ${err.response?.data?.error || err.message}`);
    }
  };

  const renderField = (field) => {
    const { name, type, placeholder, required, color = 'blue', options } = field;

    const commonProps = {
      name,
      ...register(name, { required }),
      placeholder,
      className: `border-b border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-${color}-500 text-white`
    };

    return (
        <div className="flex flex-col mb-4">
          <label className="text-sm text-gray-300 mb-1 flex items-center">
            {placeholder}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>

          {type === "textarea" ? (
              <textarea
                  {...commonProps}
                  className={`${commonProps.className} h-24 resize-none`}
              />
          ) : type === "select" ? (
              <select {...commonProps}>
                <option className="bg-black text-white" value="">Select {placeholder}</option>
                {options?.map(option => (
                    <option className="bg-black text-white" key={option} value={option}>
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </option>
                ))}
              </select>
          ) : type === "file" ? (
              <input
                  type="file"
                  {...commonProps}
                  className="text-white text-sm remove-autocomplete-bg"
                  accept={name === 'cover_art' ? "image/*" : "*"}
              />
          ) : (
              <input type={type} {...commonProps} />
          )}
        </div>
    );
  };

  return (
      <div className="min-h-screen bg-black text-white p-8">
        <form onSubmit={handleSubmit(submitHandler)} className="flex flex-col items-center w-full max-w-6xl mx-auto rounded-xl shadow-2xl p-6">
          <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
            File Upload
          </h2>

          {/* File Upload Section */}
          {!file ? (
              <div className="flex flex-col items-center m-5 w-full">
                <label
                    htmlFor="file-upload"
                    className="w-full max-w-md h-64 flex items-center justify-center rounded-lg border-2 border-dashed border-violet-200 bg-white/10 hover:bg-gray-700 transition-all duration-300 cursor-pointer group"
                >
                  <div className="flex flex-col items-center">
                    <svg className="w-16 h-16 text-white/50 group-hover:text-white mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                    </svg>
                    <span className="text-xl font-medium text-white/80 group-hover:text-white">Upload your file</span>
                    <span className="text-sm text-gray-400 mt-2">Click or drag and drop</span>
                  </div>
                </label>
                <input
                    id="file-upload"
                    className="absolute opacity-0 w-0 h-0"
                    type="file"
                    onChange={handleFileChange}
                    required
                />
              </div>
          ) : (
              <div className="flex flex-col items-center m-5 w-full">
                <label
                    htmlFor="file-upload"
                    className="w-full max-w-md py-6 px-4 flex items-center justify-center rounded-lg border-2 border-green-400 bg-gray-800 hover:bg-gray-700 transition-all duration-300 cursor-pointer truncate"
                >
                  <div className="flex items-center">
                    <svg className="w-8 h-8 text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-lg font-medium text-green-400 truncate max-w-xs">{file.name}</span>
                  </div>
                </label>
                <input
                    id="file-upload"
                    className="hidden"
                    type="file"
                    onChange={handleFileChange}
                    required
                />
              </div>
          )}

          {file && (
              <div className="flex flex-col w-full max-w-6xl mt-6 px-4">
                {/* Main content area with columns */}
                <div className="flex flex-row gap-6 w-full">
                  {/* Common Fields Section - now includes category selection */}
                  <div className="card-element outline outline-zinc-500 p-6 rounded-lg shadow-md flex-1">
                    <h3 className="text-xl font-semibold mb-4 text-blue-400 py-2">General Information</h3>
                    <div className="space-y-4">
                      {COMMON_FIELDS.map((field, index) => (
                          <div key={index}>
                            {renderField(field)}
                            {(index + 1) % 3 === 0 && index !== COMMON_FIELDS.length - 1 && (
                                <div className="column-break my-4 border-t border-gray-700"></div>
                            )}
                          </div>
                      ))}

                      {/* Add category selection field here if PDF */}
                      {fileExtension === 'pdf' && (
                          <>
                            <div className="column-break my-4 border-t border-gray-700"></div>
                            {renderField({
                              name: "category",
                              type: "select",
                              placeholder: "Category",
                              required: true,
                              options: ["theatre", "writing", "crafts"],
                              color: "blue"
                            })}
                          </>
                      )}
                      <div className="flex items-center mt-8">
                        <input
                            id="is_downloadable"
                            type="checkbox"
                            {...register("is_downloadable")}
                            className="remove-autocomplete-bg w-5 h-5 rounded bg-gray-900 border-gray-700 text-blue-600 focus:ring-blue-500 focus:ring-offset-gray-800"
                        />
                        <label htmlFor="is_downloadable" className="ml-2 text-sm font-medium text-gray-300">
                          File Can Be Downloaded
                        </label>
                      </div>
                    </div>

                  </div>

                  {/* Category-Specific Fields (only if category is selected) */}
                  {selectedCategory && CATEGORY_FIELDS[selectedCategory] && (
                      <div className={`card-element outline outline-zinc-500 p-6 rounded-lg shadow-md flex-1`}>
                        <h3 className={`text-xl font-semibold mb-4 ${colorMap[selectedCategory]} py-2`}>
                          {CATEGORY_FIELDS[selectedCategory].title}
                        </h3>
                        <div className="space-y-4">
                          {CATEGORY_FIELDS[selectedCategory].fields.map((field, index) => (
                              <div key={index}>
                                {renderField({
                                  ...field,
                                  color: CATEGORY_FIELDS[selectedCategory].color
                                })}
                                {(index + 1) % 3 === 0 && index !== CATEGORY_FIELDS[selectedCategory].fields.length - 1 && (
                                    <div className="column-break my-4 border-t border-gray-700"></div>
                                )}
                              </div>
                          ))}
                        </div>
                      </div>
                  )}
                </div>

                {/* Downloadable Checkbox and Submit Button */}
                <div className="flex flex-row justify-end w-full mt-6 card-element outline outline-zinc-500 p-4 rounded-lg">
                  <button
                      className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-medium py-2 px-6 rounded-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      type="submit"
                  >
                    Upload Now
                  </button>
                </div>
              </div>
          )}
        </form>
      </div>
  );
};