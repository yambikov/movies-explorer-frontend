import React, { useState, useEffect, useCallback } from "react";
import Logo from "../Logo/Logo";
import Navigation from "../Navigation/Navigation";
import { useLocation } from "react-router-dom";

function Header(loggedIn) {
  const { pathname } = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const loggedIn = false; // Это значение должно быть определено в зависимости от состояния аутентификации пользователя
  // console.log(loggedIn);
  console.log(loggedIn);

  const handleResize = useCallback(() => {
    setIsMobile(window.innerWidth <= 768);
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const headerClass = `${pathname !== '/' ? ' header_color_black' : ' header_color_green'}`;
  const headerIconClass = `header-button__account${pathname !== '/' ||  isMenuOpen ? ' header-button__account_color_black' : ''}`;

  const unauthorizedLinks = [
    { to: "/signup", text: "Регистрация", className: "header__registration" },
    { to: "/signin", text: "Войти", className: "button header-button__login" }
  ];

  // Стандартные ссылки для авторизованных пользователей
  let authorizedLinks = [
    { to: "/movies", text: "Фильмы" },
    { to: "/saved-movies", text: "Сохраненные фильмы" },
    { to: "/profile", text: "Аккаунт", className: headerIconClass }
  ];

  // Добавляем ссылку на главную страницу, если isMobile
  if (isMobile) {
    authorizedLinks = [{ to: "/", text: "Главная" }, ...authorizedLinks];
  }

  return (
    <header className={`header${headerClass}`}>
      <div className="header__wrapper">
        <Logo />
        {isMobile && loggedIn ? (
          <div className={isMenuOpen ? `header__menu header_color_black` : ""}>
            <button className="burger link" onClick={toggleMenu}>
              <span className={!isMenuOpen ? "burger__icon" : "burger__icon burger__icon_type_close"}></span>
            </button>
            {isMenuOpen && (
              <Navigation
                links={authorizedLinks}
                className={!isMenuOpen ? "header__navigation-list" : "header__navigation-list_type_left"}
                onCloseMenu={closeMenu}
                isMenuOpen={isMenuOpen}
              />
            )}
          </div>
        ) : (
          <Navigation
            links={loggedIn ? authorizedLinks : unauthorizedLinks}
            className={loggedIn ? "header__navigation-list" : "header__navigation-list_unauthorized"}
          />
        )}
      </div>
    </header>
  );
}

export default Header;
