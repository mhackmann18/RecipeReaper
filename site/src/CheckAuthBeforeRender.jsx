import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import User from "./utils/UserController";
import useUser from "./hooks/useUser";
import LoadingScreen from "./components/common/LoadingScreen";

export default function CheckAuthBeforeRender({
  renderIfAuthenticated,
  children,
}) {
  const accessToken = Cookies.get("access_token");
  const [isLoading, setIsLoading] = useState(!!accessToken);
  const { setUser, user } = useUser();

  useEffect(() => {
    if (accessToken) {
      User.getFromToken().then(({ data, error }) => {
        if (data) {
          setUser({ ...data });
        } else if (error) {
          setUser(null);
        }
        setIsLoading(false);
      });
    } else {
      setUser(null);
    }
  }, []);

  const isAuthenticated = !!accessToken && !!user;

  const elementOnAuthSuccess = renderIfAuthenticated ? (
    children
  ) : (
    <Navigate to="/dashboard" />
  );

  const elementOnAuthFailure = renderIfAuthenticated ? (
    <Navigate to="/login" />
  ) : (
    children
  );

  const contentToRender = isAuthenticated
    ? elementOnAuthSuccess
    : elementOnAuthFailure;

  return isLoading ? <LoadingScreen /> : contentToRender;
}

CheckAuthBeforeRender.propTypes = {
  children: PropTypes.element.isRequired,
  renderIfAuthenticated: PropTypes.bool.isRequired,
};
