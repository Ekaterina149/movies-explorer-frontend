import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./Profile.css";
import { useFormAndValidation } from "../../hook/useFormAndValidation";
function Profile({ buttonText, route, linkBottomPage, onUpdate }) {
  const { values, handleChange, errors, isValid, resetForm, setIsValid } =
    useFormAndValidation();

  const [isEdited, SetEdited] = useState(false);
  const [isEditedForm, SetEditedForm] = useState(false);
  const [userData, setUserData] = useState({
    name: "Виталий",
    email: "pochta@inbox.ru",
  });
  const [message, setMessage] = useState("");
  const existingEmail = "katerina@inbox.com";
  useEffect(() => {
    if (isEditedForm) SetEdited(true);
    resetForm(userData);
  }, [isEditedForm, userData, resetForm]);

  useEffect(() => {
    if (values.email === existingEmail) {
      setIsValid(false);
      setMessage("При обновлении профиля произошла ошибка");
    } else setMessage("");
  }, [values, setIsValid, setMessage]);

  function handleSubmit(evt) {
    const { name, email } = values;
    evt.preventDefault();
    if (isValid) {
      // debugger;
      setUserData({ name, email });
      onUpdate({ name, email });

      SetEdited(false);
      SetEditedForm(false);
    }
  }
  function handleShowSubmit() {
    SetEditedForm(true);
    //debugger;
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
              value={isEdited ? values.name : userData.name}
              minLength="3"
              maxLength="30"
              pattern="^[a-zA-ZА-Яа-яЁё\s\-]+$"
              required
              onChange={(e) => {
                SetEdited(true);
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
              value={isEdited ? values.email : userData.email}
              onChange={(e) => {
                SetEdited(true);
                handleChange(e);
              }}
              disabled={!isEdited}
            />
            <span className="emailInput-error profile__input-error">
              {errors.email || ""}
            </span>
          </label>

          <div className="profile-container__link-buttons">
            <p className="profile-container__text">{message}</p>
            {isEdited ? (
              <button
                className={`profile-container__submit ${
                  !isValid && "profile-container__submit_type_disabled"
                }`}
                type="submit"
                aria-label={buttonText}
                disabled={!isValid && true}
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
                  <Link className="profile-container__link" to={route}>
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
