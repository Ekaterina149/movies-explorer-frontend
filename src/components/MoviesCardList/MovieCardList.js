import React from "react";
import { useState, useEffect } from "react";
import "./MovieCardList.css";
import MovieCard from "../MoviesCard/MovieCard";
import LikeButton from "../LikeButton/LikeButton";
import DeleteButton from "../DeleteButton/DeleteButton";
import {
  MAX_WIDTH_QUANTITY,
  BRAKEPOINT_WIDTH_QUANTITY_1280,
  BRAKEPOINT_WIDTH_QUANTITY_760,
  BRAKEPOINT_WIDTH_QUANTITY_320,
  MAX_WIDTH_ADD_QUANTITY,
  BRAKEPOINT_WIDTH_ADD_QUANTITY_1280,
  BRAKEPOINT_WIDTH_ADD_QUANTITY_760,
  BRAKEPOINT_WIDTH_ADD_QUANTITY_320,
  MAX_WIDTH,
  MID_WIDTH,
  MIN_WIDTH,
} from "../../utils/constants";

import { useWindowWidth } from "../../hook/useWindowWidth";

function MovieCardList({
  movieList,
  isSavedMoviePage,

  savedMovies,
  onSaveMovie,
  onDeleteMovie,
}) {
  const [list, setList] = useState([]);
  const [cardsShowParams, setCardsShowParams] = useState({ sum: 0, more: 0 });
  const width = useWindowWidth();
  function handleGrid() {
    if (width > MAX_WIDTH) {
      //XL
      setCardsShowParams({
        sum: MAX_WIDTH_QUANTITY,
        more: MAX_WIDTH_ADD_QUANTITY,
      });
    } else if (width <= MAX_WIDTH && width > MID_WIDTH) {
      setCardsShowParams({
        sum: BRAKEPOINT_WIDTH_QUANTITY_1280,
        more: BRAKEPOINT_WIDTH_ADD_QUANTITY_1280,
      });
    } else if (width <= MID_WIDTH && width > MIN_WIDTH) {
      setCardsShowParams({
        sum: BRAKEPOINT_WIDTH_QUANTITY_760,
        more: BRAKEPOINT_WIDTH_ADD_QUANTITY_760,
      });
    } else if (width <= MIN_WIDTH) {
      setCardsShowParams({
        sum: BRAKEPOINT_WIDTH_QUANTITY_320,
        more: BRAKEPOINT_WIDTH_ADD_QUANTITY_320,
      });
    }
    handleUpdateList();
  }

  function handleUpdateList() {
    setList(movieList.slice(0, cardsShowParams.sum));
  }

  // обработчик клика по кнопке "Еще"
  function handleClickMoreMovies() {
    const start = list.length;
    const end = start + cardsShowParams.more;
    const residual = movieList.length - start;

    if (residual > 0) {
      const newCards = movieList.slice(start, end);
      setList([...list, ...newCards]);
    }
  }

  useEffect(handleUpdateList, [movieList, cardsShowParams.sum]);
  useEffect(handleGrid, [width]);
  useEffect(handleGrid, []);

  return (
    <section className="moovie">
      <div className="moovie-container">
        {list.map((card) => (
          <MovieCard key={card.movieId} card={card}>
            {isSavedMoviePage ? (
              <DeleteButton handleClick={() => onDeleteMovie(card)} />
            ) : (
              <LikeButton
                onLike={() => onSaveMovie(card)}
                onDisLike={() => onDeleteMovie(card)}
                isLiked={savedMovies.some((item) => {
                  return item.movieId === card.movieId;
                })}
              />
            )}
          </MovieCard>
        ))}
      </div>

      {list.length < movieList.length && !isSavedMoviePage && (
        <button className="moovie__button" onClick={handleClickMoreMovies}>
          {"Еще"}
        </button>
      )}
    </section>
  );
}

export default MovieCardList;
