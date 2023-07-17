import React from "react";
import { useState, useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import Main from "../Main/Main";
import Header from "../Header/Header";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Footer from "../Footer/Footer";
import Mistake from "../Mistake/Mistake";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Preloader from "../Preloader/Preloader";
import { mainApiAuth, mainApi } from "../../utils/MainApi";
import { CurrentUserContext } from "../../utils/context/CurrentUserContext";
import PopupSuccess from "../PopupSucsess/PopupSuccess";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoaging, setIsLoaging] = React.useState(true);
  const [currentUser, setCurrentUser] = useState({ name: "", email: "" });
  const [regErrorMessage, setRegErrorMessage] = useState("");
  const [logErrorMessage, setLogErrorMessage] = useState("");
  const [profErrorMessage, setProfErrorMessage] = useState("");
  const [editSuccessMessage, setEditSuccessMessage] = useState(false);
  const [isError, setIsError] = useState(false);

  const [savedMovies, setSavedMovies] = useState([]);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  function handleRegister(data) {
    setRegErrorMessage("");
    return mainApi
      .register(data)
      .then((servdata) => {
        console.log("regData", servdata);
        handleLogin(data);
      })
      .catch((err) => {
        setRegErrorMessage(err.message);
        console.log("RegerrorMessage", err.message);
      });
  }
  function handleLogin(data) {
    return mainApi
      .authorize(data)
      .then((servdata) => {
        console.log("logData", servdata);
        setLogErrorMessage("");
        localStorage.setItem("userId", servdata._id);
        setCurrentUser({ name: servdata.name, email: servdata.email });
        setIsLoggedIn(true);
        navigate("/movies");
      })
      .catch((err) => {
        setLogErrorMessage(err.message);
        console.log("LogerrorMessage", logErrorMessage);
      });
  }
  function handleEditProfile(data) {
    return mainApiAuth
      .updateUserInfo(data.name, data.email)
      .then((servdata) => {
        console.log("updateUserData", servdata);
        setCurrentUser({ name: servdata.name, email: servdata.email });
        setEditSuccessMessage(true);
      })
      .catch((err) => {
        setProfErrorMessage(err.message);
        console.log("UserUpdaterorMessage", err.message);
      });
  }
  function handleLogOut() {
    mainApiAuth
      .unauthorize()
      .then(() => {
        setIsLoggedIn(false);
        localStorage.clear();
        console.log("Выход");
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function getMovieById(movieId) {
    return savedMovies.find((m) => m.movieId === movieId);
  }
  function handleSaveMovie(film) {
    console.log(film);
    mainApiAuth
      .saveNewMovie(film)
      .then((newCard) => {
        setSavedMovies([newCard, ...savedMovies]);
      })
      .catch((err) => {
        console.log(err);
        setIsError(true);
      });
  }

  // обработчик удаления фильма из избранного
  function handleDeleteMovie(film) {
    console.log(film);
    mainApiAuth
      .deleteMovie(getMovieById(film.movieId)._id)
      .then(() => {
        const newMoviesList = savedMovies.filter(
          (m) => m.movieId !== film.movieId
        );
        setSavedMovies(newMoviesList);
      })
      .catch((err) => {
        console.log(err);
        setIsError(true);
      });
  }
  function closeSuccessPopup() {
    setEditSuccessMessage(false);
  }
  useEffect(() => {
    setIsLoaging(true);
    mainApiAuth
      .getUserInfo()
      .then((userData) => {
        // debugger;
        setIsLoggedIn(true);
        setCurrentUser({ name: userData.name, email: userData.email });
      })
      .catch((error) => {
        console.log(error);
        setIsLoggedIn(false);
      })
      .finally(() => setIsLoaging(false));
  }, [isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) {
      mainApiAuth
        .getUserMovies()
        .then((movieData) => {
          setSavedMovies(movieData);
        })
        .catch((error) => {
          console.log(error);
          setIsLoggedIn(false);
        });
    }
  }, [isLoggedIn]);
  // useEffect(() => setIsLoggedIn(!!localStorage.getItem("userId")), []);

  // console.log(selList);
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        {}
        {isLoaging ? (
          <Preloader />
        ) : (
          <>
            {pathname === "/movies" ||
            pathname === "/" ||
            pathname === "/saved-movies" ||
            pathname === "/profile" ? (
              <Header isLoggedIn={isLoggedIn} />
            ) : (
              ""
            )}

            <Routes>
              <Route
                exact
                path="/"
                element={<Main isLoggedIn={isLoggedIn} />}
              />
              <Route
                path="/movies"
                element={
                  <ProtectedRoute
                    component={Movies}
                    onSaveMovie={handleSaveMovie}
                    onDeleteMovie={handleDeleteMovie}
                    isLoggedIn={isLoggedIn}
                    savedMovies={savedMovies}
                    apiError={isError}
                    onApiError={setIsError}
                  />
                }
              />
              <Route
                path="/saved-movies"
                element={
                  <ProtectedRoute
                    component={SavedMovies}
                    isLoggedIn={isLoggedIn}
                    savedMovies={savedMovies}
                    onDeleteMovie={handleDeleteMovie}
                    apiError={isError}
                    onApiError={setIsError}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute
                    component={Profile}
                    isLoggedIn={isLoggedIn}
                    buttonText="Сохранить"
                    errorMessage={profErrorMessage}
                    route="/"
                    linkBottomPage="Выйти из аккаунта"
                    onUpdate={handleEditProfile}
                    onLogOut={handleLogOut}
                    onEdit={setProfErrorMessage}
                  />
                }
              />
              <Route
                path="/signup"
                element={
                  <Register
                    onRegister={handleRegister}
                    errorMessage={regErrorMessage}
                    onErrorMessage={setRegErrorMessage}
                  />
                }
              />
              <Route
                path="/signin"
                element={
                  <Login
                    onLogin={handleLogin}
                    errorMessage={logErrorMessage}
                    onErrorMessage={setLogErrorMessage}
                  />
                }
              />
              <Route path="*" element={<Mistake />} />
            </Routes>

            {pathname === "/movies" ||
            pathname === "/" ||
            pathname === "/saved-movies" ? (
              <Footer />
            ) : (
              ""
            )}
          </>
        )}
      </div>
      <PopupSuccess
        isError={editSuccessMessage}
        message={"Вы успешно изменили данные"}
        onClose={closeSuccessPopup}
      />
    </CurrentUserContext.Provider>
  );
}
export default App;
