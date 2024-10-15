import React from "react";

export const InputField = ({
  id,
  img,
  type = "text",
  placeholder,
  register,
  validation,
  showPasswordImg,
  togglePasswordVisibility,
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
        {/* {(id === "password" || id === "passwordConfirmation") && (
          <img
            className="show-password-image"
            src={showPasswordImg}
            alt="toggle visibility"
            onMouseDown={() => togglePasswordVisibility(true, id)}
            onMouseUp={() => togglePasswordVisibility(false, id)}
            style={{ cursor: "pointer" }}
          />
        )} */}
      </div>
      <div className="error-container">
        <h5 role="alert" className="error-message">
          {error?.message}
        </h5>
      </div>
    </div>
  );
};
