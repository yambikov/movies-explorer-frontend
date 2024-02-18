import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import useFormWithValidation from "../../hooks/useFormWithValidation"

// // Custom hook for form validation and error message
// const useFormValidation = (formValues) => {
//   const [isFormValid, setIsFormValid] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');

//   useEffect(() => {
//     const { email, name } = formValues;
//     const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
//     const isNameValid = name.length >= 2;
//     let errorText = '';

//     if (!isEmailValid) {
//       errorText = 'Неверный формат email.';
//     } else if (!isNameValid) {
//       errorText = 'Имя должно содержать минимум 2 символа.';
//     }

//     setErrorMessage(errorText);
//     setIsFormValid(isEmailValid && isNameValid);
//   }, [formValues]);

//   return { isFormValid, errorMessage };
// };

function Profile({handleUpdateUser}) {
  const navigate = useNavigate();
  const currentUser = useContext(CurrentUserContext);
  // const [data, setData] = useState({
  //   name: currentUser.name,
  //   email: currentUser.email,
  // });
  const { formValue, handleChange, errors, isFormValid, errorMessages } = useFormWithValidation();

  // const [formValue, setFormValue] = useState({
  //   name: currentUser.name,
  //   email: currentUser.email,
  // });
  const [isEditMode, setIsEditMode] = useState(false);
  // const { isFormValid, errorMessage } = useFormValidation(formValue);

  // function handleSubmit(e) {
  //   console.log('handleSubmit');
  //   e.preventDefault();
  //   onLogin(formValue.email, formValue.password);
  // }

  // function handleChange(e) {
  //   const { name, value } = e.target;
  //   setData({ ...data, [name]: value });
  // }

  async function handleSubmit(e) {
    e.preventDefault();
    if (await handleUpdateUser(formValue.name, formValue.email)) {
      setIsEditMode(!isEditMode);
    }
  }


  const handleLogout = () => navigate("/");

  const toggleEditMode = () => setIsEditMode(!isEditMode);

  return (
    <section className="profile">
      <div className="profile__wrapper">
        <h2 className="profile__title">Привет, {currentUser.name}!</h2>
        <form className="profile__form" name="profile">
          <fieldset className="profile__fieldset">
            <div className="profile__input-wrapper">
              <label className="profile__label" htmlFor="name">Имя</label>
              <input
                className="profile__input"
                required
                disabled={!isEditMode}
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
                pattern="[a-zA-Zа-яА-Я\s-]*"
                minLength={2}
                maxLength={30}
              />
            </div>
            <div className="profile__divider" />
            <div className="profile__input-wrapper">
              <label className="profile__label" htmlFor="email">E-mail</label>
              <input
                className="profile__input"
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
                required
                disabled={!isEditMode}
              />
            </div>
          </fieldset>
        </form>

        <div className="profile__bottom-wrapper">
          <span className="error-message error error__profile">{"errorMessage"}</span>
          {isEditMode ? (
            <button
              // onClick={toggleEditMode}
              buttonType="submit"
              className={`button button__submit ${isFormValid ? "" : "button__submit_disabled"}`}
              disabled={!isFormValid}
              onSubmit={handleSubmit}
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
