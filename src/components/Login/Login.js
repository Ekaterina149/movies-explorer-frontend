import React from "react";
import Form from "../Form/Form";
import { useEffect } from "react";
import { useFormAndValidation } from "../../hook/useFormAndValidation";
function Login({ onLogin, errorMessage, onErrorMessage }) {
  console.log("errorMassageLogin", errorMessage);
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();
  // сбросим ошибку сервера
  useEffect(() => {
    if (errorMessage) {
      onErrorMessage("");
    }
  }, [values.email, values.password]);

  function handleSubmit(evt) {
    const { name, email, password } = values;
    evt.preventDefault();
    if (isValid) {
      onLogin({ name, email, password });
      resetForm();
    }
  }

  return (
    <Form
      title={"Рады видеть!"}
      buttonText={"Войти"}
      onSubmit={handleSubmit}
      route={"/signup"}
      linkBottomPage={"Регистрация"}
      textBottomPage={"Ещё не зарегистрированы?"}
      className="content"
      isValid={isValid}
      errorMessage={errorMessage}
    >
      <>
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
export default Login;
