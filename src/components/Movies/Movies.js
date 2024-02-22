import React, { useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import moviesApi from "../../utils/MoviesApi";

function Movies() {
  const [movies, setMovies] = useState([]);

  const getAndFilterMovies = (searchTerm) => {
    moviesApi.getMovies()
      .then((data) => {
        const filteredMovies = data.filter(movie =>
          movie.nameRU.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setMovies(filteredMovies);
      })
      .catch((err) => {
        console.error("Ошибка при получении фильмов: ", err);
        // Здесь можно добавить обработку ошибок, например, установить состояние ошибки
      });
  };

  return (
    <main>
      <SearchForm onSearch={getAndFilterMovies} />
      <MoviesCardList movies={movies} />
    </main>
  );
}

export default Movies;
