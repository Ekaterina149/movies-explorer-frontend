import React from "react";
import "./Main.css";
import Header from "../Header/Header";
import Promo from "../Promo/Promo";
import AboutProject from "../AboutProject/AboutProject";
function Main({ isLoggedIn }) {
  return (
    <section>
      <Header isLoggedIn={isLoggedIn} />
      <Promo />
      <AboutProject />
      <h2 className="about-project__title">{"О проекте"}</h2>
      <p className="techs__subtitle">{"7 технологий"}</p>
      <p className="techs__text">
        {
          "На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте."
        }
      </p>
      <ul className="techs-container">
        <li className="techs-container__item"></li>
        <li className="techs-container__item"></li>
        <li className="techs-container__item"></li>
        <li className="techs-container__item"></li>
        <li className="techs-container__item"></li>
        <li className="techs-container__item"></li>
      </ul>
    </section>
  );
}

export default Main;
