import PropTypes from "prop-types";
import "./ConfirmationDisplay.css";

export default function ConfirmationDisplay({
  headerText,
  messageText,
  cancelBtnText,
  confirmBtnText,
  onCancel,
  onConfirm,
}) {
  return (
    <div className="confirmation-display">
      <h3>{headerText}</h3>
      <p>{messageText}</p>
      <div className="buttons-container">
        <button onClick={onCancel} className="btn-no-bg" type="button">
          {cancelBtnText}
        </button>
        <button
          onClick={onConfirm}
          className="btn-default btn-eerie-black"
          type="button"
        >
          {confirmBtnText}
        </button>
      </div>
    </div>
  );
}

ConfirmationDisplay.propTypes = {
  headerText: PropTypes.string.isRequired,
  messageText: PropTypes.string,
  cancelBtnText: PropTypes.string.isRequired,
  confirmBtnText: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

ConfirmationDisplay.defaultProps = {
  messageText: "",
};
