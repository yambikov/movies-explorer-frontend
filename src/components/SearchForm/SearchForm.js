import React, { useState } from "react"
import togglerOn from "../../images/smalltumb_color.svg"
import togglerOff from "../../images/smalltumb_black.svg"

function SearchForm(props) {
  const [isToggled, setIsToggled] = useState(false)
  const [searchTerm, setSearchTerm] = useState("");
  const [searchError, setSearchError] = useState("");


  const toggleButton = () => {
    setIsToggled(!isToggled)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // Проверяем, что введенный текст не пустой и не состоит только из пробелов
    if (!searchTerm.trim()) {
      setSearchError("Нужно ввести ключевое слово");
    } else {
      setSearchError("");
      console.log('search submit');
      // props.onSubmit(searchTerm); // Здесь логика для отправки данных или выполнения поиска
    }
  };

  return (
    <section className="search-form">
      <div className="search-form__wrapper">
        <form className="search-form__form" onSubmit={handleSubmit}>
          <input
            name="search"
            type="text"
            placeholder="Фильм"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-form__input"
            autoComplete="off"
          />
          <button type="submit" className="search-form__submit-button link"></button>
          {searchError && <span className="input-error-name error">{searchError}</span>}
        </form>
        <div className="search-form__short-films">
          <button className="search-form__toggle-button" onClick={toggleButton}>
            <img src={isToggled ? togglerOn : togglerOff} alt="Toggle" />
          </button>
          <p className="search-form__short-films-text">Короткометражки</p>
        </div>
      </div>
    </section>
  )
}

export default SearchForm
