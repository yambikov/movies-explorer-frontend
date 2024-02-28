import React, {useState} from "react"
import {useEffect} from "react"
import togglerOn from "../../images/smalltumb_color.svg"
import togglerOff from "../../images/smalltumb_black.svg"

function SearchForm({
  onSearch,
  searchError,
  toggleShortFilter,
  cardsFromSavedMovies
}) {
  const [searchTerm, setSearchTerm] = useState("")
  const [inputError, setInputError] = useState("")
  const [isShort, setIsShort] = useState(false) // Исходное состояние false

  useEffect(() => {
    // Чтение сохраненных значений из localStorage
    const storedSearchTerm = localStorage.getItem("searchTerm")
    const storedIsShort = localStorage.getItem("isShort") === "true" // Преобразование строки в булево значение
    // console.log(`before setIsShort in useEffect in SearchForm isShort: ${storedIsShort}`);

    if (storedSearchTerm && !cardsFromSavedMovies) {
      setSearchTerm(storedSearchTerm)
    }
    if (!cardsFromSavedMovies) {
      setIsShort(storedIsShort)
    } // Установка значения чекбокса из локального хранилища
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!searchTerm.trim()) {
      setInputError("Нужно ввести ключевое слово")
    } else {
      setInputError("")
      onSearch(searchTerm, isShort)
      localStorage.setItem("initialSearchDone", true)
    }
  }

  const shortFilmToggler = () => {
    const newIsShort = !isShort
    setIsShort(newIsShort)
    onSearch(searchTerm, newIsShort);
    if (!cardsFromSavedMovies) {
      localStorage.setItem("isShort", newIsShort)
    }
    toggleShortFilter() // Вызов функции для обновления фильтра в родительском компоненте
    // console.log(`after toggle shortFilmToggler in search form isShort: ${newIsShort}`);
  }

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
          <button
            className="search-form__toggle-button"
            onClick={shortFilmToggler}
          >
            <img src={isShort ? togglerOn : togglerOff} alt="Toggle" />
          </button>
          <p className="search-form__short-films-text">Короткометражки</p>
        </div>
      </div>
    </section>
  )
}

export default SearchForm
