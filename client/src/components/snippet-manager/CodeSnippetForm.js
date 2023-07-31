import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import axios from "axios";
import "./CodeSnippetForm.css";

const languageOptions = [
  { value: "javascript", label: "JavaScript" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "css", label: "CSS" },
  { value: "c", label: "C" },
  { value: "cpp", label: "C++" },
];

const CodeSnippetForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [language, setLanguage] = useState("");
  const [code, setCode] = useState("");
  const [formError, setFormError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !description || !language || !code) {
      setFormError(true);
      return;
    }

    const newSnippet = {
      title,
      description,
      language,
      code,
    };

    const token = localStorage.getItem("token");

    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/api/code-snippets`,
        newSnippet,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((response) => {
        console.log("Snippet saved successfully:", response.data);
        setTitle("");
        setDescription("");
        setLanguage("");
        setCode("");
        setFormError(false);
      })
      .catch((error) => {
        console.error("Error saving snippet:", error);
      });
  };

  return (
    <div className="code-snippet-form">
      <h1>Create New Code Snippet</h1>
      <div className="form-container">
        <form onSubmit={handleSubmit} className="code-input">
          <div className="form-group">
            <label>Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter the title"
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label>Description:</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter the description"
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label>Language:</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="form-select"
              required
            >
              <option value="">-- Select Language --</option>
              {languageOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Code:</label>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter the code snippet"
              className="form-textarea"
              required
            />
          </div>

          {/* Code Preview */}
          <div className="code-preview">
            <h2>Code Preview:</h2>
            <SyntaxHighlighter language={language}>{code}</SyntaxHighlighter>
          </div>

          {formError && <p className="form-error">Please fill all fields.</p>}

          <button type="submit" className="form-button">
            Save Snippet
          </button>
        </form>
      </div>
    </div>
  );
};

export default CodeSnippetForm;
