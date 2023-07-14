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
import { mainApiAuth, mainApi } from "../../utils/MainApi";
import { CurrentUserContext } from "../../utils/context/CurrentUserContext";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({ name: "", email: "" });
  const [regErrorMessage, setRegErrorMessage] = useState("");
  const [logErrorMessage, setLogErrorMessage] = useState("");
  const [profErrorMessage, setProfErrorMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const [savedMovies, setSavedMovies] = useState([]);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  function handleRegister(data) {
    setRegErrorMessage("");
    mainApi
      .register(data)
      .then((servdata) => {
        console.log("regData", servdata);
        navigate("/signin");
      })
      .catch((err) => {
        setRegErrorMessage(err.message);
        console.log("RegerrorMessage", err.message);
      });
  }
  function handleLogin(data) {
    mainApi
      .authorize(data)
      .then((servdata) => {
        console.log("logData", servdata);
        setLogErrorMessage("");
        localStorage.setItem("userId", servdata._id);
        setCurrentUser({ name: servdata.name, email: servdata.email });
        setIsLoggedIn(true);
        navigate("/");
      })
      .catch((err) => {
        setLogErrorMessage(err.message);
        console.log("LogerrorMessage", logErrorMessage);
      });
  }
  function handleEditProfile(data) {
    mainApiAuth
      .updateUserInfo(data.name, data.email)
      .then((servdata) => {
        console.log("updateUserData", servdata);
        setCurrentUser({ name: servdata.name, email: servdata.email });
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
        localStorage.removeItem("userId");
        console.log("Выход");
        navigate("/signin");
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
  useEffect(() => {
    if (isLoggedIn) {
      mainApiAuth
        .getUserInfo()
        .then((userData) => {
          setCurrentUser({ name: userData.name, email: userData.email });
        })
        .catch((error) => {
          console.log(error);
        });

      mainApiAuth
        .getUserMovies()
        .then((movieData) => {
          if (movieData.length) setSavedMovies(movieData);
        })
        .catch((error) => {
          console.log(error);
        });
      navigate("/movies");
    }
  }, [isLoggedIn]);
  useEffect(() => setIsLoggedIn(!!localStorage.getItem("userId")), []);

  // console.log(selList);
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        {pathname === "/movies" ||
        pathname === "/" ||
        pathname === "/saved-movies" ||
        pathname === "/profile" ? (
          <Header isLoggedIn={isLoggedIn} />
        ) : (
          ""
        )}

        <Routes>
          <Route exact path="/" element={<Main isLoggedIn={isLoggedIn} />} />
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
      </div>
    </CurrentUserContext.Provider>
  );
}
export default App;
