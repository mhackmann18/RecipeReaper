import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import "./ToggleTheme.css";
import useUser from "../../hooks/useUser";
import User from "../../utils/UserController";
import useRedirectOnAuthError from "../../hooks/useRedirectOnAuthError";

export default function ToggleTheme({ variant }) {
  const { user, setUser } = useUser();
  const redirectOnAuthError = useRedirectOnAuthError();

  const { theme } = user;

  if (theme === "dark") {
    document.querySelector("body").classList.add("dark-mode");
  } else {
    document.querySelector("body").classList.remove("dark-mode");
  }

  const handleClick = () => {
    User.update({ theme: theme === "light" ? "dark" : "light" }, user).then(
      ({ data, message, error }) => {
        redirectOnAuthError(error);

        // Success
        if (data) {
          setUser({ ...user, theme: theme === "light" ? "dark" : "light" });
          return;
        }
        // Error
        console.log(`Unable to change theme. ${message}`);
      }
    );
  };

  return (
    <div>
      <div
        title="toggle theme"
        id="theme-toggle"
        className={variant}
        onClick={handleClick}
      >
        <FontAwesomeIcon icon={faSun} className="icon sun" />
        <div
          className="round-slider"
          style={
            theme === "light"
              ? {
                  left: 42,
                }
              : {
                  left: 2,
                }
          }
        />
        <FontAwesomeIcon icon={faMoon} className="icon moon" />
      </div>
    </div>
  );
}

ToggleTheme.propTypes = {
  variant: PropTypes.string,
};

ToggleTheme.defaultProps = {
  variant: "",
};
