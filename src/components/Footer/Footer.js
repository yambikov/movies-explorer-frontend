import React from 'react';
import { Link } from "react-router-dom"

function Footer(props) {

  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__wrapper">
        <p className='footer__text'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
        <div className='footer__bottom-wrapper'>
          <p className='footer__copyright'>© {currentYear}</p>
          <ul className='footer__navigation'>
            <li className='footer__navigation-item'>
              <Link
                to="https://practicum.yandex.ru/"
                className="footer__link link"
                target="_blank">
                Яндекс.Практикум
              </Link>
            </li>
            <li className='footer__navigation-item'>
              <Link
                to="https://github.com/"
                className="footer__link link"
                target="_blank">
                Github
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;