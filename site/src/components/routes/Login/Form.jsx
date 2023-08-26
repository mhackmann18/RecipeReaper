import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import User from "../../../utils/UserController";
import useUser from "../../../hooks/useUser";
import "../Signup/Form.css";

export default function LoginForm() {
  const [formSubmitError, setFormSubmitError] = useState("");
  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    if (!username || !password) {
      return setFormSubmitError("Please fill in all fields");
    }

    const { data, error, message } = await User.login({ username, password });

    if (error) {
      setFormSubmitError(message || "An unexpected error occurred");
    } else {
      setUser({ ...data });
      navigate(`/dashboard`);
    }
  };

  return (
    <form id="login-form" className="account-form" onSubmit={handleSubmit}>
      <h2>Log in</h2>
      <p id="login-msg">
        Don&apos;t have an account yet? <Link to="/signup">Sign Up</Link>
      </p>
      <label htmlFor="username">Username</label>
      <input name="username" id="username" type="text" />
      <label htmlFor="password">Password</label>
      <input name="password" id="password" type="password" />
      <button type="submit" className="btn-default bg-eerie-black">
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
