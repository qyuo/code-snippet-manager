import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./Forms.css";

const RegistrationForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegistration = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/users/register`,
        {
          email,
          password,
        },
      );

      console.log("Registration successful:", response.data);
      navigate("/form");
    } catch (error) {
      console.error("Registration failed:", error.response.data.error);
    }
  };

  return (
    <div className="user-account-container-2">
      {" "}
      {/* Add the unique class */}
      <div className="user-form">
        <h2 className="user-title">Register</h2>
        <form onSubmit={handleRegistration}>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </div>
          <button type="submit" className="user-action">
            Register
          </button>
          <p className="user-step">
            Already a user?{" "}
            <Link to="/login" className="user-link">
              LOGIN
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
