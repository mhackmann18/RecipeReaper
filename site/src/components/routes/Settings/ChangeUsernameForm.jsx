import { useState } from "react";
import PropTypes from "prop-types";
import { Alert } from "@mui/material";
import Button from "../../common/Button";
import { checkUsernameInput } from "../../../utils/validation";
import User from "../../../utils/UserController";
import useUser from "../../../hooks/useUser";
import useRedirectOnAuthError from "../../../hooks/useRedirectOnAuthError";
import "./ChangeSettingForm.css";

export default function ChangeUsernameForm({ onCancel, onSuccess }) {
  const [inputError, setInputError] = useState("");
  const redirectOnAuthError = useRedirectOnAuthError();
  const { user, setUser } = useUser();

  async function handleSubmit(e) {
    e.preventDefault();
    const newUsername = e.target.username.value;

    const [isValid, errorMessage] = checkUsernameInput(newUsername);

    if (!isValid) {
      setInputError(errorMessage);
    } else {
      User.update({ username: newUsername }, user).then(
        ({ data, message, error }) => {
          redirectOnAuthError(error);

          if (data) {
            const { username } = data;
            setUser({ ...user, username });
            setInputError("");
            onSuccess("Username updated");
            return;
          }

          setInputError(message);
        }
      );
    }
  }

  return (
    <form className="settings-change-form" onSubmit={handleSubmit}>
      <div className="row">
        <label htmlFor="username">New Username:</label>
        <input id="username" name="username" type="text" />
      </div>
      {inputError && (
        <Alert className="settings-change-error" severity="error">
          {inputError}
        </Alert>
      )}
      <div className="row buttons">
        <Button text="Cancel" handleClick={onCancel} variant="btn-no-bg" />
        <Button text="Save" type="submit" variant="btn-default" />
      </div>
    </form>
  );
}

ChangeUsernameForm.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
};
