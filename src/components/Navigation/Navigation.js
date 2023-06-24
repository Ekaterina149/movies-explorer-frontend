import React from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";
import NavTar from "../NavTab/NavTab";
function Navigation({ isLoggedIn }) {
  return (
    <nav className="navigation-container">
      {isLoggedIn ? (
        <NavTar />
      ) : (
        <>
          {" "}
          <Link className="navigation-register" to="/signup">
            {"Регистрация"}
          </Link>
          <button className="navigation-button">
            <Link className="navigation-login" to="/signup">
              {"Войти"}
            </Link>
          </button>{" "}
        </>
      )}
    </nav>
  );
}
export default Navigation;
