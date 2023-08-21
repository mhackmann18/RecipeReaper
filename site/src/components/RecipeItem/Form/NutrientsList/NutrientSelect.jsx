import PropTypes from "prop-types";
import nutrientNames from "../../../../utils/validNutrients";

export default function NutrientSelect({ nutrientName }) {
  return (
    <select
      className="nutrient-name"
      name="nutrient-name"
      title="Name"
      defaultValue={nutrientName}
    >
      {["", ...nutrientNames].map((el, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <option value={el} key={index}>
          {el}
        </option>
      ))}
    </select>
  );
}

NutrientSelect.propTypes = {
  nutrientName: PropTypes.oneOf([...nutrientNames]).isRequired,
};
