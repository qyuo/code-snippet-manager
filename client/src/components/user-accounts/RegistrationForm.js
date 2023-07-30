import React, { useState } from "react";
import axios from "axios";

const RegistrationForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegistration = async (e) => {
    e.preventDefault();

    try {
      // Send registration data to the backend
      const response = await axios.post(
        "http://localhost:5000/api/users/register",
        {
          username,
          email,
          password,
        },
      );

      console.log("Registration successful:", response.data);
    } catch (error) {
      console.error("Registration failed:", error.response.data.error);
    }
  };

  return (
    <form onSubmit={handleRegistration}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
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
      <button type="submit">Register</button>
    </form>
  );
};

export default RegistrationForm;
