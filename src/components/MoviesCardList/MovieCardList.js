import React from "react";
import { useState, useEffect } from "react";
import "./MovieCardList.css";
import MovieCard from "../MoviesCard/MovieCard";
import { useLocation } from "react-router-dom";
function MovieCardList({ onLike, movieList, savedmovieList }) {
  //  const [list, setList] = useState(movieList);
  const { pathname } = useLocation();
  return (
    <section className="moovie">
      <div className="moovie-container">
        {pathname === "/movies"
          ? movieList.map(
              (card, index) =>
                card && <MovieCard key={index} card={card} onLike={onLike} />
            )
          : savedmovieList.map(
              (card, index) =>
                card && <MovieCard key={index} card={card} onLike={onLike} />
            )}
      </div>
      {pathname === "/movies" && (
        <button className="moovie__button">{"Еще"}</button>
      )}
    </section>
  );
}

export default MovieCardList;
