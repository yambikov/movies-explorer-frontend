import React from 'react';
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({ movies = [], visibleMovies, loadMore, moviesLength }) {

  return (
    <section className="movies-card-list">
      <div className="movies-card-list__wrapper">
        <div className="movies-card-list__container">
          {movies.map((movie) => (
            <MoviesCard
              key={movie.id}
              movie={movie}
              nameRU={movie.nameRU}
              image={`https://api.nomoreparties.co${movie.image.url}`}
              duration={movie.duration}
              trailerLink={movie.trailerLink}
            />
          ))}
        </div>

        {visibleMovies < moviesLength && <button type="button" className="movies-card-list__button link" onClick={loadMore}>Ещё</button>}

      </div>
    </section>
  );
}

export default MoviesCardList;
