/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from "prop-types";
import { TextField } from "@mui/material";
import RecipeValidator from "../../../utils/RecipeValidator";
import "./ServingSizeInput.css";

export default function ServingSizeInput({
  servingSize,
  register,
  servingSizeErrors,
}) {
  return (
    <div className="serving-size-input-container">
      <span className="serving-size-inputs-title">Serving Size:</span>
      <div className="serving-size-quantity-wrapper">
        <TextField
          {...register("servingSize.quantity", {
            validate: (str) =>
              RecipeValidator.getServingSizeQuantityErrMsg(str, false),
          })}
          className="nowrap"
          type="number"
          defaultValue={servingSize.quantity || ""}
          label="Quantity"
          variant="outlined"
          size="small"
          fullWidth
          error={Boolean(servingSizeErrors?.quantity)}
          helperText={servingSizeErrors?.quantity?.message}
          InputProps={{
            inputProps: {
              step: "any",
            },
          }}
        />
      </div>
      <div className="serving-size-unit-wrapper">
        <TextField
          {...register("servingSize.unit", {
            validate: RecipeValidator.getServingSizeUnitErrMsg,
          })}
          defaultValue={servingSize.unit || ""}
          label="Unit"
          variant="outlined"
          autoComplete="off"
          size="small"
          fullWidth
          error={Boolean(servingSizeErrors?.unit)}
          helperText={servingSizeErrors?.unit?.message}
        />
      </div>
    </div>
  );
}

ServingSizeInput.propTypes = {
  servingSize: PropTypes.object,
  register: PropTypes.func.isRequired,
  servingSizeErrors: PropTypes.object,
};

ServingSizeInput.defaultProps = {
  servingSize: { quantity: "", unit: "" },
  servingSizeErrors: null,
};
