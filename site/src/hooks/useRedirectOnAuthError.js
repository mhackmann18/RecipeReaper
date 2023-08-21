import { useNavigate } from "react-router-dom";

export default function useRedirectOnAuthError() {
  const navigate = useNavigate();

  const redirectOnAuthError = (error) => {
    if (error === "invalid-token" || error === "no-token") {
      navigate("/login", {
        state: {
          errorMessage: "Your token has expired. Please re-login",
        },
      });
    }
  };

  return redirectOnAuthError;
}
