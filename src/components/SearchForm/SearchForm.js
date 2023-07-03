import React, { useState } from "react";
import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import { useFormAndValidation } from "../../hook/useFormAndValidation";
function SearchForm({ onSearchFilm }) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();

  function handleSubmit(evt) {
    const movie = values.movie;
    evt.preventDefault();
    if (isValid) {
      onSearchFilm(movie);
      resetForm();
    }
  }

  return (
    <form
      className="search-form"
      method="get"
      onSubmit={handleSubmit}
      noValidate
    >
      <label className="search-form-box">
        <input
          className="search-form__input"
          type="text"
          name="movie"
          placeholder="Фильм"
          minLength="2"
          required
          value={values.movie || ""}
          onChange={handleChange}
        ></input>
        <span className="search-form__input-error">{errors.movie || ""}</span>
        <button
          className={`search-form__submit ${
            !isValid && "search-form__submit_type_disabled"
          } `}
          type="submit"
          aria-label="Найти"
          disabled={!isValid}
        />
      </label>

      <FilterCheckbox />
    </form>
  );
}
export default SearchForm;
