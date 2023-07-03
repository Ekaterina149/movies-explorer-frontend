import "./SavedMovies.css";
import React from "react";
import { useState, useEffect } from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import MovieCardList from "../MoviesCardList/MovieCardList";
import SearchForm from "../SearchForm/SearchForm";
function SavedMovies({ list }) {
  // const [sList, setSlist] = useState([]);

  // console.log("saved-movies", list);
  // useEffect(() => {
  //   setSlist(list);
  // }, [list]);
  console.log("sList", list);
  function handleSearchSavedFilm() {}
  return (
    <section className="movie-content">
      <SearchForm onSearchFilm={handleSearchSavedFilm} />
      <MovieCardList savedmovieList={list} />
    </section>
  );
}
export default SavedMovies;
