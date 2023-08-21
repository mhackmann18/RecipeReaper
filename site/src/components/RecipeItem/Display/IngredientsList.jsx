import PropTypes from "prop-types";

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
  ingredients: PropTypes.arrayOf(PropTypes.object).isRequired,
};
