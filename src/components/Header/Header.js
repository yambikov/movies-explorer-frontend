import React from "react";
import Logo from "../Logo/Logo";
import Navigation from "../Navigation/Navigation";
import { useLocation } from "react-router-dom";

function Header(props) {
  const { pathname } = useLocation();
  const isAuthorized = false;
  const headerClass = `header${pathname !== '/' ? ' header_color_black' : ''}`;
  const headerIconClass = `header-button__account${pathname !== '/' ? ' header-button__account_color_black' : ''}`;

  const unauthorizedLinks = [
    { to: "/signup", text: "Регистрация", className: "header__registration" },
    { to: "/signin", text: "Войти", className: "button header-button__login" }
  ];

  const authorizedLinks = [
    { to: "/movies", text: "Фильмы" },
    { to: "/savedmovies", text: "Сохраненные фильмы" },
    { to: "/profile", text: "Аккаунт", className: headerIconClass }
  ];

  return (
    <header className={headerClass}>
      <div className="header__wrapper">
        <Logo />
        <Navigation links={isAuthorized ? authorizedLinks : unauthorizedLinks} className={isAuthorized ? "header__navigation-list" : "header__navigation-list_unauthorized"} />
      </div>
    </header>
  )
}

export default Header;
