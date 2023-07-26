import "./Header.css";
import Navigation from "../Navigation/Navigation";
import React from "react";
import { useLocation, Link } from "react-router-dom";
import promologo from "../../images/promo__logo.svg";
function Header({ isLoggedIn }) {
  const { pathname } = useLocation();
  return (
    <header className={`"header-box" ${pathname === "/" ? "header-box_theme_main": ""}`}>
    <section
      className={`header-container ${
        pathname === "/" ? "header-container_theme_main" : ""
      }`}
    >
      <Link className="header-container__logo-link" to="/">
        <img
          className="header-container__logo"
          src={promologo}
          alt="логотип шапки"
        />
      </Link>
      <Navigation isLoggedIn={isLoggedIn} />
    </section>
    </header>
  );
}
export default Header;
