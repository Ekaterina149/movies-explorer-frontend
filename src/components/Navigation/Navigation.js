import React from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";
import NavTab from "../NavTab/NavTab";
function Navigation({ isLoggedIn }) {
  return (
    <nav className="navigation-container">
      {isLoggedIn ? (
        <NavTab />
      ) : (
        <>
          {" "}
          <Link className="navigation-register" to="/signup">
            {"Регистрация"}
          </Link>
          <button className="navigation-button">
            <Link className="navigation-login" to="/signin">
              {"Войти"}
            </Link>
          </button>{" "}
        </>
      )}
    </nav>
  );
}
export default Navigation;
