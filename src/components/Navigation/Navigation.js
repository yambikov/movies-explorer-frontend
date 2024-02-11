import React from "react";
import { NavLink } from 'react-router-dom';

function Navigation({ links, className }) {
  return (
    <nav className="header__navigation">
      <ul className={className}>
        {links.map((link, index) => (
          <li key={index}>
            <NavLink
              to={link.to}
              className={`header__navigation-item link ${link.className}`}
              activeClassName="">
              {link.text}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navigation;
