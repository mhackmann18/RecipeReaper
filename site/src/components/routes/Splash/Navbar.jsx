import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import "./Navbar.css";

// Top nav for un-logged-in users
export default function Navbar() {
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const [borderActive, setBorderActive] = useState(false);
  const location = useLocation();

  // Show border when y scroll isn't zero
  const handleScroll = () => {
    const scrollYPosition = window.pageYOffset;
    setBorderActive(Boolean(scrollYPosition !== 0));
  };

  // Ensure that only one scroll event listener is active at any given time
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Collapse the mobile hamburger menu when the route changes
  useEffect(() => setMobileMenuVisible(false), [location]);

  return (
    <nav id="navbar" className={borderActive ? "border" : ""}>
      <Link id="app-logo" to="/">
        <strong>RECIPE</strong>REAPER
      </Link>
      <menu id="navbar-links" className={mobileMenuVisible ? "" : "hidden"}>
        <Link to="" className={location.pathname === "/" ? "active" : ""}>
          Features
        </Link>
        <Link
          to="signup"
          className={location.pathname === "/signup" ? "active" : ""}
        >
          Sign up
        </Link>
        <Link
          to="login"
          className={location.pathname === "/login" ? "active" : ""}
        >
          Log in
        </Link>
      </menu>
      <button
        id="toggle-nav"
        onClick={() => setMobileMenuVisible(!mobileMenuVisible)}
        type="button"
      >
        <FontAwesomeIcon
          icon={faBars}
          className="viewport-small icon"
          size="xl"
        />
      </button>
    </nav>
  );
}
