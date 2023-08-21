import { forwardRef } from "react";
import PropTypes from "prop-types";
import { TextField } from "@mui/material";
import "./ServingsInput.css";

const ServingsInput = forwardRef(
  ({ startValue, errorMessage, name, onChange, onBlur }, ref) => (
    // const minServingsQuantity = 1;
    // const maxServingsQuantity = 99;
    <div className="servings-input-wrapper">
      <TextField
        name={name}
        type="number"
        label="Servings"
        variant="outlined"
        defaultValue={startValue || ""}
        size="small"
        fullWidth
        onBlur={onBlur}
        onChange={onChange}
        error={Boolean(errorMessage)}
        helperText={errorMessage}
        required
        inputRef={ref}
      />
    </div>
  )
);

ServingsInput.propTypes = {
  startValue: PropTypes.number.isRequired,
  errorMessage: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
};

ServingsInput.defaultProps = {
  errorMessage: "",
};

export default ServingsInput;
