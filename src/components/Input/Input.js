import React from "react";

function Input({ id, name, type, placeholder, minLength, maxLength, autoComplete, value, onChange }) {
  return (
    <>
      <label htmlFor={id} className="auth__label">{placeholder}</label>
      <input
        id={id}
        className="auth__item"
        name={name}
        type={type}
        // placeholder={placeholder}
        minLength={minLength}
        maxLength={maxLength}
        autoComplete={autoComplete}
        value={value}
        onChange={onChange}
        required
      />
      <span className="input-error-name error" />
    </>
  );
}

export default Input;
