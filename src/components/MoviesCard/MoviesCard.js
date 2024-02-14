import React from "react";
import { useState } from "react";


function MoviesCard(props) {

  const [isLiked, setIsLiked] = useState(false);

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  const cardLikeButtonClassName = (
    `movie-card__like-button ${isLiked && 'movie-card__like-button_active'}`
  );

  return (
    <div className="movie-card movies-card-list__card">
      <div
        // onClick={handleClick}
        className="movie-card__image"
        style={{
          backgroundImage: `url(https://allbestmovies.ru/uploads/posts/2019-11/1574668630_7fa899cc59a6669cb82376f6313c69e8_ce_1484x925x0x655_cropped_960x600.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
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
