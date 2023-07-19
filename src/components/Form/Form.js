import "./Form.css";
import { Link } from "react-router-dom";
import promologo from "../../images/promo__logo.svg";
import ServerError from "../ServerError/ServerError";
function Form({
  title,
  children,
  buttonText,
  onSubmit,
  route,
  linkBottomPage,
  textBottomPage,
  isValid,
  errorMessage,
}) {
  function preventHandler(evt) {
    evt.preventDefault();
    onSubmit(evt);
  }

  return (
    <main className="form form-elements">
      <section className="form-container">
        <Link to="/" className="form-container__logo-link">
          <img
            className="form-container__logo"
            src={promologo}
            alt="ссылка на главную"
          />
        </Link>
        <h2 className="form-container__header">{title}</h2>
        <form
          className="form-container__form"
          method="get"
          onSubmit={preventHandler}
          noValidate
        >
          <fieldset className="form-container__fieldset">{children}</fieldset>
          <ServerError errorMessage={errorMessage} />
          <div className="form-container__link-buttons">
            <button
              className={`form-container__submit ${
                !isValid && "form-container__submit_type_disabled"
              }`}
              type="submit"
              aria-label={buttonText}
              disabled={!isValid && true}
            >
              {buttonText}
            </button>
            <p className="form-container__text">
              {textBottomPage}
              <Link className="form-container__link" to={route}>
                {linkBottomPage}
              </Link>
            </p>
          </div>
        </form>
      </section>
    </main>
  );
}
export default Form;
