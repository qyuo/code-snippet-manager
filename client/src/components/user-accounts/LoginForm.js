import React, { useState } from "react";
import axios from "axios";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Send login data to the backend
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        { email, password },
      );

      // Store the JWT token in local storage upon successful login
      localStorage.setItem("token", response.data.token);

      // Redirect to a protected route (e.g., dashboard)
      // You can use React Router for navigation
      // Example: history.push("/dashboard");
    } catch (error) {
      console.error("Login failed:", error.response.data.error);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
