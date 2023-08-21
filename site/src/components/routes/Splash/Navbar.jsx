import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import "./Navbar.css";

export default function Navbar() {
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const location = useLocation();

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Collapse the menu when the route changes
  useEffect(() => setMobileMenuVisible(false), [location]);

  return (
    <header id="navbar" className={scrollPosition === 0 ? "" : "border"}>
      <Link id="navbar-logo" to="">
        RECIPE<span>REAPER</span>
      </Link>
      <ul className={mobileMenuVisible ? "" : "hide"}>
        <li>
          <Link to="" className={location.pathname === "/" ? "active" : ""}>
            Home
          </Link>
        </li>
        <li>
          <Link
            to="signup"
            className={location.pathname === "/signup" ? "active" : ""}
          >
            Sign up
          </Link>
        </li>
        <li>
          <Link
            to="login"
            className={location.pathname === "/login" ? "active" : ""}
          >
            Log in
          </Link>
        </li>
      </ul>
      <FontAwesomeIcon
        id="navbar-menu-icon"
        icon={faBars}
        className="viewport-small"
        size="xl"
        onClick={() => setMobileMenuVisible(!mobileMenuVisible)}
      />
    </header>
  );
}
