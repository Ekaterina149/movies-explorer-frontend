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
import { MOVIE_BASEURL_PIC } from "../../utils/constants";
import { filterMovies, filterShortMovies } from "../../utils/utils";
function Movies({
  onSaveMovie,
  onDeleteMovie,
  savedMovies,
  apiError,
  onApiError,
}) {
  const localStorage = useLocalStorage();

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

  function handleCheckFilteredMovies(arr) {
    arr.length === 0 ? setIsNothingFound(true) : setIsNothingFound(false);
  }

  function handleFilterMovie(movies, search, checkbox) {
    const moviesList = filterMovies(movies, search);
    setFilteredMovies(
      checkbox === true ? filterShortMovies(moviesList) : moviesList
    );
    localStorage.setItem("movies", moviesList);
  }

  // функция обработчик отправки запроса
  function handleSubmit(keyword) {
    // debugger;
    setLoading(true);
    setSearch(keyword);
    localStorage.setItem("search", keyword);
    localStorage.setItem("checkbox", shortFilms);
    if (!allFilms.length) {
      // setLoading(true);
      movieApi
        .getMovies()
        .then((data) => {
          const res = data.map((item) => ({
            country: item["country"],
            director: item["director"],
            duration: item["duration"],
            year: item["year"],
            description: item["description"],
            image: `${MOVIE_BASEURL_PIC}${item["image"]["url"]}`,
            trailerLink: item["trailerLink"],
            thumbnail: `${MOVIE_BASEURL_PIC}${item["image"]["url"]}`,
            movieId: item["id"],
            nameRU: item["nameRU"],
            nameEN: item["nameEN"],
          }));
          setAllFilms(res);
          handleFilterMovie(res, keyword, shortFilms);
          handleCheckFilteredMovies(res);
        })
        .catch((err) => {
          console.log("film error", err);
          onApiError(true);
        })
        .finally(() => setLoading(false));
    } else {
      handleFilterMovie(allFilms, keyword, shortFilms);
      setLoading(false);
      handleCheckFilteredMovies(allFilms);
    }
  }
  // функция закрытия попапа с ошибкой
  function closePopup() {
    onApiError(false);
  }

  useEffect(() => {
    const arr = localStorage.getItemOrDefault("movies", []);
    if (arr && !search) {
      setIsNotSearched(false);
      setShortFilms(localStorage.getItemOrDefault("checkbox", false));
      setFilteredMovies(shortFilms === true ? filterShortMovies(arr) : arr);
      handleCheckFilteredMovies(arr);
    } else setIsNotSearched(true);
  }, [shortFilms, search]);

  useEffect(() => {
    if (search) {
      if (!allFilms.length) handleSubmit(search);
      setIsNotSearched(false);
      const arr = filterMovies(allFilms, search, shortFilms);
      setFilteredMovies(arr);
      handleCheckFilteredMovies(arr);
    } else setIsNotSearched(true);
  }, [search, shortFilms, allFilms]);

  return (
    <main className="movie-content">
      <SearchForm
        onSearchFilm={handleSubmit}
        queryMovie={search}
        // filteredMovies={filteredMovies}
        onCheckboxPos={handleShortFilms}
        shortFilms={shortFilms}
      />
      {isLoaging ? (
        <Preloader />
      ) : isNothingFound || isNotSearched ? (
        <Message
          message={isNotSearched ? "Вы ничего не искали" : "Ничего не найдено"}
        />
      ) : (
        <MovieCardList
          isSavedMoviePage={false}
          savedMovies={savedMovies}
          onSaveMovie={onSaveMovie}
          onDeleteMovie={onDeleteMovie}
          movieList={filteredMovies}
        />
      )}
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
