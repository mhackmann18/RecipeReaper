import { Snackbar, Alert } from "@mui/material";
import PropTypes from "prop-types";

export default function Toast({ state, onClose }) {
  const { open, activeMessage, severity } = state;
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        sx={{ width: "100%", border: 1 }}
      >
        {activeMessage}
      </Alert>
    </Snackbar>
  );
}

Toast.propTypes = {
  state: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};
