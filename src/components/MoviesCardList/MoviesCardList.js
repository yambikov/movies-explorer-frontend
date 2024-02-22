// import React, { useState } from 'react';
import MoviesCard from "../MoviesCard/MoviesCard";
import { useLocation } from 'react-router-dom';


function MoviesCardList(props) {
  const location = useLocation();
  const activeLink = location.pathname === "/movies";

  return (
    <section className="movies-card-list">
      <div className="movies-card-list__wrapper">
        <div className="movies-card-list__container">
          {/* <MoviesCard /> */}
        </div>
        {activeLink && <button type="button" className="movies-card-list__button link">Ещё</button>}
      </div>
    </section>
  );
}

export default MoviesCardList;
