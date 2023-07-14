import "./SavedMovies.css";
import React from "react";
import MovieCardList from "../MoviesCardList/MovieCardList";
import SearchForm from "../SearchForm/SearchForm";
import Message from "../Message/Message";
import PopupApiError from "../PopupApiError/PopupApiError";
import { filterMovies, filterShortMovies } from "../../utils/utils";
import { useState, useEffect } from "react";

function SavedMovies({ savedMovies, onDeleteMovie, apiError, onApiError }) {
  // отфильтрованные фильмы -стейт
  const [filteredMovies, setFilteredMovies] = useState([]);
  //положение тумблера короткометражек
  const [shortFilms, setShortFilms] = useState(false);
  // поисковое слово - стейт
  const [search, setSearch] = useState("");
  // а если ничего не нашли -стейт
  const [isNothingFound, setIsNothingFound] = useState(false);

  // функция обработчик клика тумблеру короткометражек
  function handleShortFilms() {
    setShortFilms(!shortFilms);
  }

  // функция фильтрации фильмов по ключевому слову и положению тумблера короткометражек
  function handleFilterMovie() {
    console.log("movieList", savedMovies);
    if (!search.length) return setFilteredMovies(savedMovies);
    const list = filterMovies(savedMovies, search);
    setFilteredMovies(list);
  }
  //функия обработчик поиска по ключевому слову
  function handleSubmitFilm(keyword) {
    setSearch(keyword);
    handleFilterMovie(savedMovies, keyword, shortFilms);
  }
  console.log(savedMovies);
  // функция закрытия попапа с ошибкой
  function closePopup() {
    onApiError(false);
  }

  useEffect(handleFilterMovie, [search, shortFilms, savedMovies]);
  useEffect(() => {
    if (savedMovies.length) {
      const arr = shortFilms
        ? filterShortMovies(filteredMovies)
        : filteredMovies;
      arr.length ? setIsNothingFound(false) : setIsNothingFound(true);
    }
  }, [search, shortFilms, savedMovies, filteredMovies]);
  //функция возвращающая разметку в зависимости от состояния стейтов
  function movieContainer() {
    if (isNothingFound) return <Message message={"Ничего не найдено"} />;
    if (!savedMovies.length)
      return <Message message={"Нет сохраненных фильмов"} />;
    return (
      <MovieCardList
        isSavedMoviePage={true}
        savedMovies={savedMovies}
        onDeleteMovie={onDeleteMovie}
        movieList={
          shortFilms ? filterShortMovies(filteredMovies) : filteredMovies
        }
        isNothingFound={isNothingFound}
      />
    );
  }

  return (
    <main className="movie-content">
      <SearchForm
        onSearchFilm={handleSubmitFilm}
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
export default SavedMovies;
