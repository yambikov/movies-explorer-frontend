import React from 'react';
import SectionHeader from '../SectionHeader/SectionHeader';
import avatar from '../../images/avatar.jpg';
import Link from '../Link/Link';

function AboutMe(props) {
  return (
    <section className="about-me">
      <div className='about-me__wrapper'>
        <SectionHeader title="Студент" />
        {/* <div className="about-me__content"> */}
          <div className="about-me__section-wrapper">
            <div className="about-me__info-section">
              <div className="about-me__name">Виталий</div>
              <div className="about-me__info">Фронтенд-разработчик, 30 лет</div>
              <div className="about-me__bio">Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена
                и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</div>
              <Link
                href="https://github.com/yambikov"
                label="Github"
                className="about-me__github-link"
              />
            </div>
            <img className="about-me__photo" src={avatar} alt='Аватар'></img>
          </div>
          <ul className="about-me__portfolio">
            <h4 className='about-me__portfolio-title'>Портфолио</h4>
            <li className='about-me__portfolio-item link'>
              <Link
                href="https://github.com/yambikov"
                label="Статичный сайт"
                className="about-me__portfolio-link"
              />
              <Link
                href="https://github.com/yambikov"
                label="↗"
                className="about-me__portfolio-link"
              />
            </li>
            <li className='about-me__portfolio-item link'>
              <Link
                href="https://github.com/yambikov"
                label="Адаптивный сайт"
                className="about-me__portfolio-link"
              />
              <Link
                href="https://github.com/yambikov"
                label="↗"
                className="about-me__portfolio-link"
              />
            </li>
            <li className='about-me__portfolio-item link'>
              <Link
                href="https://github.com/yambikov"
                label="Одностраничное приложение"
                className="about-me__portfolio-link"
              />
              <Link
                href="https://github.com/yambikov"
                label="↗"
                className="about-me__portfolio-link"
              />
            </li>
          </ul>


        </div>
      {/* </div> */}
    </section>
  );
}

export default AboutMe;