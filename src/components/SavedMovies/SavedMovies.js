import React from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
// import Preloader from '../Preloader/Preloader';

function SavedMovies(props) {
  return (
    <main>
      <SearchForm />
      <MoviesCardList />
    </main>

  );
}

export default SavedMovies;