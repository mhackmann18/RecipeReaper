/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from "prop-types";
import NutrientInput from "./Input";
import Recipe from "../../../../utils/Recipe";
import "./index.css";
import RecipeValidator from "../../../../utils/RecipeValidator";

export default function NutrientsList({ nutrients, register, errors }) {
  return (
    <ul className="nutrients-list">
      {Recipe.getValidNutrientsArr().map(({ name, unit }) => (
        <li key={name}>
          <NutrientInput
            labelText={Recipe.getNutrientNameStringFromKey(name)}
            unit={unit}
            quantity={nutrients && nutrients[name] && nutrients[name].quantity}
            errorMessage={
              errors.nutrients &&
              errors.nutrients[name] &&
              errors.nutrients[name].message
            }
            {...register(`nutrients.${name}`, {
              validate: (str) => RecipeValidator.getNutrientErrMsg(str, false),
            })}
          />
        </li>
      ))}
    </ul>
  );
}

NutrientsList.propTypes = {
  nutrients: PropTypes.object,
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

NutrientsList.defaultProps = {
  nutrients: null,
};
