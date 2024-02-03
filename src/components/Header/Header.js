import React from "react";
import Logo from "../Logo/Logo";
import Button from "../Button/Button";
import { NavLink, Link, useLocation } from 'react-router-dom';
// import { useState } from "react";

function Header(props) {

  const location = useLocation();
  const headerClass = location.pathname !== '/' ? 'header header_color_black' : 'header';
  const headerIconClass = location.pathname !== '/' ? 'button__account button__account_color_black' : 'button__account';
  const isAuthorized = true;

  const unauthorizedHeader = (
    <div className="header__auth-wrapper">
      <Link
        to="/signup"
        className="header__registration link">
        Регистрация
      </Link>

      {/* <Button
        className="button__login"
        text="Войти" /> */}

      <Link
        to="/signin"
        className="button button__login">
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
      <Button
        className={headerIconClass}
        text="Аккаунт" />
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