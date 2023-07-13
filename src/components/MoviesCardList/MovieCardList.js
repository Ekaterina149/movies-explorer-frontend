import React from "react";
import { useState, useEffect } from "react";
import "./MovieCardList.css";
import MovieCard from "../MoviesCard/MovieCard";
import Preloader from "../Preloader/Preloader";
import LikeButton from "../LikeButton/LikeButton";
import DeleteButton from "../DeleteButton/DeleteButton";

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
    if (width > 1331) {
      //XL
      setCardsShowParams({ sum: 8, more: 3 });
    } else if (width <= 1331 && width > 1027) {
      setCardsShowParams({ sum: 12, more: 3 });
    } else if (width <= 1027 && width > 629) {
      setCardsShowParams({ sum: 8, more: 2 });
    } else if (width <= 629) {
      setCardsShowParams({ sum: 5, more: 2 });
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
