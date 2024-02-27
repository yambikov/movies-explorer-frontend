import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function MoviesCard({ movieId, nameRU, image, duration, trailerLink, savedMovies, onMovieSave, onMovieDelete, country, director, year, description, thumbnail, nameEN, cardsFromSavedMovies, movie }) {
  const location = useLocation()
  const savedMovieLink = location.pathname === "/saved-movies"

  // const [isLiked, setIsLiked] = useState(savedMovieLink)
  useEffect(() => {
    const isMovieSaved = savedMovies.some((savedMovie) => savedMovie.movieId === movieId);
    setIsLiked(isMovieSaved);
  }, [savedMovies, movieId]);

  const [isLiked, setIsLiked] = useState(false);
  // console.log(image);

  const handleLikeClick = () => {
    isLiked || cardsFromSavedMovies ? handleDeleteMovie() : handleSaveMovie();
  }

  const handleSaveMovie = () => {
    onMovieSave({ movieId, nameRU, image, duration, trailerLink, country, director, year, description, thumbnail, nameEN });
    setIsLiked(true);
  }

  const handleDeleteMovie = () => {
    // onMovieDelete({ movieId })
    onMovieDelete(!cardsFromSavedMovies ? { movieId }  : movie.movieId );
    setIsLiked(false);
  }

  const cardLikeButtonClassName = `movie-card__like-button link ${isLiked && "movie-card__like-button_active"
    }${savedMovieLink ? " movie-card__like-button_active movie-card__saved-movie-delete" : ""}`

  function formatDuration(minutesDuration) {
    const hours = Math.floor(minutesDuration / 60)
    const minutes = Math.floor(minutesDuration % 60)

    const hoursString = hours > 0 ? hours + "ч " : ""
    const minutesString = minutes > 0 ? minutes + "м" : "00 м"

    return hoursString + minutesString
  }

  const formattedDuration = formatDuration(duration)

  const handleCardClick = () => {
    window.open(trailerLink, "_blank")
  }

  return (
    <div 
      className={`movie-card movies-card-list__card ${savedMovieLink ? " movie-card__saved-movie-card" : ""
        }`}
    >
      <img
        className="movie-card__image"
        alt={nameRU}
        src={image}
        onClick={handleCardClick}
      />

      <div className="movie-card__container">
        <div className="movie-card__info">
          <h2 className="movie-card__title">{nameRU}</h2>
          <span className="movie-card__chrono">{formattedDuration}</span>
        </div>
        <button
          className={cardLikeButtonClassName}
          type="button"
          onClick={handleLikeClick}
        ></button>
      </div>
    </div>
  )
}

export default MoviesCard
