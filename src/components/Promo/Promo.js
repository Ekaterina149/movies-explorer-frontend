import React from "react";
import "./Promo.css";
import Header from "../Header/Header";
import promoImg from "../../images/promo__image.svg";
function Promo({ isLoggedIn }) {
  return (
    <section className="promo">
      {/* <Header isLoggedIn={isLoggedIn} /> */}
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
    </section>
  );
}
export default Promo;
