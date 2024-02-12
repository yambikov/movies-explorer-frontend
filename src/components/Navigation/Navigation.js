// Navigation.js
import React from "react";
import { NavLink } from 'react-router-dom';

function Navigation({ links, className, onCloseMenu, isMenuOpen }) {
  return (
    <nav className={!isMenuOpen ? "header__navigation" : "header__navigation_type_left"}>
      <ul className={className}>
        {links.map((link, index) => (
          <li key={index}>
            <NavLink
              to={link.to}
              // className={`header__navigation-item link ${link.className}`}
              activeClassName=""
              onClick={onCloseMenu} // Закрытие меню при клике на ссылку
              className={!isMenuOpen ? `header__navigation-item link ${link.className}` : `header__navigation-item_type_left link ${link.className}`}
            >
              {link.text}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navigation;
