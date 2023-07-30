import React from "react";
import "./SnippetManager.css";
import CodeSnippetForm from "./snippet-manager/CodeSnippetForm";
import CodeSnippetList from "./snippet-manager/CodeSnippetList";
import Search from "./snippet-manager/Search";
import Navbar from "./snippet-manager/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const SnippetManager = () => {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <div className="App-content">
          {" "}
          {/* Wrap the content with App-content */}
          <Routes>
            <Route path="/" element={<CodeSnippetForm />} />
            <Route path="/search" element={<Search />} />
            <Route path="/history" element={<CodeSnippetList />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default SnippetManager;
