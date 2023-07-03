import React from "react";
import "./MovieCard.css";
import { useState } from "react";
// import { movieList } from "../../utils/constants.js";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
function MovieCard({ card, onLike }) {
  // const { name, duration, image } = movieList[0];

  // const { name, duration, image } = card;
  const { pathname } = useLocation();
  const [isLiked, setLiked] = useState(false);
  function deleteMovie(card) {}
  function addToSelected() {
    setLiked(!isLiked);
    onLike(card);
  }
  return (
    <article className="moviecard">
      <img
        className="moviecard__image"
        alt="Картинка фильма"
        src={card?.image}
      />
      <div className="moviecard-box">
        <p className="moviecard-box__title">{card?.name}</p>
        <button
          className={`moviecard-box__like-button ${
            pathname === "/saved-movies" &&
            "moviecard-box__like-button_type_delete"
          } ${isLiked ? "moviecard-box__like-button_type_active" : ""} `}
          onClick={() => {
            onLike && addToSelected();
          }}
        ></button>
      </div>
      <p className="moviecard__duration">{card?.duration}</p>
    </article>
  );
}
export default MovieCard;
