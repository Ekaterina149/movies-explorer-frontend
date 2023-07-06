import "./Movies.css";
import React from "react";
import { movieList } from "../../utils/constants.js";
import MovieCardList from "../MoviesCardList/MovieCardList";
import SearchForm from "../SearchForm/SearchForm";
function Movies({ onLikeClick }) {
  function handleSearchFilm() {}
  return (
    <main className="movie-content">
      <SearchForm onSearchFilm={handleSearchFilm} />
      <MovieCardList onLike={onLikeClick} movieList={movieList} />
    </main>
  );
}
export default Movies;
