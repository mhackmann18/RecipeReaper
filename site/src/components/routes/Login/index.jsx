import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LoginForm from "./Form";
import Toast from "../../common/Toast";
import useToast from "../../../hooks/useToast";
import "../Signup/index.css";

export default function Login() {
  const { toast, closeToast, addErrorToastMessage, addSuccessToastMessage } =
    useToast();
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (state?.errorMessage) {
      addErrorToastMessage(state.errorMessage);
    } else if (state?.successMessage) {
      addSuccessToastMessage(state.successMessage);
    }
  }, []);

  return (
    <div id="login-page" className="account-page">
      <LoginForm onSubmitSuccess={() => navigate("/dashboard")} />
      <Toast state={toast} onClose={closeToast} />
    </div>
  );
}
