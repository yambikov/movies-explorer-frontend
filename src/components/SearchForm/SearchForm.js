import React, { useState } from 'react';
import togglerOn from '../../images/smalltumb_color.svg';
import togglerOff from '../../images/smalltumb_black.svg';

function SearchForm(props) {
  const [isToggled, setIsToggled] = useState(false);

  const toggleButton = () => {
    setIsToggled(!isToggled);
  };

  return (
    <section className="search-form">
      <div className="search-form__wrapper">
        <form className="search-form__form">
          <input type="text" placeholder="Фильм" className="search-form__input" />
          <button type="submit" className="search-form__submit-button link"></button>
        </form>
        <div className="search-form__short-films">
          <button className="search-form__toggle-button link" onClick={toggleButton}>
            <img src={isToggled ? togglerOn : togglerOff} alt="Toggle" />
          </button>
          <p className="search-form__short-films-text">Короткометражки</p>
        </div>
      </div>
    </section>
  );
}

export default SearchForm;
