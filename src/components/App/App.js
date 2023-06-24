import React from "react";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Footer from "../Footer/Footer";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  return (
    <div className="page">
      <Routes>
        <Route exact path="/" element={<Main isLoggedIn={isLoggedIn} />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/saved-movies" element={<SavedMovies />} />
        <Route path="/saved-movies" element={<Profile />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/signin" element={<Login />} />
      </Routes>
      <Footer />
    </div>
  );
}
export default App;
