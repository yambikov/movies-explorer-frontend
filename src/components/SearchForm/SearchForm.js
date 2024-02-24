import React, { useState } from "react"
import { useEffect } from "react"
import togglerOn from '../../images/smalltumb_color.svg';
import togglerOff from '../../images/smalltumb_black.svg';

function SearchForm({ onSearch, searchError }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [inputError, setInputError] = useState("")
  const [isShort, setIsShort] = useState(false);

  useEffect(() => {
    setSearchTerm(localStorage.getItem("searchTerm"))
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!searchTerm.trim()) {
      setInputError("Нужно ввести ключевое слово")
    } else {
      setInputError("")
      onSearch(searchTerm)
    }
  }

  const shortFilmToggler = () => {
    setIsShort(!isShort);
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
          // aria-label="Поиск фильмов"
          />
          <button
            type="submit"
            className="search-form__submit-button link"
          ></button>
          {searchError ? (
            <div className="error">Во время запроса произошла ошибка...</div>
          ) : inputError ? (
            <span className="input-error-name error">{inputError}</span>
          ) : null}
        </form>
        <div className="search-form__short-films">
          <button className="search-form__toggle-button" onClick={shortFilmToggler}>
            <img src={isShort ? togglerOn : togglerOff} alt="Toggle" />
          </button>
          <p className="search-form__short-films-text">Короткометражки</p>
        </div>
      </div>
    </section>
  )
}

export default SearchForm