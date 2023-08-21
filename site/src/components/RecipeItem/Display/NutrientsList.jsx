import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import "./NutrientsList.css";
import Recipe from "../../../utils/Recipe";

export default function NutrientsList({ nutrients, servingSize }) {
  const nutrientsStrings = Recipe.getNutrientsStrings(nutrients);

  return (
    <ul id="nutrients-list">
      <li>
        Serving Size: {servingSize.quantity} {servingSize.unit},
      </li>
      {nutrientsStrings.map((el, i) =>
        i !== nutrientsStrings.length - 1 ? (
          <li key={uuidv4()}>{el},</li>
        ) : (
          <li key={uuidv4()}>{el}</li>
        )
      )}
    </ul>
  );
}

NutrientsList.propTypes = {
  nutrients: PropTypes.object.isRequired,
  servingSize: PropTypes.object,
};

NutrientsList.defaultProps = {
  servingSize: { quantity: 1, unit: "serving" },
};
