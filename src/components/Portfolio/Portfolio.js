import React from "react";
import "./Portfolio.css";
import { Link } from "react-router-dom";
function Portfolio({ links }) {
  return (
    <section className="portfolio-box">
    <div className="portfolio">
      <h3 className="portfolio__title">{"Портфолио"}</h3>
      <ul className="portfolio-list">
        {links.map((link, index) => (
          <li key={index} className="portfolio-list__item">
            <Link
              className="portfolio-list-link"
              to={link.path}
              target="_blank"
            >
              <p className="portfolio-list-link__text">{link.name}</p>
              <p className="portfolio-list-link__text">{"↗"}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
    </section>
  );
}
export default Portfolio;
