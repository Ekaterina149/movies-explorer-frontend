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

            <Link className="navigation-login navigation-button" role="button" to="/signin">
              {"Войти"}
            </Link>
        </>
      )}
    </nav>
  );
}
export default Navigation;
