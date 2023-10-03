import { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import Alert from "@mui/material/Alert";
import User from "../../../utils/UserController";
import useUser from "../../../hooks/useUser";
import "../Signup/Form.css";
import "./Form.css";

export default function LoginForm({ onLogin }) {
  const [formSubmitError, setFormSubmitError] = useState("");
  const [loading, setLoading] = useState(false);
  const { setUser } = useUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleFormSubmit = async (values) => {
    const { username, password } = values;
    setLoading(true);
    const { data, error, message } = await User.login({ username, password });
    setLoading(false);
    if (error) {
      setFormSubmitError(message || "An unexpected error occurred");
    } else {
      setUser({ ...data });
      onLogin(data);
    }
  };

  return (
    <form
      id="login-form"
      className="account-form"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <h2>Log in</h2>
      <p className="login-msg">
        Don&apos;t have an account yet? <Link to="/signup">Sign Up</Link>
      </p>
      <label htmlFor="username">Username</label>
      <TextField
        size="small"
        id="username"
        error={Boolean(errors?.username?.message)}
        helperText={errors?.username?.message}
        fullWidth
        {...register("username", {
          required: "Required field",
        })}
      />
      <label htmlFor="password">Password</label>
      <TextField
        size="small"
        id="password"
        error={Boolean(errors?.password?.message)}
        helperText={errors?.password?.message}
        fullWidth
        type="password"
        {...register("password", {
          required: "Required field",
        })}
      />
      <button
        type="submit"
        disabled={Boolean(loading)}
        className="btn-default bg-eerie-black"
      >
        Log in
      </button>
      {formSubmitError && (
        <Alert className="account-form-submit-error" severity="error">
          {formSubmitError}
        </Alert>
      )}
    </form>
  );
}

LoginForm.propTypes = {
  onLogin: PropTypes.func,
};

LoginForm.defaultProps = {
  onLogin: () => null,
};
