import React from "react";
import Link from "../Link/Link";

function NavTab(props) {
  return (
    <section className="navtab">
      <nav className="navtab__navigation">
        <ul className="navtab__navigation-list">
          <li>
            <Link
              href="#about"
              label="О проекте"
              className="navtab__navigation-item"
            />
          </li>
          <li>
            <Link
              href="#technologies"
              label="Технологии"
              className="navtab__navigation-item"
            />
          </li>
          <li>
            <Link
              href="#student"
              label="Студент"
              className="navtab__navigation-item"
            />
          </li>
        </ul>
      </nav>
    </section>
  );
}

export default NavTab;