import React, { forwardRef } from 'react';
import SectionHeader from '../SectionHeader/SectionHeader';
import avatar from '../../images//2024-02-15 08.42.59.jpg';
import { Link } from "react-router-dom";
import { useContext } from 'react';
import { CurrentUserContext } from '../../context/CurrentUserContext';



const PortfolioLink = ({ href, children }) => (
  <li className='about-me__portfolio-item link'>
    <a href={href} className='about-me__portfolio-link-container' target="_blank" rel="noopener noreferrer">
      <h3 className="about-me__portfolio-link">{children}</h3>
      <p className="about-me__portfolio-link">↗</p>
    </a>
  </li>
);

const AboutMe = forwardRef((props, ref) => {
  const currentUser = useContext(CurrentUserContext);


  return (
    <section ref={ref} className="about-me">
      <div className='about-me__wrapper'>
        <SectionHeader title="Студент" />
        <div className="about-me__section-wrapper">
          <div className="about-me__info-section">
            <div className='about-me__info-container'>
              <div className="about-me__name">{currentUser.name}</div>
              <div className="about-me__info">Фронтенд-разработчик, 35 лет</div>
              <div className="about-me__bio">Я родился в Оренбурге, живу в Москве. Закончил факультет экономики ОГУ, а также режиссерский факультет ЧГИК. Я люблю путешествия, особенно велотуризм. Свой первый код написал 20 лет назад, когда в качестве экзамена по информатике, сделал сайт для своей школы. Работал режиссером на телеканале Россия, строил видеопродакшены в компаниях VK и Сбер. Мне интересно совместить программирование с производством медиаконтента.</div>
              {/* <div className="about-me__bio">Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить.
                С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</div> */}
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
          {/* <PortfolioLink href="https://yambikov.github.io/rabbit-the-game/">Браузерная игра (в разработке)</PortfolioLink> */}
        </ul>
      </div>
    </section>
  );
})

export default AboutMe;
