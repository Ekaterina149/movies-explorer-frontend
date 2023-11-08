import React, { useEffect, useState } from "react";
import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import { useFormAndValidation } from "../../hook/useFormAndValidation";
function SearchForm({ onSearchFilm, onCheckboxPos, shortFilms, queryMovie }) {
  const { values, handleChange, errors, isValid, setInitValues } = useFormAndValidation();
  const [error, setErr] = useState("");

  function handleSubmit(evt) {
    const movie = values.movie;
    // setErr("");
    evt.preventDefault();
    if (isValid) {
      onSearchFilm(movie);
    }
  }
  function handleSetValid() {
    setErr(errors.movie);
  }
useEffect(()=>{
  setInitValues({movie: queryMovie })
},[queryMovie])
  return (
    <form
      className="search-form"
      method="get"
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="search-form-box">
        <input
          className="search-form__input"
          type="text"
          name="movie"
          placeholder="Фильм"
          minLength="1"
          required
          value={values.movie || ""}
          onChange={(evt) => {
            if (error) setErr("");
            handleChange(evt);
          }}
        ></input>
        <span className="search-form__input-error">{error || ""}</span>
        <button
          className={`search-form__submit ${!isValid && ""} `}
          type="submit"
          aria-label="Найти"
          // disabled={!isValid}
          onClick={handleSetValid}
        />
      </div>

      <FilterCheckbox onCheckboxPos={onCheckboxPos} shortFilms={shortFilms} />
    </form>
  );
}
export default SearchForm;
