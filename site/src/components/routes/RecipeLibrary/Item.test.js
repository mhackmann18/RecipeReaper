import "@testing-library/jest-dom";
import { render, screen, cleanup, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import UserContextProvider from "../../../UserContextProvider";
import RecipeLibraryItem from "./Item";
import Recipe from "../../../utils/Recipe";
import data from "../../../__test__/recipes.json";
import User from "../../../utils/UserController";

jest.mock("../../../utils/UserController");

const RECIPE = new Recipe(data[0]);

function setup() {
  const user = userEvent.setup();
  const onEditBtnClick = jest.fn();
  const onDuplicateSuccess = jest.fn();
  const onDeleteSuccess = jest.fn();
  const onClick = jest.fn();
  const handleError = jest.fn();
  render(
    <UserContextProvider>
      <BrowserRouter>
        <RecipeLibraryItem
          recipe={RECIPE}
          onEditBtnClick={onEditBtnClick}
          onDuplicateSuccess={onDuplicateSuccess}
          onDeleteSuccess={onDeleteSuccess}
          onClick={onClick}
          handleError={handleError}
        />
      </BrowserRouter>
    </UserContextProvider>
  );
  return {
    user,
    onDeleteSuccess,
    onEditBtnClick,
    onDuplicateSuccess,
    onClick,
    handleError,
  };
}

afterEach(() => cleanup());

test("Renders recipe info and buttons", () => {
  setup();

  expect(screen.getByText(RECIPE.title)).toBeInTheDocument();
  expect(screen.getByText(`Servings: ${RECIPE.servings}`)).toBeInTheDocument();
  expect(
    screen.getByText(
      `Calories per Serving: ${RECIPE.nutrients.calories.quantity}`
    )
  ).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /Delete/i })).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: /Duplicate/i })
  ).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /Edit/i })).toBeInTheDocument();
});

test("Opens modal after delete button is clicked, then closes after close button is clicked", async () => {
  const { user } = setup();

  await user.click(screen.getByRole("button", { name: /delete/i }));
  // wait for confirmation dialog
  await screen.findByRole("presentation");
  await user.click(screen.getByRole("button", { name: /cancel/i }));

  await waitFor(() => expect(screen.queryByRole("presentation")).toBe(null));
});

test("Calls onClick after being clicked", async () => {
  const { user, onClick } = setup();

  await user.click(screen.getByRole("button", { name: RECIPE.title }));

  expect(onClick).toBeCalled();
});

test("Calls onDuplicateSuccess after successful duplication", async () => {
  const { user, onClick, onDuplicateSuccess } = setup();
  User.saveRecipe.mockImplementation(async () => ({
    data: RECIPE,
  }));

  await user.click(screen.getByRole("button", { name: /duplicate/i }));

  expect(User.saveRecipe).toBeCalled();
  expect(onDuplicateSuccess).toBeCalled();
  expect(onClick).not.toBeCalled();
});

test("Calls onDeleteSuccess and closes delete modal after successful deletion", async () => {
  const { user, onClick, onDeleteSuccess } = setup();
  User.deleteRecipe.mockImplementation(async () => ({ data: RECIPE }));

  await user.click(screen.getByRole("button", { name: /delete/i }));
  // wait for confirmation dialog
  await screen.findByRole("presentation");
  // confirm deletion
  await user.click(screen.getByRole("button", { name: /delete/i }));

  await waitFor(() => expect(screen.queryByRole("presentation")).toBe(null));
  expect(User.deleteRecipe).toBeCalled();
  expect(onDeleteSuccess).toBeCalled();
  expect(onClick).not.toBeCalled();
});

test("Calls onEditBtnClick after edit button is clicked", async () => {
  const { user, onClick, onEditBtnClick } = setup();

  await user.click(screen.getByRole("button", { name: /edit/i }));

  expect(onEditBtnClick).toBeCalled();
  expect(onClick).not.toBeCalled();
});

test("Calls handleError when UserController returns error", async () => {
  const { user, handleError } = setup();
  User.saveRecipe.mockImplementation(async () => ({
    error: "generic",
    message: "An unexpected error occurred",
  }));

  await user.click(screen.getByRole("button", { name: /duplicate/i }));

  expect(handleError).toBeCalled();
});
