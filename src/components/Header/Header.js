import React from "react";
import Logo from "../Logo/Logo";
// import Button from "../Button/Button";
import { NavLink, Link, useLocation } from 'react-router-dom';
// import { useState } from "react";

function Header(props) {

  const location = useLocation();
  const headerClass = location.pathname !== '/' ? 'header header_color_black' : 'header';
  const headerIconClass = location.pathname !== '/' ? 'header-button__account header-button__account_color_black' : 'header-button__account';
  const isAuthorized = false;

  const unauthorizedHeader = (
    <div className="header__auth-wrapper">
      <Link
        to="/signup"
        className="header__registration link">
        Регистрация
      </Link>

      {/* <Button
        className="header-button__login"
        text="Войти" /> */}

      <Link
        to="/signin"
        className="button header-button__login">
        Войти
      </Link>
    </div>
  );

  const authorizedHeader = (
    <div className="header__navigation-wrapper">
      <nav className="header__navigation">
        <ul className="header__navigation-list">
          <li>
            <NavLink
              to="/movies"
              className="header__navigation-item link"
              activeClassName="">
              Фильмы
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/movies"
              className="header__navigation-item link"
              activeClassName="">
              Сохраненные фильмы
            </NavLink>
          </li>
        </ul>
      </nav>
      <Link
        className={`link ${headerIconClass}`}
        to="/profile">
        Аккаунт
      </Link>
    </div>
  );

  return (
    <header className={headerClass}>
      <div className="header__wrapper">
        <Logo />
        {isAuthorized ? authorizedHeader : unauthorizedHeader}
      </div>

    </header>
  )
}

export default Header