import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const loggedIn = Boolean(localStorage.getItem("token"));

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  }

  return (
    <nav className="navbar">
      <h2>TechFest 2026</h2>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/events">Events</Link>
        {!loggedIn && <Link to="/register">Sign Up</Link>}
        {!loggedIn && <Link to="/login">Login</Link>}
        {loggedIn && <Link to="/my-registrations">My Registrations</Link>}
        <Link to="/gallery">Gallery</Link>
        <Link to="/contact">Contact</Link>
      </div>

      {loggedIn && <button onClick={logout}>Logout</button>}
      <button onClick={toggleTheme}>
        {theme === "light" ? "Switch to Dark" : "Switch to Light"}
      </button>
    </nav>
  );
}

export default Navbar;
