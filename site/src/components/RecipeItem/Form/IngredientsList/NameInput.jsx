import { forwardRef } from "react";
import PropTypes from "prop-types";
import { TextField } from "@mui/material";
import "./NameInput.css";

const NameInput = forwardRef(
  ({ ingredientName, errorMessage, name, onChange, onBlur }, ref) => (
    <div className="ingredient-name-input-wrapper">
      <TextField
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        defaultValue={ingredientName}
        autoComplete="off"
        label="Name"
        variant="outlined"
        size="small"
        fullWidth
        required
        error={Boolean(errorMessage)}
        helperText={errorMessage}
        inputRef={ref}
      />
    </div>
  )
);

NameInput.propTypes = {
  ingredientName: PropTypes.string,
  errorMessage: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
};

NameInput.defaultProps = {
  ingredientName: "",
  errorMessage: "",
};

export default NameInput;
