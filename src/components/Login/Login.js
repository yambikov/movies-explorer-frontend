import React from "react";
import Input from "../Input/Input";
import Logo from "../Logo/Logo";
import { Link } from "react-router-dom"
import useFormWithValidation from "../../hooks/useFormWithValidation"
import { useState } from "react"

const Login = ({ onLogin }) => {

  const { formValue, handleChange, errors, isFormValid, errorMessages } = useFormWithValidation();
  const [serverError, setServerError] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await onLogin(formValue.email, formValue.password);
    } catch (error) {
      console.log(error);
      const errorMessage = error.message
      setServerError(errorMessage);
    }
  }


  return (
    <main className="register">
      <section className="auth">
        <Logo />
        <form className="auth__form" name="registration" onSubmit={handleSubmit}>
          <h2 className="auth__title">Рады видеть!</h2>
          <Input
            placeholder="E-mail"
            label="Email"
            htmlFor="email"
            id="email"
            name="email"
            type="email"
            autoComplete="off"
            value={formValue.email || ""}
            onChange={handleChange}
            errorMessage={errors.email && errorMessages.email}
            // pattern={emailPattern}

          />
          <Input
            placeholder="Пароль"
            label="Пароль"
            htmlFor="password"
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            value={formValue.password || ""}
            onChange={handleChange}
            errorMessage={errors.password && errorMessages.password}
            minLength={8}
          />
          <span className="error-message error error__profile">
            {serverError}
          </span>
          <button
            className={`auth__button auth__button_login ${isFormValid ? "auth__button_type_active" : ""}`}
            type="submit"
            disabled={!isFormValid}
          >
            Войти
          </button>
          <p className="auth__text">
            Ещё не зарегистрированы?
            <Link className="auth__login-link" to="/signup">
              Регистрация
            </Link>
          </p>
        </form>
      </section>
    </main>
  );
};

export default Login;
