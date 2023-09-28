import "@testing-library/jest-dom";
import { render, screen, cleanup, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RecipeScrapingForm from "./RecipeScrapingForm";
import getRecipeFromUrl from "../../utils/getRecipeFromUrl";

// Properly formatted url, but not necessarily a url that will guarantee a successful api response via getRecipeFromUrl
const VALID_URL = "https://momsdish.com/recipe/260/steak-sandwich-recipe";

function setup() {
  const user = userEvent.setup();
  const onSubmit = jest.fn();
  const onSuccess = jest.fn();
  const onFailure = jest.fn();
  render(
    <RecipeScrapingForm
      onSubmit={onSubmit}
      onSuccess={onSuccess}
      onFailure={onFailure}
    />
  );
  return {
    user,
    onSubmit,
    onSuccess,
    onFailure,
  };
}

afterEach(() => cleanup());

jest.mock("../../utils/getRecipeFromUrl");

test("Renders text input and button", () => {
  setup();

  expect(
    screen.getByRole("button", { name: /Get Recipe/i })
  ).toBeInTheDocument();
  expect(
    screen.getByPlaceholderText(/Paste a recipe's url/i)
  ).toBeInTheDocument();
});

test("Show error after submitting incorrectly formatted url input", async () => {
  const { user, onSubmit } = setup();
  const url = "htp://this-is-an-invalid-url";
  const input = screen.getByPlaceholderText(/Paste a recipe's url/i);

  await user.type(input, url);
  user.click(screen.getByRole("button", { name: /Get Recipe/i }));

  expect(input).toHaveValue(url);
  await waitFor(() => {
    expect(screen.getByText(/Please enter a valid url/i)).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });
});

test("Show error and call onFailure after api returns error", async () => {
  const { user, onFailure } = setup();
  const errorMessage = "Failed to get recipe from the url";
  getRecipeFromUrl.mockImplementation(async () => errorMessage);

  await user.type(
    screen.getByPlaceholderText(/Paste a recipe's url/i),
    VALID_URL
  );
  await user.click(screen.getByRole("button", { name: /Get Recipe/i }));

  await waitFor(() => expect(onFailure).toHaveBeenCalledWith(errorMessage));
  expect(screen.getByText(errorMessage)).toBeInTheDocument();
});

// Hide error after changing input

// Accept correctly formatted url

test("Disable submit button until api responds", async () => {
  const { user, onSuccess } = setup();
  const submitButton = screen.getByRole("button", { name: /Get Recipe/i });
  getRecipeFromUrl.mockImplementation(async () => {
    // eslint-disable-next-line no-promise-executor-return
    await new Promise((resolve) => setTimeout(resolve, 100));
    return { title: "This is a successful api response" };
  });

  await user.type(
    screen.getByPlaceholderText(/Paste a recipe's url/i),
    VALID_URL
  );
  await user.click(submitButton);

  expect(submitButton).toBeDisabled();
  await waitFor(() => expect(onSuccess).toHaveBeenCalled());
  expect(submitButton).not.toBeDisabled();
});
