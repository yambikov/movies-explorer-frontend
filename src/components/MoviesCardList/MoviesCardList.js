import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";

function MoviesCardList({
  movies = [],
  visibleMovies,
  loadMore,
  moviesLength,
  loading,
  noResultsFound // Добавлена запятая
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
          ) : noResultsFound ? ( // Использование тернарного оператора для условного рендеринга
            <p>Ничего не найдено</p> // Использование <p> для текста
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
        {visibleMovies < moviesLength && !noResultsFound && ( // Условие для отображения кнопки "Ещё", если есть результаты
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
  );
}

export default MoviesCardList;
