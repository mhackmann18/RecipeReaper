import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "./AddButton.css";

export default function AddButton({ text, onClick }) {
  return (
    <button type="button" className="add-btn" onClick={onClick}>
      <FontAwesomeIcon icon={faPlus} /> {text}
    </button>
  );
}

AddButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
