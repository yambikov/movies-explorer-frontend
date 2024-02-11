// Navigation.js
import React from "react";
import { NavLink } from 'react-router-dom';

function Navigation({ links, className, onCloseMenu }) {
  return (
    <nav className="header__navigation">
      <ul className={className}>
        {links.map((link, index) => (
          <li key={index}>
            <NavLink
              to={link.to}
              className={`header__navigation-item link ${link.className}`}
              activeClassName=""
              onClick={onCloseMenu} // Закрытие меню при клике на ссылку
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
