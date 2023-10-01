import "@testing-library/jest-dom";
import { render, screen, cleanup, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RecipeScrapingForm from "./RecipeScrapingForm";
import getRecipeFromUrl from "../../utils/getRecipeFromUrl"; // api call

jest.mock("../../utils/getRecipeFromUrl");

// Properly formatted url, but doesn't guarantee a successful response from api
const VALID_URL = "https://momsdish.com/recipe/260/steak-sandwich-recipe";
const INVALID_URL = "htp://this-is-an-invalid-url";

function setup() {
  const user = userEvent.setup();
  const handleRecipeData = jest.fn();

  const { rerender, unmount } = render(
    <RecipeScrapingForm
      handleRecipeData={handleRecipeData}
      loading={false}
      setLoading={() => null}
    />
  );

  const setLoading = (loading) =>
    rerender(
      <RecipeScrapingForm
        handleRecipeData={handleRecipeData}
        loading={loading}
        setLoading={setLoading}
      />
    );

  rerender(
    <RecipeScrapingForm
      handleRecipeData={handleRecipeData}
      loading={false}
      setLoading={setLoading}
    />
  );

  return {
    user,
    handleRecipeData,
    unmount,
  };
}

afterEach(() => cleanup());

test("Calls handleRecipeData after api returns recipe data", async () => {
  const { user, handleRecipeData } = setup();
  const apiData = {
    title: "This is a valid recipe response",
  };
  getRecipeFromUrl.mockImplementation(async () => apiData);

  await user.type(
    screen.getByPlaceholderText(/Paste a recipe's url/i),
    VALID_URL
  );
  await user.click(screen.getByRole("button", { name: /Get Recipe/i }));

  await waitFor(() => expect(handleRecipeData).toHaveBeenCalledWith(apiData));
});

test("Shows an error message after api returns error", async () => {
  const { user } = setup();
  const errorMessage = "Failed to get recipe from the url";
  getRecipeFromUrl.mockImplementation(async () => errorMessage);

  await user.type(
    screen.getByPlaceholderText(/Paste a recipe's url/i),
    VALID_URL
  );
  await user.click(screen.getByRole("button", { name: /Get Recipe/i }));

  await waitFor(() =>
    expect(screen.getByText(errorMessage)).toBeInTheDocument()
  );
});

test("Shows an error message after attempting to submit incorrectly formatted url input", async () => {
  const { user, handleRecipeData } = setup();
  const input = screen.getByPlaceholderText(/Paste a recipe's url/i);

  await user.type(input, INVALID_URL);
  await user.click(screen.getByRole("button", { name: /Get Recipe/i }));

  expect(input).toHaveValue(INVALID_URL);
  await waitFor(() => {
    expect(screen.getByText(/Please enter a valid url/i)).toBeInTheDocument();
    expect(handleRecipeData).not.toHaveBeenCalled();
  });
});

test("Hides error message after changing input", async () => {
  const { user } = setup();
  const input = screen.getByPlaceholderText(/Paste a recipe's url/i);

  await user.type(input, INVALID_URL);
  await user.click(screen.getByRole("button", { name: /Get Recipe/i }));
  waitFor(() => screen.getByText(/Please enter a valid url/i));
  await user.type(input, "updated input");

  expect(screen.queryByText(/Please enter a valid url/i)).toBe(null);
});

test("Disables the submit button after submitting and renables it after api responds", async () => {
  const { user, handleRecipeData } = setup();
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

  await waitFor(() => expect(submitButton).toBeDisabled());
  await waitFor(() => expect(handleRecipeData).toHaveBeenCalled());
  expect(submitButton).not.toBeDisabled();
});
