import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./Forms.css";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Send login data to the backend
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/users/login`,
        { email, password },
      );

      // Store the JWT token in local storage upon successful login
      localStorage.setItem("token", response.data.token);
      navigate("/form");
    } catch (error) {
      console.error("Login failed:", error.response.data.error);
    }
  };

  return (
    <div className="user-account-container-2">
      {" "}
      {/* Add the unique class */}
      <div className="user-form">
        <h2 className="user-title">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>
          <button type="submit" className="user-action">
            Login
          </button>
          <p className="user-step">
            Need an account?{" "}
            <Link to="/register" className="user-link">
              SIGN UP
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
