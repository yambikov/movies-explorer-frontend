import React from "react"
import MoviesCard from "../MoviesCard/MoviesCard"
import Preloader from "../Preloader/Preloader"

function MoviesCardList({
  // movies = [],
  movies,
  visibleMovies,
  loadMore,
  moviesLength,
  loading,
  noResultsFound,
  onMovieSave,
  onMovieDelete,
  _id,
  savedMovies,
  cardsFromSavedMovies,
}) {

  console.log(movies)

  return (
    <section className="movies-card-list">
      <div className="movies-card-list__wrapper">
        <ul
          className={
            loading
              ? "movies-card-list__container_preloader"
              : "movies-card-list__container"
          }
        >
          {loading ? (
            <Preloader />
          ) : noResultsFound ? ( // Использование тернарного оператора для условного рендеринга
            <p>Ничего не найдено</p> // Использование <p> для текста
          ) : (
            movies.map((movie) => (

              <MoviesCard
                key={movie.id}
                nameRU={movie.nameRU}
                nameEN={movie.nameEN}
                thumbnail={
                  cardsFromSavedMovies
                    ? movie.image
                    : `https://api.nomoreparties.co${movie.image.url}`
                }
                image={
                  cardsFromSavedMovies
                    ? movie.image
                    : `https://api.nomoreparties.co${movie.image.url}`
                }

                duration={movie.duration}
                trailerLink={movie.trailerLink}
                country={movie.country}
                director={movie.director}
                year={movie.year}
                description={movie.description}
                movieId={movie.id}
                savedMovies={savedMovies}
                onMovieSave={onMovieSave}
                onMovieDelete={onMovieDelete}
                cardsFromSavedMovies={cardsFromSavedMovies}
                movie={movie}
              />

            ))

          )}
        </ul>
        {visibleMovies < moviesLength &&
          !noResultsFound && ( // Условие для отображения кнопки "Ещё", если есть результаты
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
