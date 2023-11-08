import "../MoviesCard/MovieCard.css";
function LikeButton({ isLiked, onLike, onDisLike }) {
  return (
    <button
      className={`moviecard-box__like-button ${
        isLiked && "moviecard-box__like-button_type_active"
      }`}
      onClick={() => (isLiked ? onDisLike() : onLike())}
    ></button>
  );
}
export default LikeButton;
