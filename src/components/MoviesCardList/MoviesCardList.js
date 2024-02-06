// import React, { useState } from 'react';
import MoviesCard from "../MoviesCard/MoviesCard";


function MoviesCardList(props) {

  return (
    <section className="movies-card-list">
      <div className="movies-card-list__wrapper">
        <div className="movies-card-list__container">
          <MoviesCard />
          <MoviesCard />
          <MoviesCard />
          <MoviesCard />
          <MoviesCard />
        </div>
        <button type="button" className="movies-card-list__button link">Ещё</button>
        {/* <div className="movies-card-list__button">122222333333</div> */}
      </div>
    </section>
  );
}

export default MoviesCardList;
