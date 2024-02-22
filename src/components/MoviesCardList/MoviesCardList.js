import React from 'react';
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({ movies = [] }) {
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
      </div>
    </section>
  );
}

export default MoviesCardList;
