import React from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import "./App.css";
import SnippetManager from "./components/SnippetManager";
import UserAccount from "./components/user-accounts/UserAccount";
import isAuthenticated from "./utils/isAuthenticated";
import LoginForm from "./components/user-accounts/LoginForm";
import RegistrationForm from "./components/user-accounts/RegistrationForm";

const App = () => {
  return (
    <div className="App">
      <div className="App-content">
        {/* Wrap the content with App-content */}
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegistrationForm />} />

          {/* Protected route - accessible only if authenticated */}
          <Route
            path="/*"
            element={
              isAuthenticated() ? <SnippetManager /> : <Navigate to="/login" />
            }
          />

          {/* Default route - Redirect to dashboard (SnippetManager) after login */}
          <Route
            path="/"
            element={
              isAuthenticated() ? <Navigate to="/form" /> : <UserAccount />
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
