// Navigation.js
import React from "react";
import { NavLink } from 'react-router-dom';

function Navigation({ links, className, onCloseMenu, isMenuOpen }) {
  const navigationClass = !isMenuOpen ? "header__navigation" : "header__navigation_type_left";
  const listItemClass = isMenuOpen ? "header__navigation-item-li" : "";

  return (
    <nav className={navigationClass}>
      <ul className={className}>
        {links.map((link) => (
          <li className={listItemClass} key={link.to}>
            <NavLink
              to={link.to}
              activeClassName="link_active"
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
