import React, { useState } from "react";
import axios from "axios";
import "./SearchBar.css";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    const token = localStorage.getItem("token");
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/api/code-snippets/search?q=${searchTerm}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((response) => {
        onSearch(response.data);
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
