import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [isEditMode, setIsEditMode] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const editModeOff = (
    <div className="profile__bottom-wrapper">
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
    </div>
  );

  const editModeOn = (
    <div className="profile__bottom-wrapper">
      <button
        onClick={toggleEditMode}
        className="button button__submit"
      >
        Сохранить
      </button>
    </div>
  );

  return (
    <section className="profile">
      <div className="profile__wrapper">
        <div>
        <h2 className="profile__title">Привет, Виталий!</h2>
        <form className="profile__form" name="profile">
          <fieldset className="profile__fieldset">
            <div className="profile__input-wrapper">
              <label className="profile__label" htmlFor="name">
                Имя
              </label>
              <input
                className="profile__input"
                id="name"
                type="text"
                minLength="2"
                maxLength="30"
                autoComplete="on"
                defaultValue="Виталий"
                required
                disabled={!isEditMode}
              />
            </div>
            <div className="profile__divider" />
            <div className="profile__input-wrapper">
              <label className="profile__label" htmlFor="email">
                E-mail
              </label>
              <input
                className="profile__input"
                id="email"
                type="email"
                autoComplete="on"
                defaultValue="pochta@yandex.ru"
                required
                disabled={!isEditMode}
              />
            </div>
          </fieldset>
        </form>
        </div>

        {isEditMode ? editModeOn : editModeOff}
      </div>
    </section>
  );
}

export default Profile;
