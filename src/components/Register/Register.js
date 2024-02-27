// import React, { useState, useCallback } from "react";
import {Link} from "react-router-dom"
import Logo from "../Logo/Logo"
import Input from "../Input/Input"
import useFormWithValidation from "../../hooks/useFormWithValidation"
import {useState} from "react"
// import { emailPattern, namePattern } from "../../utils/constants"

function Register({onRegister}) {
  const {formValue, handleChange, errors, isFormValid, errorMessages} =
    useFormWithValidation()

  const [serverError, setServerError] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      await onRegister(formValue.name, formValue.email, formValue.password)
    } catch (error) {
      const errorMessage =
        error.message || "При регистрации произошла ошибка."
      setServerError(errorMessage)
    }
    // onRegister(formValue.name, formValue.email, formValue.password)
  }

  return (
    <main className="register">
      <section className="auth">
        <Logo />
        <form
          className="auth__form form"
          name="registration"
          onSubmit={handleSubmit}
        >
          <h2 className="auth__title">Добро пожаловать!</h2>

          <Input
            label="Имя"
            placeholder="Имя"
            htmlFor="name"
            id="name"
            name="name"
            type="text"
            autoComplete="off"
            value={formValue.name || ""}
            onChange={handleChange}
            errorMessage={errors.name && errorMessages.name}
            // pattern={namePattern}
            minLength={2}
            maxLength={30}
          />
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
            className={`auth__button ${
              isFormValid ? "auth__button_type_active" : ""
            }`}
            type="submit"
            disabled={!isFormValid}
          >
            Зарегистрироваться
          </button>
          <p className="auth__text">
            Уже зарегистрированы?
            <Link className="auth__login-link" to="/signin">
              Войти
            </Link>
          </p>
        </form>
      </section>
    </main>
  )
}

export default Register
