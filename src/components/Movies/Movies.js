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

  function handleFilterMovie(movies, search, checkbox) {
    const moviesList = filterMovies(movies, search);
    setFilteredMovies(
      checkbox === true ? filterShortMovies(moviesList) : moviesList
    );
    localStorage.setItem("movies", moviesList);
  }

  // функция обработчик отправки запроса
  function handleSubmit(keyword) {
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
        })
        .catch((err) => {
          console.log("film error", err);
          onApiError(true);
        })
        .finally(() => setLoading(false));
    } else {
      handleFilterMovie(allFilms, keyword, shortFilms);
      setLoading(false);
    }
  }
  // функция закрытия попапа с ошибкой
  function closePopup() {
    onApiError(false);
  }

  useEffect(() => {
    const arr = localStorage.getItemOrDefault("movies", []);

      setShortFilms(localStorage.getItemOrDefault("checkbox", false));
      const currentFilms = shortFilms === true ? filterShortMovies(arr) : arr;
      setFilteredMovies(currentFilms);

  }, [shortFilms]);

  useEffect(() => {
    const arr = localStorage.getItemOrDefault("movies", []);
    const isSameSearch =
      search && search === localStorage.getItemOrDefault("search", "");

    if (search && isSameSearch && arr.length) {
      const currentFilms = shortFilms === true ? filterShortMovies(arr) : arr;
      setFilteredMovies(currentFilms);
    }

    if (search && !isSameSearch) {
      setFilteredMovies(filterMovies(allFilms, search, shortFilms));
    }
  }, [allFilms, search, shortFilms]);

  useEffect(() => {
    if (search && filteredMovies.length) {
      setIsNotSearched(false);
      setIsNothingFound(false);
    }

    if (search && !filteredMovies.length) {
      setIsNotSearched(false);
      setIsNothingFound(true);
    }

    if (!search) {
      setIsNotSearched(true);
      setIsNothingFound(false);
    }
  }, [search, filteredMovies]);

  return (
    <main className="movie-content">
      <SearchForm
        onSearchFilm={handleSubmit}
        queryMovie={search}
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
