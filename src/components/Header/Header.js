import React from "react"
import Logo from "../Logo/Logo"
import AccountButton from "../AccountButton/AccountButton"

function Header(props) {

  return (
    <header className="header">
      <div className="header__container">
      <Logo />
        <div className="header__navigation-container">
          <nav className="header__navigation">
            <ul className="header__navigation-list">
              <li>
                <a className="header__navigation-item" href="/">Фильмы</a>
              </li>
              <li>
                <a className="header__navigation-item" href="/">Сохраненные фильмы</a>
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