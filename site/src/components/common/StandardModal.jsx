import PropTypes from "prop-types";
import { Modal, Fade } from "@mui/material";
import "./StandardModal.css";

export default function StandardModal({ open, handleClose, children }) {
  return (
    <Modal className="modal" open={open} onClose={handleClose}>
      <Fade in={open}>
        <div className="modal-box">{children}</div>
      </Fade>
    </Modal>
  );
}

StandardModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  children: PropTypes.node,
};

StandardModal.defaultProps = {
  children: null,
};
