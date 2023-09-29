import spinner from "../../assets/loading-gif.gif";
import "./Spinner.css";

export default function Spinner() {
  return <img className="spinner" src={spinner} alt="spinner-gif" />;
}
