import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { useState } from 'react';
// import Preloader from '../Preloader/Preloader';

function Movies(props) {
  const [movies, setMovies] = useState([]);

  return (
    <main>
      <SearchForm setMovies={setMovies} />
      <MoviesCardList movies={movies} />
    </main>
  );
}

export default Movies;