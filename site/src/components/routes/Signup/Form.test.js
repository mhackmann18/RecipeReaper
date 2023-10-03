import "@testing-library/jest-dom";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import SignupForm from "./Form";
// import UserController from "../../../utils/UserController"; // api call
import UserContextProvider from "../../../UserContextProvider";

jest.mock("../../../utils/UserController");

function setup() {
  const user = userEvent.setup();
  const headerText = "Create account";
  const headerElementText = "Create an account to save recipes.";
  const headerElement = <p>{headerElementText}</p>;
  const onSubmitSuccess = jest.fn();

  render(
    <UserContextProvider>
      <BrowserRouter>
        <SignupForm
          headerText={headerText}
          headerElement={headerElement}
          onSubmitSuccess={onSubmitSuccess}
          formId="signup-form"
        />
      </BrowserRouter>
    </UserContextProvider>
  );

  return {
    user,
    headerText,
    headerElementText,
    onSubmitSuccess,
  };
}

afterEach(() => cleanup());

test("Renders headerText and headerElement props", async () => {
  const { headerText, headerElementText } = setup();

  expect(screen.getByText(headerText)).toBeInTheDocument();
  expect(screen.getByText(headerElementText)).toBeInTheDocument();
});

// test("Shows error message when submit button is clicked and username", async () => {
//   const { user } = setup();
//   UserController.login.mockImplementation(() => ({ data: null }));

//   await user.type(screen.getByLabelText(/Username/i), "johndoe1");
//   await user.click(screen.getByRole("button", { name: /Log in/i }));

//   expect(UserController.login).not.toHaveBeenCalled();
//   expect(screen.getByText("Required field")).toBeInTheDocument();
// });

// test("Shows error when api returns error", async () => {
//   const { user, onLogin } = setup();
//   const errorMessage = "Username does not exist";
//   UserController.login.mockImplementation(async () => ({
//     error: "generic",
//     message: errorMessage,
//   }));

//   await user.type(screen.getByLabelText(/Username/i), "johndoe1");
//   await user.type(screen.getByLabelText(/Password/i), "password");
//   await user.click(screen.getByRole("button", { name: /Log in/i }));

//   expect(UserController.login).toHaveBeenCalled();
//   expect(onLogin).not.toHaveBeenCalled();
//   expect(screen.getByText(errorMessage)).toBeInTheDocument();
// });

// test("Calls onLogin with data when api return data", async () => {
//   const { user, onLogin } = setup();
//   const userCredentials = {
//     username: "johndoe1",
//     password: "password",
//   };
//   const data = {
//     username: userCredentials.username,
//     id: 1,
//     theme: "light",
//   };
//   UserController.login.mockImplementation(async () => ({
//     data,
//   }));

//   await user.type(screen.getByLabelText(/Username/i), userCredentials.username);
//   await user.type(screen.getByLabelText(/Password/i), userCredentials.password);
//   await user.click(screen.getByRole("button", { name: /Log in/i }));

//   expect(UserController.login).toHaveBeenCalledWith(userCredentials);
//   expect(onLogin).toHaveBeenCalledWith(data);
// });
