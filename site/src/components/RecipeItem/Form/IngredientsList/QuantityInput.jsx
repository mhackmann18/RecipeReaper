import { forwardRef } from "react";
import PropTypes from "prop-types";
import { TextField } from "@mui/material";
// import { formatAmount } from "../../../../utils/helperFunctions";
import "./QuantityInput.css";

const QuantityInput = forwardRef(
  ({ ingredientQuantity, errorMessage, name, onChange, onBlur }, ref) => (
    <div className="ingredient-quantity-input-wrapper">
      <TextField
        name={name}
        className="nowrap"
        onChange={onChange}
        onBlur={onBlur}
        type="number"
        defaultValue={ingredientQuantity || ""}
        label="Quantity"
        variant="outlined"
        size="small"
        fullWidth
        error={Boolean(errorMessage)}
        helperText={errorMessage}
        InputProps={{
          inputProps: { step: "any" },
        }}
        inputRef={ref}
      />
    </div>
  )
);

QuantityInput.propTypes = {
  ingredientQuantity: PropTypes.number,
  errorMessage: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
};

QuantityInput.defaultProps = {
  ingredientQuantity: 0,
  errorMessage: "",
};

export default QuantityInput;
