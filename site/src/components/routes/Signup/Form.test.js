import "@testing-library/jest-dom";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SignupForm from "./Form";
// import UserController from "../../../utils/UserController"; // api call

jest.mock("../../../utils/UserController");

function setup() {
  const user = userEvent.setup();
  const onSubmitSuccess = jest.fn();
  const headerText = "Create an account";
  const headerElement = <p>Create an account to save recipes</p>;
  const formId = "signup-form";

  render(
    <SignupForm
      headerText={headerText}
      headerElement={headerElement}
      onSubmitSuccess={onSubmitSuccess}
      formId={formId}
    />
  );

  return {
    user,
    onSubmitSuccess,
    headerText,
    headerElement,
  };
}

afterEach(() => cleanup());

test("Renders headerText and headerElement props, three text inputs and a submit button", () => {
  const { headerText } = setup();

  expect(screen.getByText(headerText)).toBeInTheDocument();
  // expect(headerElement).toBeInTheDocument();
});

test("Shows error message when submit button is clicked and password field is empty", () => {});
