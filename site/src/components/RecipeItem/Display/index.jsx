import { useState } from "react";
import PropTypes from "prop-types";
import RecipeContainer from "../RecipeContainer";
import SubHeading from "./SubHeading";
import IngredientsList from "./IngredientsList";
import NutrientsList from "./NutrientsList";
import Recipe from "../../../utils/Recipe";
import RecipeButtons from "../Buttons";

export default function RecipeDisplay({
  rootRecipe,
  setRootRecipe,
  buttonSettings,
  onServingsClick,
}) {
  const [recipe, setRecipe] = useState(new Recipe({ ...rootRecipe }));
  const {
    cookTime,
    ingredients,
    instructions,
    nutrients,
    prepTime,
    title,
    servings,
    servingSize,
    originalUrl,
  } = recipe;

  const handleSliderBlur = async (newServings) => {
    if (newServings === rootRecipe.servings) {
      return false;
    }
    setRootRecipe(recipe);
  };

  const handleSliderChange = (newServings) => {
    setRecipe(
      new Recipe({
        ...rootRecipe,
        servings: newServings,
      }).multiplyIngredients(newServings / rootRecipe.servings)
    );
  };

  return (
    <div id="recipe">
      <RecipeContainer
        titleComponent={<h2>{title}</h2>}
        subHeadingComponent={
          <SubHeading
            defaultServings={rootRecipe.servings}
            servings={servings}
            prepTime={prepTime}
            cookTime={cookTime}
            onSliderChange={handleSliderChange}
            onSliderBlur={handleSliderBlur}
            onServingsClick={onServingsClick}
          />
        }
        buttonsComponent={<RecipeButtons buttonSettings={buttonSettings} />}
        ingredientsComponent={<IngredientsList ingredients={ingredients} />}
        instructionsComponent={
          <ol id="instructions-list">
            {instructions.map((el) => (
              <li key={el.id}>{el.text}</li>
            ))}
          </ol>
        }
        nutrientsComponent={
          nutrients && (
            <NutrientsList
              nutrients={nutrients}
              servingsCount={servings}
              servingSize={servingSize}
            />
          )
        }
        originalRecipeUrl={originalUrl}
      />
    </div>
  );
}

RecipeDisplay.propTypes = {
  rootRecipe: PropTypes.instanceOf(Recipe).isRequired,
  setRootRecipe: PropTypes.func,
  buttonSettings: PropTypes.object,
  onServingsClick: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.oneOf([null]),
  ]),
};

RecipeDisplay.defaultProps = {
  buttonSettings: {},
  onServingsClick: null,
  setRootRecipe: () => null,
};
