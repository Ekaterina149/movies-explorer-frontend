import React from "react";
import Form from "../Form/Form";
import { useEffect, useState } from "react";
import { useFormAndValidation } from "../../hook/useFormAndValidation";
function Login({ onLogin, errorMessage, onErrorMessage }) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation(false);
  // сбросим ошибку сервера
  useEffect(() => {
    if (errorMessage) {
      onErrorMessage("");
    }
  }, [values.email, values.password]);

  const [pending, setPending] = useState(false);
  function handleSubmit(evt) {
    if (pending) return;

    const { name, email, password } = values;
    if (isValid) {
      setPending(true);
      onLogin({ name, email, password })
        .catch(() => resetForm(values, {}, false))
        .finally(() => setPending(false));
    }
  }
  useEffect(() => resetForm({}, {}, false), []);

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
