import "./Mistake.css";
import React from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

function Mistake() {
  const navigate = useNavigate();
  return (
    <section className="mistake">
      <div className="mistake__text-container">
        <h2 className="mistake__title">404</h2>
        <p className="mistake__subtitle">Страница не найдена</p>
      </div>
      <Link onClick={() => navigate(-1)} className="mistake__link">
        Назад
      </Link>
    </section>
  );
}
export default Mistake;
