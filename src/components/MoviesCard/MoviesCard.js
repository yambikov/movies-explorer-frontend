import React from "react";
// import { CurrentUserContext } from "../contexts/CurrentUserContext";
// import TestImage from '../../images/movie-test-image.png'


function MoviesCard(props) {

  // // привязываем контекст
  // const currentUser = React.useContext(CurrentUserContext);

  // // Определяем, являемся ли мы владельцем текущей карточки
  // const isOwn = props.card.owner === currentUser._id;

  // // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  // const isLiked = props.card.likes.some(item => item === currentUser._id);

  // // Создаём переменную, которую после зададим в `className` для кнопки лайка
  // const cardLikeButtonClassName = (
  //   `movie-card__like ${isLiked && 'movie-card__like_active'}`
  // );

  // function handleClick() {
  //   props.onCardClick(props.card);
  // }

  // function handleLikeClick(){
  //   props.onCardLike(props.card)
  // }

  // function handleDeleteClick() {
  //   props.onCardDelete(props.card)
  // }

  return (
    <div className="movie-card movies-card-list__card">
      <div
        // onClick={handleClick}
        className="movie-card__image"
        style={{
          backgroundImage: `url(https://allbestmovies.ru/uploads/posts/2019-11/1574668630_7fa899cc59a6669cb82376f6313c69e8_ce_1484x925x0x655_cropped_960x600.jpg)`,
          backgroundSize: 'cover', // Вы можете добавить эту строку, чтобы изображение заполнило весь блок
          backgroundPosition: 'center', // Вы можете добавить эту строку, чтобы изображение было выровнено по центру
        }}
      >
      </div>

      <div className="movie-card__container">
        <div className="movie-card__info">
          <h2 className="movie-card__title">Имя карточки</h2>
          <span className="movie-card__chrono">1ч 3м</span>
        </div>
        <button className='movie-card__like-button' type="button"></button>
      </div>
    </div>
  );

}

export default MoviesCard;
