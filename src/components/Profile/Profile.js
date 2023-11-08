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
  const userData = useContext(CurrentUserContext);
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();

  const [isEdited, SetEdited] = useState(false);
  const [isEditedForm, SetEditedForm] = useState(false);

  useEffect(() => {
    // alert();
    resetForm({ name: userData.name, email: userData.email });
  }, [userData]);

  useEffect(() => {
    if (isEditedForm) {
      SetEdited(true);
      resetForm({ name: userData.name, email: userData.email }, {}, false);
    }
  }, [isEditedForm, userData]);

  useEffect(() => {
    if (values.email === userData.email && values.name === userData.name) {
      resetForm(values, {}, false);
    }
  }, [errorMessage, values.email, values.name]);

  const [pending, setPending] = useState(false);
  function handleSubmit(evt) {
    evt.preventDefault();
    if (pending) return;

    const { name, email } = values;
    if (isValid) {
      setPending(true);

      onUpdate({ name, email }).finally(() => setPending(false));
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
        <h2 className="profile-container__header">
          Привет, {`${userData.name}!`}
        </h2>
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
              value={values.name || ""}
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
              value={values.email || ""}
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
            <ServerError errorMessage={errorMessage || ""} />
            {isEdited ? (
              <button
                className={`profile-container__submit ${
                  !isValid && "profile-container__submit_type_disabled"
                }`}
                type="submit"
                aria-label={buttonText || ""}
                disabled={!isValid}
              >
                {buttonText || ""}
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
