import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import SavedRecipeItem from "./Item";
import data from "../../../assets/data.json";
import Recipe from "../../../utils/Recipe";

test("Save changes button is disabled immediately after switching to form", () => {
  render(
    <BrowserRouter>
      <SavedRecipeItem
        startRecipe={new Recipe({ ...data[0] })}
        startingDisplayType="form"
      />
    </BrowserRouter>
  );

  expect(screen.getByRole("button", { name: "Save Changes" })).toBeDisabled();
});
