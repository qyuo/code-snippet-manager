import React from "react";
import "./App.css";
import CodeSnippetForm from "./components/CodeSnippetForm";
import CodeSnippetList from "./components/CodeSnippetList";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Search from "./components/Search";

function App() {
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
}

export default App;
