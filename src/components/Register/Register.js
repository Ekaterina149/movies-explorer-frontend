import React from "react";
import Form from "../Form/Form";
import { useFormAndValidation } from "../../hook/useFormAndValidation";
function Register({ onRegister }) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();

  function handleSubmit(evt) {
    const { name, email, password } = values;
    evt.preventDefault();
    if (isValid) {
      onRegister({ name, email, password });
      resetForm();
    }
  }

  return (
    <Form
      title={"Добро пожаловать!"}
      buttonText={"Зарегистрироваться"}
      onSubmit={handleSubmit}
      route={"/signin"}
      linkBottomPage={"Войти"}
      textBottomPage={"Уже зарегистрированы?"}
      isValid={isValid}
    >
      <>
        <label className="form-item">
          <p className="form-item__text">{"Имя"}</p>
          <input
            className={
              errors.name
                ? " form__input form__input_type_invalid"
                : "form__input"
            }
            type="text"
            name="name"
            placeholder="Виталий"
            value={values.name || ""}
            minLength="3"
            maxLength="30"
            // pattern="^[a-zA-ZА-Яа-яЁё\s\-]+$"
            required
            onChange={handleChange}
          />
          <span className="nameInput-error form__input-error">
            {errors.name || ""}
          </span>
        </label>

        <label className="form-item">
          <p className="form-item__text">{"Email"}</p>
          <input
            className={
              errors.email
                ? " form__input form__input_type_invalid"
                : "form__input"
            }
            type="email"
            name="email"
            placeholder="pochta@yandex.ru"
            required
            value={values.email || ""}
            onChange={handleChange}
          />
          <span className="emailInput-error form__input-error">
            {errors.email || ""}
          </span>
        </label>

        <label className="form-item">
          <p className="form-item__text">{"Пароль"}</p>
          <input
            className={
              errors.password
                ? " form__input form__input_type_invalid"
                : "form__input"
            }
            type="password"
            name="password"
            value={values.password || ""}
            minLength="3"
            maxLength="30"
            // pattern="^[a-zA-Z0-9]+$"
            required
            onChange={handleChange}
          />
          <span className="passwordInput-error form__input-error">
            {errors.password || ""}
          </span>
        </label>
      </>
    </Form>
  );
}
export default Register;
