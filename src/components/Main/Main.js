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
    </main>
  );
}

export default Main;
