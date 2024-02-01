import React from "react"
import Logo from "../Logo/Logo"
import Link from "../Link/Link";
import AccountButton from "../AccountButton/AccountButton"

function Header(props) {

  return (
    <header className="header">
      <div className="header__wrapper">
        <Logo />
        <div className="header__navigation-wrapper">
          <nav className="header__navigation">
            <ul className="header__navigation-list">
              <li>
                <Link
                  href="#films"
                  label="Фильмы"
                  className="header__navigation-item"
                />
              </li>
              <li>
                <Link
                  href="#films"
                  label="Сохраненные фильмы"
                  className="header__navigation-item"
                />
              </li>
            </ul>
          </nav>
          <AccountButton />
        </div>
      </div>
    </header>
  )
}

export default Header