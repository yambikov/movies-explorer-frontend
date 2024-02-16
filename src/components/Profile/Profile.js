import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Custom hook for form validation and error message
const useFormValidation = (formValues) => {
  const [isFormValid, setIsFormValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const { email, name } = formValues;
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isNameValid = name.length >= 2;
    let errorText = '';

    if (!isEmailValid) {
      errorText = 'Неверный формат email.';
    } else if (!isNameValid) {
      errorText = 'Имя должно содержать минимум 2 символа.';
    }

    setErrorMessage(errorText);
    setIsFormValid(isEmailValid && isNameValid);
  }, [formValues]);

  return { isFormValid, errorMessage };
};

function Profile() {
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState({
    name: "Виталий",
    email: "pochta@yandex.ru",
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const { isFormValid, errorMessage } = useFormValidation(formValue);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue(prevFormValue => ({
      ...prevFormValue,
      [name]: value,
    }));
  };

  const handleLogout = () => navigate("/");

  const toggleEditMode = () => setIsEditMode(!isEditMode);

  return (
    <section className="profile">
      <div className="profile__wrapper">
        <h2 className="profile__title">Привет, Виталий!</h2>
        <form className="profile__form" name="profile">
          <fieldset className="profile__fieldset">
            <div className="profile__input-wrapper">
              <label className="profile__label" htmlFor="name">Имя</label>
              <input
                className="profile__input"
                name="name"
                id="name"
                type="text"
                minLength={2}
                maxLength={30}
                autoComplete="off"
                required
                disabled={!isEditMode}
                value={formValue.name}
                onChange={handleChange}
              />
            </div>
            <div className="profile__divider"/>
            <div className="profile__input-wrapper">
              <label className="profile__label" htmlFor="email">E-mail</label>
              <input
                className="profile__input"
                id="email"
                name="email"
                type="email"
                autoComplete="off"
                required
                disabled={!isEditMode}
                onChange={handleChange}
                value={formValue.email}
              />
            </div>
          </fieldset>
        </form>
        
        <div className="profile__bottom-wrapper">
        <span className="error-message error error__profile">{errorMessage}</span>
          {isEditMode ? (
            <button
              onClick={toggleEditMode}
              className={`button button__submit ${isFormValid ? "" : "button__submit_disabled"}`}
              disabled={!isFormValid}
            >
              Сохранить
            </button>
          ) : (
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
          )}
        </div>
      </div>
    </section>
  );
}

export default Profile;
