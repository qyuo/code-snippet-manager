import React, { useState } from "react";
import CodeSnippetItem from "./CodeSnippetItem";
import SearchBar from "./SearchBar";
import "./Search.css";

const Search = () => {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (data) => {
    setSearchResults(data);
  };

  const handleDelete = (deletedSnippetId) => {
    setSearchResults((prevResults) =>
      prevResults.filter((snippet) => snippet._id !== deletedSnippetId),
    );
  };

  return (
    <div className="search-container">
      <div className="search-content">
        <h1>Search for Code Snippets</h1>
        <div className="search-bar-container">
          <SearchBar onSearch={handleSearch} />
        </div>
        {searchResults.length > 0 ? (
          searchResults.map((snippet) => (
            <div key={snippet._id}>
              <CodeSnippetItem snippet={snippet} onDelete={handleDelete} />
            </div>
          ))
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
};

export default Search;
