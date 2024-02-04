// import React, { useState } from 'react';
import MoviesCard from "../MoviesCard/MoviesCard";


function MoviesCardList(props) {

  return (
    <section className="movies-card-list">
      <div className="movies-card-list__wrapper">
        <div className="movies-card-list__container">
          {/* <div className="movies-card-list__card">
          </div> */}
          <MoviesCard />
          <MoviesCard />
          <MoviesCard />
          <MoviesCard />
          <MoviesCard />
          <MoviesCard />
          <MoviesCard />
          <MoviesCard />
          <MoviesCard />
          <MoviesCard />
          <MoviesCard />
          <MoviesCard />
          <MoviesCard />
        </div>
      </div>
    </section>
  );
}

export default MoviesCardList;
