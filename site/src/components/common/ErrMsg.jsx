import PropTypes from "prop-types";

export default function ErrMsg({ msg }) {
  return <p className="err-msg">{msg}</p>;
}

ErrMsg.propTypes = {
  msg: PropTypes.string.isRequired,
};
