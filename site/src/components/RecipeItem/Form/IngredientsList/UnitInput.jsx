import { forwardRef } from "react";
import PropTypes from "prop-types";
import { TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import {
  standardFormUnits,
  standardFormUnitsPlural,
} from "../../../../utils/cookingUnit";
import "./UnitInput.css";

const UnitInput = forwardRef(
  ({ ingredientUnit, name, onChange, onBlur }, ref) => (
    <div className="ingredient-unit-select-wrapper">
      <TextField
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        select
        size="small"
        label="Unit"
        defaultValue={ingredientUnit || ""}
        fullWidth
        InputProps={{
          inputProps: { id: name },
        }}
        InputLabelProps={{
          htmlFor: name,
        }}
        inputRef={ref}
      >
        {["", ...standardFormUnits].map((el) => (
          <MenuItem key={el} value={el}>
            {el}
          </MenuItem>
        ))}
      </TextField>
    </div>
  )
);

UnitInput.propTypes = {
  ingredientUnit: PropTypes.oneOf([
    "",
    ...standardFormUnits,
    ...standardFormUnitsPlural,
  ]),
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
};

UnitInput.defaultProps = {
  ingredientUnit: "",
};

export default UnitInput;
