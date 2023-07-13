import React, { useEffect } from "react";
import "./MovieCard.css";
import { useState } from "react";
// import { movieList } from "../../utils/constants.js";
import { Link, useLocation } from "react-router-dom";
function MovieCard({ card, children }) {
  return (
    <article className="moviecard">
      <Link className="moviecard__link" to={card.trailerLink} target="_blank">
        <img
          className="moviecard__image"
          alt="Картинка фильма"
          src={card.image}
        />
      </Link>
      <div className="moviecard-box">
        <p className="moviecard-box__title">{card.nameRU}</p>
        {children}
      </div>
      <p className="moviecard__duration">{`${Math.floor(card.duration / 60)}ч ${
        card.duration % 60
      }м`}</p>
    </article>
  );
}
export default MovieCard;
