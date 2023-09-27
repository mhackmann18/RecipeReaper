import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import RecipeScrapingForm from "./RecipeScrapingForm";

test("Renders text input and button", () => {
  const fn = () => null;

  // screen.

  render(
    <BrowserRouter>
      <RecipeScrapingForm onSubmit={fn} onSuccess={fn} onFailure={fn} />
    </BrowserRouter>
  );
});

test("Show error message after submitting incorrectly formatted url input", () => {
  const fn = () => null;
  render(
    <BrowserRouter>
      <RecipeScrapingForm onSubmit={fn} onSuccess={fn} onFailure={fn} />
    </BrowserRouter>
  );
});

// Hide error after changing input

// Accept correctly formatted url

// Disable submit button while loading
