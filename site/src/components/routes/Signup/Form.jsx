import { useState } from "react";
import Alert from "@mui/material/Alert";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { TextField } from "@mui/material";
import User from "../../../utils/UserController";
import {
  checkUsernameInput,
  checkPasswordInput,
} from "../../../utils/validation";
import useUser from "../../../hooks/useUser";
import "./Form.css";

export default function SignupForm({
  headerText,
  headerElement,
  onSubmitSuccess,
  formId,
}) {
  const [formSubmitError, setFormSubmitError] = useState("");
  const [loading, setLoading] = useState(false);
  const { setUser } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  async function handleFormSubmit(values) {
    setLoading(true);
    setFormSubmitError("");

    const { username, password } = values;

    const { data, message, error } = await User.create({
      username,
      password,
    });

    setLoading(false);
    if (data) {
      setUser({ ...data });
      onSubmitSuccess();
    } else if (error) {
      setFormSubmitError(message || "An unexpected error occurred");
    }
  }

  return (
    <form
      id={formId}
      className="account-form signup-form"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <h2>{headerText}</h2>
      {headerElement}
      <label htmlFor={`${formId}-username`}>Username</label>
      <TextField
        size="small"
        id={`${formId}-username`}
        error={Boolean(errors?.username?.message)}
        helperText={errors?.username?.message}
        fullWidth
        {...register("username", {
          validate: checkUsernameInput,
        })}
      />
      <label htmlFor={`${formId}-password`}>Password</label>
      <TextField
        size="small"
        id={`${formId}-password`}
        error={Boolean(errors?.password?.message)}
        helperText={errors?.password?.message}
        fullWidth
        type="password"
        {...register("password", {
          validate: checkPasswordInput,
        })}
      />
      <label htmlFor={`${formId}-confirm-password`}>Confirm Password</label>
      <TextField
        size="small"
        id={`${formId}-confirm-password`}
        error={Boolean(errors?.confirmPassword?.message)}
        helperText={errors?.confirmPassword?.message}
        type="password"
        fullWidth
        {...register("confirmPassword", {
          validate: (confirmPassword) =>
            watch("password") === confirmPassword || "Passwords don't match",
        })}
      />
      <button
        type="submit"
        className="btn-default bg-eerie-black"
        disabled={Boolean(loading)}
      >
        Sign up
      </button>
      {formSubmitError && (
        <Alert className="account-form-submit-error" severity="error">
          {formSubmitError}
        </Alert>
      )}
    </form>
  );
}

SignupForm.propTypes = {
  headerText: PropTypes.string,
  headerElement: PropTypes.element,
  onSubmitSuccess: PropTypes.func,
  formId: PropTypes.string.isRequired,
};

SignupForm.defaultProps = {
  headerText: "Sign up",
  headerElement: null,
  onSubmitSuccess: () => null,
};
