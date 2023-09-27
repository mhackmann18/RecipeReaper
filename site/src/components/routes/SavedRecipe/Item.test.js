import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import user from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import SavedRecipeItem from "./Item";
import data from "../../../assets/data.json";
import Recipe from "../../../utils/Recipe";

test("Recipe form's save changes button is disabled by default", () => {
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

test("Check that calories input value is updating after typing new value", async () => {
  render(
    <BrowserRouter>
      <SavedRecipeItem
        startRecipe={new Recipe({ ...data[0] })}
        startingDisplayType="form"
      />
    </BrowserRouter>
  );

  const caloriesInput = screen.getByLabelText("Calories");

  user.clear(caloriesInput);
  user.type(caloriesInput, "100");

  await waitFor(() => {
    expect(caloriesInput).toHaveValue(100);
  });
});
