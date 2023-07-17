import { SHORT_FILM_DUR } from "./constants";

function filterMovies(movies, search, shortFilms) {
  const searchWords = search.trim().toLowerCase();
  function checkName(name) {
    return name.toLowerCase().indexOf(searchWords) > -1;
  }
  const moviesSearch = movies.filter(
    (movie) => checkName(movie.nameRU) || checkName(movie.nameEN)
  );
  if (shortFilms === true) {
    return filterShortMovies(moviesSearch);
  }
  return moviesSearch;
}
// функция фильтрации фильмов по длительности (короткометражки)
function filterShortMovies(movies) {
  return movies.filter((film) => film.duration < SHORT_FILM_DUR);
}

export { filterMovies, filterShortMovies };
