import { useState } from "react";
import PropTypes from "prop-types";
import { ClickAwayListener, Popper, Slider } from "@mui/material";
import RecipeValidator from "../../../utils/RecipeValidator";
import "./SliderPopper.css";

export default function SliderPopper({
  open,
  anchorEl,
  startingValue,
  minValue,
  maxValue,
  handleChange,
  onRelease,
  close,
}) {
  const [value, setValue] = useState(startingValue);

  return (
    <Popper id="slider-popper" open={open} anchorEl={anchorEl}>
      <ClickAwayListener onClickAway={close}>
        <div className="slider-wrapper">
          <Slider
            className="slider"
            value={value}
            step={1}
            min={minValue}
            max={maxValue}
            onChange={(e) => {
              handleChange(Number(e.target.value));
              setValue(e.target.value);
            }}
            onMouseUp={(e) => onRelease(Number(e.target.value))}
          />
        </div>
      </ClickAwayListener>
    </Popper>
  );
}

SliderPopper.propTypes = {
  open: PropTypes.bool.isRequired,
  anchorEl: PropTypes.object,
  startingValue: PropTypes.number,
  minValue: PropTypes.number,
  maxValue: PropTypes.number,
  handleChange: PropTypes.func.isRequired,
  close: PropTypes.func,
  onRelease: PropTypes.func,
};

SliderPopper.defaultProps = {
  anchorEl: null,
  startingValue: 1,
  minValue: 1,
  maxValue: RecipeValidator.getServingsMaxValue(),
  onRelease: () => null,
  close: () => false,
};
