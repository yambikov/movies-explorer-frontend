// Поправить верстку после того, как кнопки поместил в form

import React, { useState, useContext, useEffect } from "react"
// import {useNavigate} from "react-router-dom"
import { CurrentUserContext } from "../../context/CurrentUserContext"
import useFormWithValidation from "../../hooks/useFormWithValidation"
// import { emailPattern, namePattern } from "../../utils/constants"

function Profile({ handleUpdateUser, handleLogout }) {
  // const navigate = useNavigate()

  const currentUser = useContext(CurrentUserContext)

  // const { formValue, handleChange, errors, isFormValid, errorMessages } =
  const { formValue, handleChange, errors, isFormValid, errorMessages } =
    useFormWithValidation()

  const [isEditMode, setIsEditMode] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [serverError, setServerError] = useState(null)
  const [isUpdateSuccessful, setIsUpdateSuccessful] = useState(false)

  useEffect(() => {
    let timer
    if (isUpdateSuccessful) {
      timer = setTimeout(() => {
        setIsUpdateSuccessful(false)
      }, 1000)
    }
    return () => clearTimeout(timer)
  }, [isUpdateSuccessful])

  const isDataUnchanged =
    (formValue.name === undefined || formValue.name === currentUser.name) &&
    (formValue.email === undefined || formValue.email === currentUser.email)

  async function handleSubmit(e) {
    e.preventDefault()
    setIsLoading(true)
    setIsUpdateSuccessful(false) // Сбросить состояние успешного обновления при новой отправке
    try {
      await handleUpdateUser(
        formValue.name || currentUser.name,
        formValue.email || currentUser.email
      )
      setIsEditMode(!isEditMode)
      setIsUpdateSuccessful(true) // Установить состояние успешного обновления после успешного выполнения
    } catch (error) {
      const errorMessage =
        error.message || "При обновлении профиля произошла ошибка."
      setServerError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  function toggleEditMode() {
    setIsEditMode(!isEditMode)
    setIsUpdateSuccessful(false)
  }

  const saveButton = (
    <button
      type="submit"
      className={`button button__submit ${isFormValid && !isDataUnchanged ? "" : "button__submit_disabled"
        }`}
      disabled={!isFormValid || isDataUnchanged}
    >
      {isLoading ? <div className="button__preloader"></div> : "Сохранить"}
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
                value={
                  formValue.name !== undefined
                    ? formValue.name
                    : currentUser.name
                }
                onChange={handleChange}
                // errorMessage={errors.name && errorMessages.name}
                // pattern={namePattern}
                minLength={2}
              // maxLength={30}
              />
            </div>
            <div className="profile__divider" />
            <div className="profile__input-wrapper">
              <label className="profile__label" htmlFor="email">
                E-mail
              </label>
              <input
                className="profile__input"
                // placeholder={currentUser.email}
                label="Email"
                htmlFor="email"
                id="email"
                name="email"
                type="email"
                autoComplete="off"
                value={
                  formValue.email !== undefined
                    ? formValue.email
                    : currentUser.email
                }
                onChange={handleChange}
                // errorMessage={errors.email && errorMessages.email}
                // pattern={emailPattern}
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
            <span className="error-message error error__profile">
              {serverError}
            </span>
            <span
              className={`error-message success success__profile ${!isUpdateSuccessful ? "success__profile_hide" : ""
                }`}
            >
              {isUpdateSuccessful ? "Профиль успешно изменен" : ""}
            </span>

            {isEditMode ? saveButton : editAndLogoutButtons}
          </div>
        </form>
      </div>
    </section>
  )
}

export default Profile
