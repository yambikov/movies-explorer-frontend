import React, { useState } from 'react';

function SearchForm({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [inputError, setInputError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      setInputError("Нужно ввести ключевое слово");
    } else {
      setInputError("");
      onSearch(searchTerm);
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
            // aria-label="Поиск фильмов"
          />
          <button type="submit" className="search-form__submit-button link"></button>
          {inputError && <span className="input-error-name error">{inputError}</span>}
        </form>
      </div>
    </section>
  );
}

export default SearchForm;
