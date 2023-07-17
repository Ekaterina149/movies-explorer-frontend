import yes from "../../images/Yes.svg";
import "./PopupSuccess.css";
function PopupSuccess({ onClose, message, isError }) {
  return (
    <div className={isError ? "popup popup_opened" : "popup"}>
      <div className="  popup__container popup__container_size_auth ">
        <button
          className="popup__close opacity"
          type="button"
          onClick={onClose}
        >
          {" "}
        </button>
        <img
          className="popup__image popup__image_size_auth"
          src={yes}
          alt={`Информационное сообщение: ${message}`}
        ></img>
        <h2 className="popup__header popup__header_size_auth">{message}</h2>
      </div>
    </div>
  );
}
export default PopupSuccess;
