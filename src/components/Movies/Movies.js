import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
// import Preloader from '../Preloader/Preloader';

function Movies(props) {
  return (
    <main>
    <SearchForm />
    <MoviesCardList />
    </main>
    
  );
}

export default Movies;