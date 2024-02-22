// import React, { useState } from 'react';
import MoviesCard from "../MoviesCard/MoviesCard"
import {useLocation} from "react-router-dom"

function MoviesCardList({movies}) {
  const location = useLocation()
  const activeLink = location.pathname === "/movies"
  

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
        {activeLink && (
          <button type="button" className="movies-card-list__button link">
            Ещё
          </button>
        )}
      </div>
    </section>
  )
}

export default MoviesCardList
