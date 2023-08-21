import { forwardRef } from "react";
import PropTypes from "prop-types";
import { TextField, InputAdornment } from "@mui/material";
import "./TimeInput.css";

const TimeInput = forwardRef(
  ({ labelText, startValue, errorMessage, name, onChange, onBlur }, ref) => (
    <div className="recipe-time-input-wrapper">
      <TextField
        name={name}
        type="number"
        label={labelText}
        variant="outlined"
        defaultValue={startValue || ""}
        size="small"
        onChange={onChange}
        onBlur={onBlur}
        fullWidth
        InputProps={{
          endAdornment: <InputAdornment position="end">minutes</InputAdornment>,
        }}
        error={Boolean(errorMessage)}
        helperText={errorMessage}
        inputRef={ref}
      />
    </div>
  )
);

TimeInput.propTypes = {
  labelText: PropTypes.string.isRequired,
  startValue: PropTypes.number,
  errorMessage: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
};

TimeInput.defaultProps = {
  errorMessage: "",
  startValue: 0,
};

export default TimeInput;
