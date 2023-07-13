// функция фильтрации фильмов по ключевому слову
// function filterMovies(movieList, keyword) {
//   const words = keyword.toLowerCase().split(" ");

//   const list = movieList.filter((movie) => {
//     const isRU = movie.nameRU
//       .toLowerCase()
//       .split(" ")
//       .find((word) => words.includes(word));
//     const isEN = movie.nameEN
//       .toLowerCase()
//       .split(" ")
//       .find((word) => words.includes(word));

//     return isRU || isEN;
//   });
//   return list;
// }

function filterMovies(movies, search) {
  const searchWords = search.trim().toLowerCase();
  function checkName(name) {
    return name.toLowerCase().indexOf(searchWords) > -1;
  }
  return movies.filter(
    (movie) => checkName(movie.nameRU) || checkName(movie.nameEN)
  );
}
// функция фильтрации фильмов по длительности (короткометражки)
function filterShortMovies(movies) {
  return movies.filter((film) => film.duration < 40);
}

export { filterMovies, filterShortMovies };
