/* eslint-disable react/button-has-type */
import PropTypes from "prop-types";
import "./Button.css";

export default function Button({ text, type, handleClick, variant }) {
  return (
    <button onClick={handleClick} type={type} className={variant}>
      {text}
    </button>
  );
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.string,
  handleClick: PropTypes.func,
  variant: PropTypes.string,
};

Button.defaultProps = {
  type: "button",
  handleClick: () => false,
  variant: "default",
};
