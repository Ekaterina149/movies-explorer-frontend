import React from "react";
import { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
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
import { savedlist } from "../../utils/constants";



function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [savedMovies, setSavedMovies] = useState(savedlist);
  const { pathname } = useLocation();
  function handleRegister(data) {}
  function handleLogin(data) {}
  function handleEditProfile(data) {}
  function handleSaveMovie(movie) {
    debugger;
    setSavedMovies([movie, ...savedMovies]);
  }
  console.log("a", savedMovies);

  // console.log(selList);
  return (
    <div className="page">
      {pathname === "/movies" ||
      pathname === "/" ||
      pathname === "/saved-movies" ||
      pathname === "/profile" ? (
        <Header isLoggedIn={isLoggedIn} />
      ) : (
        ""
      )}
      {/* <HashRouter > */}
      <Routes>
        <Route exact path="/" element={<Main isLoggedIn={isLoggedIn} />} />
        <Route
          path="/movies"
          element={<Movies onLikeClick={handleSaveMovie} />}
        />
        <Route
          path="/saved-movies"
          element={<SavedMovies list={savedMovies} />}
        />
        <Route
          path="/profile"
          element={
            <Profile
              buttonText="Сохранить"
              onUpdate={handleEditProfile}
              route="/"
              linkBottomPage="Выйти из аккаунта"
            />
          }
        />
        <Route
          path="/signup"
          element={<Register onRegister={handleRegister} />}
        />
        <Route path="/signin" element={<Login onLogin={handleLogin} />} />
        <Route path="*" element={<Mistake />} />
      </Routes>

      {/* </HashRouter> */}

      {pathname === "/movies" ||
      pathname === "/" ||
      pathname === "/saved-movies" ? (
        <Footer />
      ) : (
        ""
      )}
    </div>
  );
}
export default App;