import React from "react";
// import Link from "../Link/Link";
import { Link } from "react-router-dom";

function NavTab(props) {
  return (
    <section className="navtab">
      <nav className="navtab__navigation">
        <ul className="navtab__navigation-list">
          <li>
            <Link
              to="#about"
              className="navtab__navigation-item link">
              О проекте
            </Link>
          </li>
          <li>
            <Link
              to="#technologies"
              className="navtab__navigation-item link">
              Технологии
            </Link>
          </li>
          <li>
            <Link
              to="#student"
              className="navtab__navigation-item link">
              Студент
            </Link>


          </li>
        </ul>
      </nav>
    </section>
  );
}

export default NavTab;