import React from "react";
import Input from "../Input/Input";
import Logo from "../Logo/Logo";
import { Link } from "react-router-dom"
import useFormWithValidation from "../../hooks/useFormWithValidation"

const Login = ({ onLogin }) => {

  const { formValue, handleChange, errors, isFormValid, errorMessages } = useFormWithValidation();

  function handleSubmit(e) {
    console.log('handleSubmit');
    e.preventDefault();
    onLogin(formValue.email, formValue.password);
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
            pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
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
