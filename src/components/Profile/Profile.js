// Поправить верстку после того, как кнопки поместил в form

import React, { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { CurrentUserContext } from "../../context/CurrentUserContext"
import useFormWithValidation from "../../hooks/useFormWithValidation"

function Profile({ handleUpdateUser }) {
  const navigate = useNavigate()

  const currentUser = useContext(CurrentUserContext)

  const { formValue, handleChange, errors, isFormValid, errorMessages } =
    useFormWithValidation()

  const [isEditMode, setIsEditMode] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    handleUpdateUser(formValue.name, formValue.email)
    setIsEditMode(!isEditMode)
  }

  const handleLogout = () => navigate("/")

  const toggleEditMode = () => setIsEditMode(!isEditMode)

  const saveButton = (
    <button
      type="submit"
      className={`button button__submit ${isFormValid ? "" : "button__submit_disabled"
        }`}
      disabled={!isFormValid}
    >
      Сохранить
    </button>
  )

  const editAndLogoutButtons = (
    <>
      <button
        className="profile__button link"
        type="button"
        aria-label="Редактирование данных профиля"
        onClick={toggleEditMode}
      >
        Редактировать
      </button>
      <button
        className="profile__button profile__button_logout link"
        type="button"
        aria-label="Выход из личного кабинета пользователя"
        onClick={handleLogout}
      >
        Выйти из аккаунта
      </button>
    </>
  )

  return (
    <section className="profile">
      <div className="profile__wrapper">
        <h2 className="profile__title">Привет, {currentUser.name}!</h2>
        <form className="profile__form" name="profile" onSubmit={handleSubmit}>
          <fieldset className="profile__fieldset">
            <div className="profile__input-wrapper">
              <label className="profile__label" htmlFor="name">
                Имя
              </label>
              <input
                className="profile__input"
                required
                disabled={!isEditMode}
                label="Имя"
                htmlFor="name"
                id="name"
                name="name"
                type="text"
                autoComplete="off"
                value={formValue.name || currentUser.name}
                onChange={handleChange}
                errorMessage={errors.name && errorMessages.name}
                pattern="[a-zA-Zа-яА-Я\s-]*"
                minLength={2}
                maxLength={30}
              />
            </div>
            <div className="profile__divider" />
            <div className="profile__input-wrapper">
              <label className="profile__label" htmlFor="email">
                E-mail
              </label>
              <input
                className="profile__input"
                placeholder={currentUser.email}
                label="Email"
                htmlFor="email"
                id="email"
                name="email"
                type="email"
                autoComplete="off"
                value={formValue.email || currentUser.email}
                onChange={handleChange}
                errorMessage={errors.email && errorMessages.email}
                pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                required
                disabled={!isEditMode}
              />
            </div>
          </fieldset>
          <div className="profile__bottom-wrapper">
            <span className="error-message error error__profile">
              {errors.name && errorMessages.name}
            </span>
            <span className="error-message error error__profile">
              {errors.email && errorMessages.email}
            </span>
            {isEditMode ? saveButton : editAndLogoutButtons}
          </div>
        </form>
      </div>
    </section>
  )
}

export default Profile
