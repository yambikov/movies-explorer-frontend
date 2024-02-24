import React from "react"
import MoviesCard from "../MoviesCard/MoviesCard"
import Preloader from "../Preloader/Preloader"

function MoviesCardList({
  movies = [],
  visibleMovies,
  loadMore,
  moviesLength,
  loading
}) {

  return (
    <section className="movies-card-list">
      <div className="movies-card-list__wrapper">
        <div
          className={
            loading
              ? "movies-card-list__container_preloader"
              : "movies-card-list__container"
          }
        >
          {loading ? (
            <Preloader />
          ) : (
            movies.map((movie) => (
              <MoviesCard
                key={movie.id}
                movie={movie}
                nameRU={movie.nameRU}
                image={`https://api.nomoreparties.co${movie.image.url}`}
                duration={movie.duration}
                trailerLink={movie.trailerLink}
              />
            ))
          )}
        </div>

        {visibleMovies < moviesLength && (
          <button
            type="button"
            className="movies-card-list__button link"
            onClick={loadMore}
          >
            Ещё
          </button>
        )}
      </div>
    </section>
  )
}

export default MoviesCardList
