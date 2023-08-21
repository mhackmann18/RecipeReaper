import PropTypes from "prop-types";
import "./NoContentMessage.css";

export default function NoContentMessage({ headerText, subText }) {
  return (
    <div className="no-content-message">
      <div className="container">
        <h3>{headerText}</h3>
        <p>{subText}</p>
      </div>
    </div>
  );
}

NoContentMessage.propTypes = {
  headerText: PropTypes.string.isRequired,
  subText: PropTypes.string,
};

NoContentMessage.defaultProps = {
  subText: "",
};
