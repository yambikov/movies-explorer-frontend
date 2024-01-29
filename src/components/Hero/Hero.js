import React from "react";
import Link from "../../Link/Link";

function Hero(props) {
  return (
    <section className="hero">
      <div className="hero__container">
        <h1 className="hero__header">Учебный проект студента факультета Веб-разработки</h1>
      </div>
      <nav className="hero__navigation">
        <ul className="hero__navigation-list">
          <li>
            <Link
              href="#about-project"
              label="О проекте"
              className="hero__navigation-item"
            />
          </li>
          <li>
            <Link
              href="#technologies"
              label="Технологии"
              className="hero__navigation-item"
            />
          </li>
          <li>
            <Link
              href="#student"
              label="Студент"
              className="hero__navigation-item"
            />
          </li>
        </ul>
      </nav>
    </section>
  );
}

export default Hero;
