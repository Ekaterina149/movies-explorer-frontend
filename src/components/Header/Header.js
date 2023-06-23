import "./Header.css";
import Navigation from "../Navigation/Navigation";
import React from "react";
import promologo from "../../images/promo__logo.svg";
function Header() {
  return (
    <div className="promo__logo-container">
      <img className="promo__logo" src={promologo} alt="логотип шапки" />
      <div className="promo__link-container">
        <Link className="promo__link-register" to="/signup">
          {"Регистрация"}
        </Link>
        <button className="promo__link-button">
          <Link className="promo__link-login" to="/signup">
            {"Войти"}
          </Link>
        </button>
      </div>
    </div>
  );
}
export default Header;
