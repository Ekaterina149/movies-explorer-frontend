import "./Header.css";
import Navigation from "../Navigation/Navigation";
import React from "react";
import { useLocation } from "react-router-dom";
import promologo from "../../images/promo__logo.svg";
function Header({ isLoggedIn }) {
  const { pathname } = useLocation();
  return (
    <header
      className={`header-container ${
        pathname === "/" && "header-container_theme_main"
      }`}
    >
      <img
        className="header-container__logo"
        src={promologo}
        alt="логотип шапки"
      />
      <Navigation isLoggedIn={isLoggedIn} />
    </header>
  );
}
export default Header;
