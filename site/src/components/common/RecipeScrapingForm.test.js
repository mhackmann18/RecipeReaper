import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import RecipeScrapingForm from "./RecipeScrapingForm";

test("Renders text input and button", () => {
  const fn = () => null;

  render(
    <BrowserRouter>
      <RecipeScrapingForm onSubmit={fn} onSuccess={fn} />
    </BrowserRouter>
  );

  expect(
    screen.getByRole("button", { name: /Get Recipe/i })
  ).toBeInTheDocument();

  expect(
    screen.getByPlaceholderText(/Paste a recipe's url/i)
  ).toBeInTheDocument();
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
