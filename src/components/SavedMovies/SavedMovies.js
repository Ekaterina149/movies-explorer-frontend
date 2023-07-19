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
    const list = filterMovies(savedMovies, search, shortFilms);
    setFilteredMovies(list);
  }
  //функия обработчик поиска по ключевому слову
  function handleSubmitFilm(keyword) {
    setSearch(keyword);
    handleFilterMovie();
  }

  // функция закрытия попапа с ошибкой
  function closePopup() {
    onApiError(false);
  }

  useEffect(() => {
    const arr = filterMovies(savedMovies, search, shortFilms);
    setFilteredMovies(arr);
    setIsNothingFound(false);
    if (arr.length === 0) setIsNothingFound(true);
  }, [savedMovies, search, shortFilms]);

  return (
    <main className="movie-content">
      <SearchForm
        onSearchFilm={handleSubmitFilm}
        onCheckboxPos={handleShortFilms}
        shortFilms={shortFilms}
      />
      {!savedMovies.length ? (
        <Message message={"Нет сохраненных фильмов"} />
      ) : isNothingFound ? (
        <Message message={"Ничего не найдено"} />
      ) : (
        <MovieCardList
          isSavedMoviePage={true}
          savedMovies={savedMovies}
          onDeleteMovie={onDeleteMovie}
          movieList={
            shortFilms ? filterShortMovies(filteredMovies) : filteredMovies
          }
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
export default SavedMovies;
