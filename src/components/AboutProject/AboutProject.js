import React from "react";
function AboutProject() {
  return (
    <section id="about-project" className="about-project ">
      <h2 className="about-project__title">{"О проекте"}</h2>
      <div className="about-project__grid-container-shortlist">
        <p className="about-project__grid-container-shortlist-subtitle item1">
          {"Дипломный проект включал 5 этапов"}
        </p>
        <p className="about-project__grid-container-shortlist-text item2">
          {
            "Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки."
          }
        </p>
        <p className="about-project__grid-container-shortlist-subtitle item3">
          {"На выполнение диплома ушло 5 недель"}
        </p>
        <p className="about-project__grid-container-shortlist-text item4">
          {
            "У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься."
          }
        </p>
      </div>
      <div className="about-project__grid-container-timeline">
        <p className="about-project__grid-container-timeline-subtitle about-project__grid-container-timeline-subtitle_fill_green">
          {"1 неделя"}
        </p>
        <p className="about-project__grid-container-timeline-subtitle">
          {"4 недели"}
        </p>
        <p className="about-project__grid-container-timeline-text">
          {"Back-end"}
        </p>
        <p className="about-project__grid-container-timeline-text">
          {"Front-end"}
        </p>
      </div>
    </section>
  );
}
export default AboutProject;
