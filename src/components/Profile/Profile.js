import React from "react";

function Profile() {
  return (
    <section className="profile">
      <div className="profile__wrapper">
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
              />
            </div>
          </fieldset>

        </form>
        <div className="profile__buttons">
          <button
            className="profile__button link"
            type="submit"
            aria-label="Редактирование данных профиля"
          >
            Редактировать
          </button>
          <button
            className="profile__button profile__button_logout link"
            type="button"
            aria-label="Выход из личного кабинета пользователя"
          >
            Выйти из аккаунта
          </button>
        </div>
      </div>
    </section>
  );
}

export default Profile;
