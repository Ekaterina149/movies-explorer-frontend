import { useState, useCallback } from "react";
//для валидации применяю ту же библиотеку Joi, что и в миддлваре валидации на
// стороне бэкенда
const Joi = require("joi");

export function useFormAndValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const message = {
    name: "Введите корректное имя, нельзя вводить только пробелы",
    email: "Введите корректный email",
    password: "Введите корректный пароль, нельзя вводить только пробелы",
    movie: "Введите корректное название фильма, нельзя вводить только пробелы",
  };
  const setInitValues = (initValues) => {
    setValues(initValues);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });

    if (
      e.target.value === "" ||
      (e.target.value.match(/\s/g) !== null &&
        e.target.value.match(/\s/g).length === e.target.value.length)
    ) {
      e.target.setCustomValidity(message[name]);
    } else {
      if (e.target.validity.patternMismatch) {
        e.target.setCustomValidity("Введите имя, нельзя вводить !№?&");
        console.log(e.target.validationMessage);
        // debugger;
      } else {
        e.target.setCustomValidity("");
      }

      // e.target.setCustomValidity("");
    }
    //для валидации применяю ту же библиотеку Joi, что и в миддлваре валидации на
    // стороне бэкенда
    if (name === "email") {
      const schema = Joi.string()
        .email({ tlds: { allow: false } })
        .messages({
          "string.email": message.email,
        });
      const validationResult = schema.validate(values.email);
      if (validationResult.error) {
        e.target.setCustomValidity(validationResult.error.message);
      } else {
        e.target.setCustomValidity("");
      }
    }

    setErrors({ ...errors, [name]: e.target.validationMessage });

    setIsValid(e.target.closest("form").checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = true) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return {
    values,
    handleChange,
    setInitValues,
    errors,
    isValid,
    resetForm,
    setValues,
    setIsValid,
  };
}
