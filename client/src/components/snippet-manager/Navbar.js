import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // Import the CSS file for this component

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Snippet Manager
        </Link>
        <div className="navbar-links">
          <Link to="/" className="navbar-link">
            Home
          </Link>
          <Link to="/search" className="navbar-link">
            Search
          </Link>
          <Link to="/history" className="navbar-link">
            History
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
