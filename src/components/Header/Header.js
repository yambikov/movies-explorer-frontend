import React from "react";
import Logo from "../Logo/Logo";
import Navigation from "../Navigation/Navigation";
import { useLocation } from "react-router-dom";

function Header(props) {
  const { pathname } = useLocation();
  const isAuthorized = true;
  const headerClass = `header${pathname !== '/' ? ' header_color_black' : ''}`;
  const headerIconClass = `header-button__account${pathname !== '/' ? ' header-button__account_color_black' : ''}`;

  const unauthorizedLinks = [
    { to: "/signup", text: "Регистрация" },
    { to: "/signin", text: "Войти" }
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
        {/* <div className="header__navigation-wrapper"> */}
          <Navigation links={isAuthorized ? authorizedLinks : unauthorizedLinks} />
        {/* </div> */}
      </div>
    </header>
  )
}

export default Header;
