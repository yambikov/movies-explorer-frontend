import React from 'react';
import Link from '../Link/Link';

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
                href="https://github.com/yambikov"
                label="Яндекс.Практикум"
                className="footer__link"
              />
            </li>
            <li className='footer__navigation-item'>
              <Link
                href="https://github.com/"
                label="Github"
                className="footer__link"
              />
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;