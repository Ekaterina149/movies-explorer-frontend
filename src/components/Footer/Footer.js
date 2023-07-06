import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
function Footer() {
  return (
    <footer className="footer">
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
    </footer>
  );
}
export default Footer;
