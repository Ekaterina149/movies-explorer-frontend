import "./Movies.css";
import React from "react";
import MovieCardList from "../MoviesCardList/MovieCardList";
import { useState, useEffect } from "react";
import { useLocalStorage } from "../../hook/useLocalStorage";
import Preloader from "../Preloader/Preloader";
import movieApi from "../../utils/MovieApi";
import Message from "../Message/Message";
import PopupApiError from "../PopupApiError/PopupApiError";
import SearchForm from "../SearchForm/SearchForm";
import { filterMovies, filterShortMovies } from "../../utils/utils";
function Movies({
  onSaveMovie,
  onDeleteMovie,
  savedMovies,
  apiError,
  onApiError,
}) {
  const localStorage = useLocalStorage();
  // стейт - все фильмы
  const [allFilms, setAllFilms] = useState([]);
  // стейт  - фильмы отфильтрованные по ключевому слову
  const [filteredMovies, setFilteredMovies] = useState(
    localStorage.getItemOrDefault("movies", [])
  );
  // стейт - положения тумблера короткометражек
  const [shortFilms, setShortFilms] = useState(
    localStorage.getItemOrDefault("checkbox", false)
  );
  // стейт - ключевое слово
  const [search, setSearch] = useState(
    localStorage.getItemOrDefault("search", "")
  );
  // стейт состояние - Ничего не нашли!
  const [isNothingFound, setIsNothingFound] = useState(false);
  // стейт состояние - Не искали!
  const [isNotSearched, setIsNotSearched] = useState(true);
  // стейт - загружаем
  const [isLoaging, setLoading] = useState(false);
  // const [isError, setIsError] = useState(false);

  // функция обработчик клика тумблеру короткометражек
  function handleShortFilms() {
    setShortFilms(!shortFilms);
    localStorage.setItem("checkbox", !shortFilms);
  }
  // функция фильтрации фильмов по ключевому слову и положению тумблера короткометражек
  function handleFilterMovie() {
    if (!allFilms.length) return;

    const searchMovies = filterMovies(allFilms, search);

    setFilteredMovies(searchMovies);
    localStorage.setItem("movies", searchMovies);
  }

  // функция обработчик отправки запроса
  function handleSubmit(keyword) {
    setSearch(keyword);
    localStorage.setItem("search", keyword);
    localStorage.setItem("checkbox", shortFilms);
    if (!allFilms.length) {
      setLoading(true);
      movieApi
        .getMovies()
        .then((data) => {
          const res = data.map((item) => ({
            country: item["country"],
            director: item["director"],
            duration: item["duration"],
            year: item["year"],
            description: item["description"],
            image: `https://api.nomoreparties.co${item["image"]["url"]}`,
            trailerLink: item["trailerLink"],
            thumbnail: `https://api.nomoreparties.co${item["image"]["url"]}`,
            movieId: item["id"],
            nameRU: item["nameRU"],
            nameEN: item["nameEN"],
          }));
          setAllFilms(res);
        })
        .catch((err) => {
          console.log("film error", err);
          onApiError(true);
        })
        .finally(() => setLoading(false));
    }
  }
  // функция закрытия попапа с ошибкой
  function closePopup() {
    onApiError(false);
  }

  // фильтруем фильмы по новому запросу
  useEffect(handleFilterMovie, [search, shortFilms, allFilms]);
  useEffect(() => {
    if (search !== "") {
      setIsNotSearched(false);
      const arr = shortFilms
        ? filterShortMovies(filteredMovies)
        : filteredMovies;
      arr.length ? setIsNothingFound(false) : setIsNothingFound(true);
    }
  }, [search, shortFilms, allFilms]);
  //функция возвращающая разметку в зависимости от состояния стейтов
  function movieContainer() {
    if (isLoaging) return <Preloader />;
    if (isNothingFound) return <Message message={"Ничего не найдено"} />;
    if (isNotSearched) return <Message message={"Вы пока ничего не искали"} />;
    return (
      <MovieCardList
        isSavedMoviePage={false}
        savedMovies={savedMovies}
        onSaveMovie={onSaveMovie}
        onDeleteMovie={onDeleteMovie}
        movieList={
          shortFilms ? filterShortMovies(filteredMovies) : filteredMovies
        }
      />
    );
  }
  return (
    <main className="movie-content">
      <SearchForm
        onSearchFilm={handleSubmit}
        // filteredMovies={filteredMovies}
        onCheckboxPos={handleShortFilms}
        shortFilms={shortFilms}
      />
      {movieContainer()}
      <PopupApiError
        isError={apiError}
        onClose={closePopup}
        message={
          "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
        }
      />
    </main>
  );
}
export default Movies;
