import React from "react";
import "./AboutMe.css";
import Title from "../Title/Title";
import { Link } from "react-router-dom";
import picAboutMe from "../../images/pic__aboutMe.png";
function AboutMe() {
  return (
    <section className="aboutMe">
      <Title name={"Студент"} />
      <div className="aboutMe-container">
        <div className="aboutMe-text-container">
          <h3 className="aboutMe-text-container__title">{"Виталий"}</h3>
          <p className="aboutMe-text-container__subtitle">
            {"Фронтенд-разработчик, 30 лет"}
          </p>
          <article className="aboutMe-text-container__article">
            {
              "Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы."
            }
          </article>
          <Link
            className="aboutMe-text-container__gitHub-link"
            to="https://github.com/Ekaterina149"
            target="_blank"
          >
            {"GitHub"}
          </Link>
        </div>
        <img
          className="aboutMe-text-container__image"
          src={picAboutMe}
          alt="Мой портрет"
        />
      </div>
    </section>
  );
}
export default AboutMe;
