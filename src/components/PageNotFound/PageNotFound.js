import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function PageNotFound() {

  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1)
  };

  return (
    <section className="page-not-found">
      <div className="page-not-found__wrapper">
        <h2 className="page-not-found__title">404</h2>
        <p className="page-not-found__subtitle">Страница не найдена</p>
        <Link onClick={goBack} className="page-not-found__link link">Назад</Link>
      </div>
    </section>
  );
}

export default PageNotFound;
