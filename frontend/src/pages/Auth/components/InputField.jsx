import React from "react";

export const InputField = ({
  id,
  img,
  type = "text",
  placeholder,
  register,
  validation,
  error,
}) => {
  return (
    <div className="input-container">
      <div className="input-field-container">
        <img src={img} alt={`${id}-icon`} />
        <input
          type={type}
          id={id}
          placeholder={placeholder}
          {...register(id, validation)}
        />
      </div>
      <div className="error-container">
        <h5 role="alert" className="error-message">
          {error?.message}
        </h5>
      </div>
    </div>
  );
};
