import PropTypes from "prop-types";
import Ingredient from "../../../../utils/Ingredient";
import IngredientsListItem from "./ListItem";

export default function IngredientInputsList({
  ingredients,
  onDeleteIngredient,
  ingredientsErrors,
  register,
  watch,
}) {
  return (
    <ul id="ingredients-list">
      {ingredients.length
        ? ingredients.map((ingredient) => (
            <IngredientsListItem
              key={ingredient.id}
              ingredient={ingredient}
              onDeleteIngredient={onDeleteIngredient}
              register={register}
              watch={watch}
              ingredientErrors={
                ingredientsErrors && ingredientsErrors[ingredient.id]
              }
            />
          ))
        : false}
    </ul>
  );
}

IngredientInputsList.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.instanceOf(Ingredient)).isRequired,
  onDeleteIngredient: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  ingredientsErrors: PropTypes.object,
  watch: PropTypes.func.isRequired,
};

IngredientInputsList.defaultProps = {
  ingredientsErrors: null,
};
