import React, { useEffect, useState } from "react";
import axios from "axios";
import CodeSnippetItem from "./CodeSnippetItem";
import "./CodeSnippetList.css";

const CodeSnippetList = () => {
  const [snippets, setSnippets] = useState([]);

  useEffect(() => {
    // Fetch code snippets from the backend API
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/code-snippets`)
      .then((response) => {
        setSnippets(response.data);
      })
      .catch((error) => {
        console.error("Error fetching code snippets:", error);
      });
  }, []);

  const handleDelete = (deletedSnippetId) => {
    // Remove the deleted snippet from the snippets state
    setSnippets((prevSnippets) =>
      prevSnippets.filter((snippet) => snippet._id !== deletedSnippetId),
    );
  };

  return (
    <div className="snippet-list-container">
      <h1>Code Snippet History</h1>
      <ul className="snippet-list">
        {snippets.map((snippet) => (
          <li key={snippet._id}>
            <CodeSnippetItem snippet={snippet} onDelete={handleDelete} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CodeSnippetList;
