import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import LoginForm from "./Form";
import Toast from "../../common/Toast";
import useToast from "../../../hooks/useToast";
import "../Signup/index.css";

export default function Login() {
  const { toast, closeToast, addErrorToastMessage, addSuccessToastMessage } =
    useToast();
  const { state } = useLocation();

  useEffect(() => {
    if (state?.errorMessage) {
      addErrorToastMessage(state.errorMessage);
    } else if (state?.successMessage) {
      addSuccessToastMessage(state.successMessage);
    }
  }, []);

  return (
    <div id="login-page" className="account-page">
      <LoginForm />
      <Toast state={toast} onClose={closeToast} />
    </div>
  );
}
