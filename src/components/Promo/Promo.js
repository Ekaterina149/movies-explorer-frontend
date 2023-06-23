import React from "react";
import "./Promo.css";
import Header from "../Header/Header";
import { Link } from "react-router-dom";
import promoImg from "../../images/promo__image.svg";
import promologo from "../../images/promo__logo.svg";
function Promo() {
  return (
    <header className="promo">
      {/* <div className="promo__logo-container">
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
      </div> */}
      <Header />
      <div className="promo__text-container">
        <div className="promo__text">
          <h1 className="promo__title">
            {"Учебный проект студента факультета Веб-разработки."}
          </h1>
          <p className="promo__subtitle">
            {
              "Листайте ниже, чтобы узнать больше про этот проект и его создателя."
            }
          </p>
          <a className="promo__button" href="#about-project">
            {"Узнать больше"}
          </a>
        </div>

        <img
          className="promo__image"
          src={promoImg}
          alt="Картинка в заголовке"
        />
      </div>
    </header>
  );
}
export default Promo;
