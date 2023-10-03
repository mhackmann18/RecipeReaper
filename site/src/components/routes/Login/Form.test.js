import "@testing-library/jest-dom";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import LoginForm from "./Form";
import UserController from "../../../utils/UserController"; // api call
import UserContextProvider from "../../../UserContextProvider";

jest.mock("../../../utils/UserController");

function setup() {
  const user = userEvent.setup();
  const onLogin = jest.fn();

  render(
    <UserContextProvider>
      <BrowserRouter>
        <LoginForm onLogin={onLogin} />
      </BrowserRouter>
    </UserContextProvider>
  );

  return {
    user,
    onLogin,
  };
}

afterEach(() => cleanup());

test("Shows error message when submit button is clicked and username field is empty", async () => {
  const { user } = setup();
  UserController.login.mockImplementation(() => null);

  await user.type(screen.getByLabelText(/Password/i), "password");
  await user.click(screen.getByRole("button", { name: /Log in/i }));

  expect(UserController.login).not.toHaveBeenCalled();
  expect(screen.getByText("Required field")).toBeInTheDocument();
});

test("Shows error message when submit button is clicked and password field is empty", async () => {
  const { user } = setup();
  UserController.login.mockImplementation(() => null);

  await user.type(screen.getByLabelText(/Username/i), "johndoe1");
  await user.click(screen.getByRole("button", { name: /Log in/i }));

  expect(UserController.login).not.toHaveBeenCalled();
  expect(screen.getByText("Required field")).toBeInTheDocument();
});

test("Shows error when api returns error", async () => {
  const { user, onLogin } = setup();
  const errorMessage = "Username does not exist";
  UserController.login.mockImplementation(async () => ({
    error: "generic",
    message: errorMessage,
  }));

  await user.type(screen.getByLabelText(/Username/i), "johndoe1");
  await user.type(screen.getByLabelText(/Password/i), "password");
  await user.click(screen.getByRole("button", { name: /Log in/i }));

  expect(UserController.login).toHaveBeenCalled();
  expect(onLogin).not.toHaveBeenCalled();
  expect(screen.getByText(errorMessage)).toBeInTheDocument();
});

test("Calls onLogin with data when api return data", async () => {
  const { user, onLogin } = setup();
  const userCredentials = {
    username: "johndoe1",
    password: "password",
  };
  const data = {
    username: userCredentials.username,
    id: 1,
    theme: "light",
  };
  UserController.login.mockImplementation(async () => ({
    data,
  }));

  await user.type(screen.getByLabelText(/Username/i), userCredentials.username);
  await user.type(screen.getByLabelText(/Password/i), userCredentials.password);
  await user.click(screen.getByRole("button", { name: /Log in/i }));

  expect(UserController.login).toHaveBeenCalledWith(userCredentials);
  expect(onLogin).toHaveBeenCalledWith(data);
});
