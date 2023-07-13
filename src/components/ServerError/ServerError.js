import "./ServerError.css";
function ServerError({ errorMessage }) {
  return <p className="server-error">{errorMessage}</p>;
}
export default ServerError;
