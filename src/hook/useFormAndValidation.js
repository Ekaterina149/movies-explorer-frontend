import { useState, useCallback } from "react";

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

    if (name === "email" && values.email) {
      if (
        /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu.test(
          values.email
        )
      ) {
        e.target.setCustomValidity("");
      } else {
        e.target.setCustomValidity(message.email);
      }
    }
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
