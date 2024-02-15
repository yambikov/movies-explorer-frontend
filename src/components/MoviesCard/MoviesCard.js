import React from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";


function MoviesCard(props) {

  const location = useLocation();
  const savedMovieLink = location.pathname === "/saved-movies";

  const [isLiked, setIsLiked] = useState(savedMovieLink);


  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  const cardLikeButtonClassName = (
    `movie-card__like-button link ${isLiked && 'movie-card__like-button_active'}${savedMovieLink ? ' movie-card__saved-movie-delete' : ''}`
  );


  return (
    <div className={`movie-card movies-card-list__card
    ${savedMovieLink ? ' movie-card__saved-movie-card' : ''}`}>
      <div
        // onClick={handleClick}
        className="movie-card__image">
      </div>

      <div className="movie-card__container">
        <div className="movie-card__info">
          <h2 className="movie-card__title">Gimme Danger. История Игги и The Stooges</h2>
          <span className="movie-card__chrono">1ч 3м</span>
        </div>
        <button
          className={cardLikeButtonClassName}
          type="button"
          onClick={toggleLike}></button>
      </div>
    </div>
  );

}

export default MoviesCard;
