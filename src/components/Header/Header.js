import React from "react";
import Logo from "../Logo/Logo";
import Link from "../Link/Link";
import Button from "../Button/Button";
// import { useState } from "react";

function Header(props) {

  const isAuthorized = true;

  const unauthorizedHeader = (
    <div className="header__auth-wrapper">
      <Link
        href="#films"
        label="Регистрация"
        className="header__registration"
      />
      <Button
        className="button__login"
        text="Войти" />
    </div>
  );

  const authorizedHeader = (
    <div className="header__navigation-wrapper">
      <nav className="header__navigation">
        <ul className="header__navigation-list">
          <li>
            <Link
              href="#films"
              label="Фильмы"
              className="header__navigation-item"
            />
          </li>
          <li>
            <Link
              href="#films"
              label="Сохраненные фильмы"
              className="header__navigation-item"
            />
          </li>
        </ul>
      </nav>
      <Button
        className="button__account"
        text="Аккаунт" />
    </div>
  );

  return (
    <header className="header">
      <div className="header__wrapper">
          <Logo />
          {isAuthorized ? authorizedHeader : unauthorizedHeader}
        </div>

    </header>
  )
}

export default Header