import { render, screen } from "@testing-library/react";
import RecipeItemDisplayIngredientsList from "./IngredientsList";
import data from "../../../__test__/recipes.json";
import Ingredient from "../../../utils/Ingredient";
import "@testing-library/jest-dom";

test("Renders ingredients", () => {
  // Arrange
  const recipe = data[0];
  const ingredients = recipe.ingredients.map((i) => new Ingredient(i));
  render(<RecipeItemDisplayIngredientsList ingredients={ingredients} />);

  const escapeRegExp = (string) =>
    string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // Escape special characters

  // Assert
  for (const i of ingredients) {
    const escapedName = escapeRegExp(i.name);
    expect(screen.getByText(new RegExp(escapedName, "i"))).toBeInTheDocument();
  }
});
