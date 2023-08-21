import PropTypes from "prop-types";
import { isValidNumberInput } from "../../../utils/validation";

export default function NumberInput({
  startingValue,
  maxValue,
  minValue,
  variant,
  title,
  name,
  id,
}) {
  function handleChange(e) {
    // console.log(e.target.value);
    if (!isValidNumberInput(e.target.value, maxValue, minValue)) {
      e.preventDefault();
    }
  }

  function handleKeydown(e) {
    // Only allows the backspace key and number keys from the number row and number pad
    // Credit to: https://stackoverflow.com/questions/7372067/is-there-any-way-to-prevent-input-type-number-getting-negative-values
    if (
      !(
        (e.keyCode > 95 && e.keyCode < 106) ||
        (e.keyCode > 47 && e.keyCode < 58) ||
        e.keyCode === 8
      ) ||
      (Number(e.target.value) > 99 && e.keyCode !== 8)
    ) {
      e.preventDefault();
    }
  }

  function handlePaste(e) {
    // Credit to https://stackoverflow.com/questions/2176861/javascript-get-clipboard-data-on-paste-event-cross-browser
    const clipboardData = e.clipboardData || window.clipboardData;
    const pastedData = clipboardData.getData("Text");

    if (!isValidNumberInput(pastedData, maxValue, minValue)) {
      e.stopPropagation();
      e.preventDefault();
    }
  }

  return (
    <input
      type="number"
      defaultValue={startingValue}
      min={minValue}
      max={maxValue}
      className={variant}
      title={title}
      name={name}
      id={id}
      onChange={handleChange}
      onKeyDown={handleKeydown}
      onPaste={handlePaste}
      step="any"
    />
  );
}

NumberInput.propTypes = {
  startingValue: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([""])]),
  minValue: PropTypes.number,
  maxValue: PropTypes.number,
  variant: PropTypes.string,
  name: PropTypes.string.isRequired,
  title: PropTypes.string,
  id: PropTypes.string,
};

NumberInput.defaultProps = {
  startingValue: "",
  minValue: 0,
  maxValue: Infinity,
  variant: "",
  title: "",
  id: "",
};
