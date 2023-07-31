import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import axios from "axios";
import "./CodeSnippetItem.css";

const options = {
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  timeZoneName: "short",
};

const DeleteIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    viewBox="0 0 16 16"
  >
    {" "}
    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />{" "}
    <path
      fillRule="evenodd"
      d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
    />{" "}
  </svg>
);

const CodeSnippetItem = ({ snippet, onDelete }) => {
  const dateObj = new Date(snippet.date);
  const formattedDate = dateObj.toLocaleString(undefined, options);

  const handleDelete = () => {
    const token = localStorage.getItem("token");
    axios
      .delete(
        `${process.env.REACT_APP_BACKEND_URL}/api/code-snippets/${snippet._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(() => {
        onDelete(snippet._id);
      })
      .catch((error) => {
        console.error("Error deleting snippet:", error);
      });
  };

  return (
    <div className="snippet-item">
      <h2 className="snippet-title">
        {snippet.title}
        <button className="delete-button" onClick={handleDelete}>
          <DeleteIcon />
        </button>
      </h2>
      <p className="snippet-description">{snippet.description}</p>
      <SyntaxHighlighter
        language={snippet.language}
        style={vscDarkPlus}
        customStyle={{ margin: "0", borderRadius: "4px" }}
      >
        {snippet.code}
      </SyntaxHighlighter>
      <small className="snippet-footer">{formattedDate}</small>
    </div>
  );
};

export default CodeSnippetItem;
