import React from "react";

function Input({ id, name, type, placeholder, minLength, maxLength, autoComplete, value, onChange, isValid, errorMessage }) {
  return (
    <>
      <label htmlFor={id} className="auth__label">{placeholder}</label>
      <input
        id={id}
        className="auth__item"
        name={name}
        type={type}
        minLength={minLength}
        maxLength={maxLength}
        autoComplete={autoComplete}
        value={value}
        onChange={onChange}
        required
      />
      {!isValid ? <span className="input-error-name error">{errorMessage}</span> : <span className="input-error-name"></span>}

    </>
  );
}

export default Input;
