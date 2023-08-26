import { Link, useNavigate } from "react-router-dom";
import SignupForm from "./Form";
import "./index.css";

export default function Signup() {
  const navigate = useNavigate();
  return (
    <div id="signup-page" className="account-page">
      <SignupForm
        headerElement={
          <p id="signup-msg">
            All you need for managing your recipes.
            <br />
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        }
        onSubmitSuccess={() => navigate("/dashboard")}
        formId="signup-page-signup-form"
      />
    </div>
  );
}
