import React from "react";
import "./Main.css";
import Promo from "../Promo/Promo";
import AboutProject from "../AboutProject/AboutProject";
import Techs from "../Techs/Techs";
import AboutMe from "../AboutMe/AboutMe";
import Portfolio from "../Portfolio/Portfolio";
// import Footer from "../Footer/Footer";

import { techs, portfolioLinks } from "../../utils/constants.js";
function Main({ isLoggedIn }) {
  return (
    <main className="content-main">
      <Promo />
      <AboutProject />
      <Techs techs={techs} />
      <AboutMe />
      <Portfolio links={portfolioLinks} />
      {/* <Footer /> */}
      {/* <section className="footer">
        <h3 className="footer__title">
          {"Учебный проект Яндекс.Практикум х BeatFilm."}
        </h3>
        <div className="footer-container">
          <p className="footer-container__date">
            &copy;{new Date().getFullYear()}
          </p>
          <div className="footer-container-links">
            <Link
              className="footer-container__link"
              to="https://practicum.yandex.ru/"
              target="_blank"
            >
              {"Яндекс.Практикум"}
            </Link>
            <Link
              className="footer-container__link"
              to="https://github.com/"
              target="_blank"
            >
              {"Github"}
            </Link>
          </div>
        </div>
      </section> */}
    </main>
  );
}

export default Main;
