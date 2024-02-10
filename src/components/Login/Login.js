import React, { useState } from "react";
import Input from "../Input/Input";
import Logo from "../Logo/Logo";
import { Link } from "react-router-dom"

const Login = ({ onLogin }) => {
  const [formValue, setFormValue] = useState({
    password: "",
    email: "",
  });

  const [isFormValid, setIsFormValid] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(formValue.password, formValue.email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });

    validateForm();
  };

  // Функция валидации для проверки, является ли форма валидной
  const validateForm = () => {
    const { email, password } = formValue;

    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isPasswordValid = password.length >= 6;

    setIsFormValid(isEmailValid && isPasswordValid);
  };

  return (
    <main className="register">
      <section className="auth">
        <Logo />
        <form className="auth__form" name="registration" onSubmit={handleSubmit}>
          <h2 className="auth__title">Рады видеть!</h2>
          {/* Используем компонент Input вместо прямого использования input */}
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            minLength={2}
            maxLength={30}
            autoComplete="off"
            value={formValue.email}
            onChange={handleChange}
          />
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Пароль"
            autoComplete="off"
            value={formValue.password}
            onChange={handleChange}
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
