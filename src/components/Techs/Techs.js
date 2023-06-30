import "./Techs.css";
import Title from "../Title/Title";
import React from "react";
function Techs({techs}) {
  return (
    <section className="techs">
      <Title name="Технологии" />
      <div className="techs-text-container">
        <p className="techs-text-container__subtitle">{"7 технологий"}</p>
        <p className="techs-text-container__text">
          {
            "На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте."
          }
        </p>
        <ul className="techs-container__list">
          {techs.map((tech, index) => (
            <li key={index} className="techs-container__item">
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
export default Techs;
