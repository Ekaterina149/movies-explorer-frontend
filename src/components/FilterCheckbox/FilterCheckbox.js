import React from "react";
import "./FilterCheckbox.css";
function FilterCheckbox() {
  return (
    <section>
      <label className="filterCheckbox">
        <span className="filterCheckbox__label">Короткометражки</span>
        <input className="filterCheckbox__checkbox" type="checkbox" />
        <div className="filterCheckbox__switch"></div>
      </label>
    </section>
  );
}
export default FilterCheckbox;
