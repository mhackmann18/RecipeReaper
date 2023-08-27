import PropTypes from "prop-types";
import Ingredient from "../../../utils/Ingredient";

export default function IngredientsList({ ingredients }) {
  return (
    <ul>
      {ingredients.map((ing) => (
        <li key={ing.id}>{ing.getString()}</li>
      ))}
    </ul>
  );
}

IngredientsList.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.instanceOf(Ingredient)).isRequired,
};
