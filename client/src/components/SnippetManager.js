import React from "react";
import "./SnippetManager.css";
import CodeSnippetForm from "./snippet-manager/CodeSnippetForm";
import CodeSnippetList from "./snippet-manager/CodeSnippetList";
import Search from "./snippet-manager/Search";
import Navbar from "./snippet-manager/Navbar";
import isAuthenticated from "../utils/isAuthenticated";
import { Navigate, Routes, Route } from "react-router-dom";

const SnippetManager = () => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="App">
      <Navbar />
      <div className="App-content">
        {/* Wrap the content with App-content */}
        <Routes>
          <Route path="/form" element={<CodeSnippetForm />} />
          <Route path="/search" element={<Search />} />
          <Route path="/history" element={<CodeSnippetList />} />
        </Routes>
      </div>
    </div>
  );
};

export default SnippetManager;
