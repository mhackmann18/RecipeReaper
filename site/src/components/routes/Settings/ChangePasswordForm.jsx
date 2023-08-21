import { useState } from "react";
import PropTypes from "prop-types";
import { Alert } from "@mui/material";
import Button from "../../common/Button";
import { checkPasswordInput } from "../../../utils/validation";
import User from "../../../utils/UserController";
import useUser from "../../../hooks/useUser";
import useRedirectOnAuthError from "../../../hooks/useRedirectOnAuthError";
import "./ChangeSettingForm.css";

export default function ChangePasswordForm({ onCancel, onSuccessfulSubmit }) {
  const [inputError, setInputError] = useState("");
  const redirectOnAuthError = useRedirectOnAuthError();
  const { user } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPassword = e.target["new-password"].value;
    const confirmNewPassword = e.target["confirm-new-password"].value;

    const [isValid, errorMessage] = await checkPasswordInput(newPassword);

    if (!isValid) {
      setInputError(errorMessage);
    } else if (confirmNewPassword !== newPassword) {
      setInputError("Passwords don't match");
    } else {
      const { data, message, error } = await User.update(
        { password: newPassword },
        user
      );

      redirectOnAuthError(error);

      if (data) {
        setInputError("");
        onSuccessfulSubmit();
      } else if (error) {
        setInputError(
          `Unable to update password. ${
            message || "An unexpected error occurred"
          }`
        );
      }
    }
  };

  return (
    <form
      id="change-password-form"
      className="settings-change-form"
      onSubmit={handleSubmit}
    >
      <div className="row">
        <label htmlFor="new-password">New Password: </label>
        <input id="new-password" name="new-password" type="password" />
      </div>
      <div className="row">
        <label htmlFor="confirm-new-password">Confirm Password: </label>
        <input
          id="confirm-new-password"
          name="confirm-new-password"
          type="password"
        />
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

ChangePasswordForm.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSuccessfulSubmit: PropTypes.func.isRequired,
};
