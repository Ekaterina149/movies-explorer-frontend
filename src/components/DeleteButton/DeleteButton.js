import "../MoviesCard/MovieCard.css";
function DeleteButton({ handleClick }) {
  return (
    <button
      className={
        "moviecard-box__like-button moviecard-box__like-button_type_delete"
      }
      onClick={handleClick}
    ></button>
  );
}
export default DeleteButton;
