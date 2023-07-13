import React, { useEffect } from "react";
import ServerError from "../ServerError/ServerError";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./Profile.css";
import { useContext } from "react";
import { useFormAndValidation } from "../../hook/useFormAndValidation";
import { CurrentUserContext } from "../../utils/context/CurrentUserContext";
function Profile({
  buttonText,
  route,
  linkBottomPage,
  onUpdate,
  errorMessage,
  onLogOut,
  onEdit,
}) {
  const { values, handleChange, errors, isValid, resetForm, setIsValid } =
    useFormAndValidation();

  const [isEdited, SetEdited] = useState(false);
  const [isEditedForm, SetEditedForm] = useState(false);

  const userData = useContext(CurrentUserContext);

  useEffect(() => {
    if (isEditedForm) {
      SetEdited(true);
    }
  }, [isEditedForm, userData]);

  useEffect(() => {
    if (errorMessage) {
      setIsValid(false);
      if (values.email !== userData.email || values.name !== userData.name)
        onEdit("");
    } else if (
      values.email === userData.email &&
      values.name === userData.name
    ) {
      setIsValid(false);
      onEdit("Вы ввели и почту и имя такие же как у Вас сейчас");
    }
  }, [errorMessage, values.email, values.name]);

  function handleSubmit(evt) {
    const { name, email } = values;

    evt.preventDefault();
    if (isValid) {
      onUpdate({ name, email });
      resetForm();
      SetEdited(false);
      SetEditedForm(false);
    }
  }
  function handleShowSubmit() {
    SetEditedForm(true);
    onEdit("");
  }

  return (
    <main className="profile">
      <div className="profile-container">
        <h2 className="profile-container__header">{`Привет, ${userData.name}!`}</h2>
        <form
          className="profile-container__form"
          method="get"
          onSubmit={handleSubmit}
          noValidate
        >
          <label className="profile-item">
            Имя
            <input
              className={
                errors.name
                  ? " profile__input profile__input_type_invalid"
                  : "profile__input"
              }
              type="text"
              name="name"
              placeholder={userData.name}
              value={isEdited ? values.name : ""}
              minLength="3"
              maxLength="30"
              pattern="^[a-zA-ZА-Яа-яЁё\s\-]+$"
              required
              onChange={(e) => {
                // SetEdited(true);
                handleChange(e);
              }}
              disabled={!isEdited}
            />
            <span className="nameInput-error profile__input-error">
              {errors.name || ""}
            </span>
          </label>

          <label className="profile-item">
            Email
            <input
              className={
                errors.email
                  ? " profile__input profile__input_type_invalid"
                  : "profile__input"
              }
              type="email"
              name="email"
              placeholder={userData.email}
              // required
              value={isEdited ? values.email : ""}
              onChange={(e) => {
                // SetEdited(true);
                handleChange(e);
              }}
              disabled={!isEdited}
            />
            <span className="emailInput-error profile__input-error">
              {errors.email || ""}
            </span>
          </label>

          <div className="profile-container__link-buttons">
            <ServerError errorMessage={errorMessage} />
            {isEdited ? (
              <button
                className={`profile-container__submit ${
                  !isValid && "profile-container__submit_type_disabled"
                }`}
                type="submit"
                aria-label={buttonText}
                disabled={!isValid}
              >
                {buttonText}
              </button>
            ) : (
              <>
                <button
                  className="profile-container__edit-button"
                  type="button"
                  aria-label={"Редактировать"}
                  onClick={handleShowSubmit}
                >
                  {"Редактировать"}
                </button>
                <p className="profile-container__text">
                  <Link
                    className="profile-container__link"
                    onClick={onLogOut}
                    to={route}
                  >
                    {linkBottomPage}
                  </Link>
                </p>
              </>
            )}
          </div>
        </form>
      </div>
    </main>
  );
}
export default Profile;
