import PropTypes from "prop-types";
import { isValidNumberInput } from "../../utils/validation";

export default function NumberInput({
  value,
  setValue,
  maxValue,
  minValue,
  variant,
}) {
  function handleChange(e) {
    if (isValidNumberInput(e.target.value, maxValue, minValue)) {
      setValue(e.target.value === "" ? "" : Number(e.target.value));
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
      )
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
      value={value}
      min={minValue}
      max={maxValue}
      className={variant}
      onChange={handleChange}
      onKeyDown={handleKeydown}
      onPaste={handlePaste}
    />
  );
}

NumberInput.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([""])])
    .isRequired,
  setValue: PropTypes.func.isRequired,
  minValue: PropTypes.number,
  maxValue: PropTypes.number,
  variant: PropTypes.string,
};

NumberInput.defaultProps = {
  minValue: 0,
  maxValue: Infinity,
  variant: "",
};
