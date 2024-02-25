import React from "react"
import {useState} from "react"
import {useLocation} from "react-router-dom"

function MoviesCard(props) {
  // console.log(props);
  const location = useLocation()
  const savedMovieLink = location.pathname === "/saved-movies"

  const [isLiked, setIsLiked] = useState(savedMovieLink)

  // const handleLikeClick = () => {
  //   setIsLiked(!isLiked)
  // }
  const handleLikeClick = () => {
    isLiked ? handleDeleteMovie(props.movieId) : handleSaveMovie(props);
  }
  

  const handleSaveMovie = () => {
    console.log(`MoviesCard.handleSaveMovie props:`);
    console.log(props);
    console.log('=======================================================================');
    props.onMovieSave(props)
    setIsLiked(true); 
  }

  const handleDeleteMovie = () => {
    console.log(`MoviesCard.handleDeleteMovie props:`);
    console.log(props);
    console.log('=======================================================================');
    props.onMovieDelete(props)
    setIsLiked(false);
  }



  const cardLikeButtonClassName = `movie-card__like-button link ${
    isLiked && "movie-card__like-button_active"
  }${savedMovieLink ? " movie-card__saved-movie-delete" : ""}`

  function formatDuration(minutesDuration) {
    const hours = Math.floor(minutesDuration / 60)
    const minutes = Math.floor(minutesDuration % 60)

    const hoursString = hours > 0 ? hours + "ч " : ""
    const minutesString = minutes > 0 ? minutes + "м" : "00 м"

    return hoursString + minutesString
  }

  const formattedDuration = formatDuration(props.duration)

  const handleCardClick = () => {
    window.open(props.trailerLink, "_blank")
  }

  return (
    <div
      className={`movie-card movies-card-list__card ${
        savedMovieLink ? " movie-card__saved-movie-card" : ""
      }`}
    >
      {/* <div
        // onClick={handleClick}
        className="movie-card__image">
      </div> */}
      <img
        className="movie-card__image"
        alt={props.nameRU}
        src={props.image}
        onClick={handleCardClick}
      />

      <div className="movie-card__container">
        <div className="movie-card__info">
          <h2 className="movie-card__title">{props.nameRU}</h2>
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
