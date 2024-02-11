import React, { useState, useEffect, useCallback } from "react";
import Logo from "../Logo/Logo";
import Navigation from "../Navigation/Navigation";
import { useLocation } from "react-router-dom";

function Header() {
  const { pathname } = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isAuthorized = true; // Это значение должно быть определено в зависимости от состояния аутентификации пользователя

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

  const headerClass = `header${pathname !== '/' ? ' header_color_black' : ''}`;
  const headerIconClass = `header-button__account${pathname !== '/' ? ' header-button__account_color_black' : ''}`;

  const unauthorizedLinks = [
    { to: "/signup", text: "Регистрация", className: "header__registration" },
    { to: "/signin", text: "Войти", className: "button header-button__login" }
  ];

  // Стандартные ссылки для авторизованных пользователей
  let authorizedLinks = [
    { to: "/movies", text: "Фильмы" },
    { to: "/savedmovies", text: "Сохраненные фильмы" },
    { to: "/profile", text: "Аккаунт", className: headerIconClass }
  ];

  // Добавляем ссылку на главную страницу, если isMobile
  if (isMobile) {
    authorizedLinks = [{ to: "/", text: "Главная" }, ...authorizedLinks];
  }

  return (
    <header className={headerClass}>
      <div className="header__wrapper">
        <Logo />
        {isMobile && isAuthorized ? (
          <>
            <button className="burger link" onClick={toggleMenu}>
            <span className={!isMenuOpen ? "burger__icon" : "burger__icon burger__icon_type_close"}></span>
            </button>
            {isMenuOpen && (
              <Navigation
                links={authorizedLinks}
                className="header__navigation-list"
                onCloseMenu={closeMenu}
              />
            )}
          </>
        ) : (
          <Navigation
            links={isAuthorized ? authorizedLinks : unauthorizedLinks}
            className={isAuthorized ? "header__navigation-list" : "header__navigation-list_unauthorized"}
          />
        )}
      </div>
    </header>
  );
}

export default Header;
