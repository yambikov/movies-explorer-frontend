import React, { useState } from "react";

function SearchForm(props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchError, setSearchError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Проверяем, что введенный текст не пустой и не состоит только из пробелов
    if (!searchTerm.trim()) {
      setSearchError("Нужно ввести ключевое слово");
    } else {
      setSearchError(""); // Очищаем ошибку, если она была
      props.onSubmit(searchTerm); // Здесь логика для отправки данных или выполнения поиска
    }
  };

  return (
    <section className="search-form">
      <form className="search-form__form" onSubmit={handleSubmit}>
        <input
          name="search"
          type="text"
          placeholder="Фильм"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-form__input"
        />
        <button type="submit" className="search-form__submit-button link">Поиск</button>
        {searchError && <span className="input-error">{searchError}</span>}
      </form>
    </section>
  );
}

export default SearchForm;
