import "./SavedMovies.css";
import React from "react";
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
    <main className="movie-content">
      <SearchForm onSearchFilm={handleSearchSavedFilm} />
      <MovieCardList savedmovieList={list} />
    </main>
  );
}
export default SavedMovies;
