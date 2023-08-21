import { useState } from "react";
import PropTypes from "prop-types";
import SliderPopper from "./SliderPopper";
import "./SubHeading.css";

export default function SubHeading({
  defaultServings,
  servings,
  prepTime,
  cookTime,
  onSliderChange,
  onSliderBlur,
  onServingsClick,
}) {
  if (!prepTime && !cookTime && !servings) {
    return false;
  }

  const [sliderAnchorEl, setAnchorEl] = useState(null);
  const sliderOpen = Boolean(sliderAnchorEl);

  const handleServingsButtonClick = (e) => {
    setAnchorEl(sliderAnchorEl ? null : e.currentTarget);
  };

  return (
    <p id="sub-heading">
      <span>
        Servings:{" "}
        <button
          type="button"
          className={`btn-link servings-btn${sliderAnchorEl ? " active" : ""}`}
          onClick={onServingsClick || handleServingsButtonClick}
        >
          {servings}
        </button>
      </span>
      <span>{`Prep Time: ${prepTime ? `${prepTime} minutes` : "- -"}`}</span>
      <span>{`Cook Time: ${cookTime ? `${cookTime} minutes` : "- -"}`}</span>
      <SliderPopper
        open={sliderOpen}
        anchorEl={sliderAnchorEl}
        startingValue={defaultServings}
        handleChange={onSliderChange}
        onRelease={onSliderBlur}
        close={() => setAnchorEl(null)}
      />
    </p>
  );
}

SubHeading.propTypes = {
  defaultServings: PropTypes.number.isRequired,
  servings: PropTypes.number,
  prepTime: PropTypes.number,
  cookTime: PropTypes.number,
  onSliderChange: PropTypes.func.isRequired,
  onSliderBlur: PropTypes.func.isRequired,
  onServingsClick: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.oneOf([null]),
  ]),
};

SubHeading.defaultProps = {
  servings: 0,
  prepTime: 0,
  cookTime: 0,
  onServingsClick: null,
};
