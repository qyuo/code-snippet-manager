import React from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import "./UserAccount.css";
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";

const UserAccount = () => {
  const location = useLocation();
  const isRootPath = location.pathname === "/";

  return (
    <div className="user-account-container">
      {" "}
      {/* Add the unique class */}
      {isRootPath && (
        <div className="user-account">
          <h1 className="title">Snippet Manager</h1>
          <h2 className="subtitle">
            Sync & Simplify: Elevate Your Code with Our Modern Manager!
          </h2>
          <nav className="navigation">
            <ul>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegistrationForm />} />
      </Routes>
    </div>
  );
};

export default UserAccount;
