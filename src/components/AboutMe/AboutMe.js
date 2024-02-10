import React from 'react';
import SectionHeader from '../SectionHeader/SectionHeader';
import avatar from '../../images/avatar.jpg';
import { Link } from "react-router-dom"

// Возможно создание отдельного компонента для элементов портфолио
const PortfolioLink = ({ href, children }) => (
  <li className='about-me__portfolio-item link'>
    <a href={href} className="about-me__portfolio-link" target="_blank" rel="noopener noreferrer">
      {children}
    </a>
    <a href={href} className="about-me__portfolio-link" target="_blank" rel="noopener noreferrer">↗</a>
  </li>
);

function AboutMe() {
  return (
    <section className="about-me">
      <div className='about-me__wrapper'>
        <SectionHeader title="Студент" />
        <div className="about-me__section-wrapper">
          <div className="about-me__info-section">
            <div className='about-me__info-container'>
              <div className="about-me__name">Виталий</div>
              <div className="about-me__info">Фронтенд-разработчик, 30 лет</div>
              <div className="about-me__bio">Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы</div>
            </div>
            <Link
              className='about-me__github-link link'
              to="https://github.com/yambikov"
              target="_blank">
              Github
            </Link>
            {/* <a href="https://github.com/yambikov" className="about-me__github-link">Github</a> */}
          </div>
          <img className="about-me__photo" src={avatar} alt='Аватар' />
        </div>
        <ul className="about-me__portfolio">
          <h4 className='about-me__portfolio-title'>Портфолио</h4>
          <PortfolioLink href="https://github.com/yambikov/how-to-learn">Статичный сайт</PortfolioLink>
          <PortfolioLink href="https://github.com/yambikov/russian-travel">Адаптивный сайт</PortfolioLink>
          <PortfolioLink href="https://github.com/yambikov/react-mesto-api-full-gha">Одностраничное приложение</PortfolioLink>
        </ul>
      </div>
    </section>
  );
}

export default AboutMe;
