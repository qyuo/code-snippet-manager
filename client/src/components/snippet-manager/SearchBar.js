import React, { useState } from "react";
import axios from "axios";
import "./SearchBar.css"; // Import the CSS file for this component

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    // Fetch code snippets from the backend API based on the search term
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/api/code-snippets/search?q=${searchTerm}`,
      )
      .then((response) => {
        onSearch(response.data); // Send the search results to the parent component
      })
      .catch((error) => {
        console.error("Error searching for code snippets:", error);
      });
  };

  return (
    <div className="search-bar-container">
      <input
        type="text"
        placeholder="Search by title, description, or language"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <button onClick={handleSearch} className="search-button">
        Search
      </button>
    </div>
  );
};

export default SearchBar;
