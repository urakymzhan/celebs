import React from 'react';

export default function Search({ handleSearchChange, handleSearchClick }) {
  return (
    <div className="search-container">
      <input
        type="input"
        placeholder="Search by artist name"
        id="search"
        onChange={handleSearchChange}
      />
      <input
        type="button"
        value="Search"
        id="searchBtn"
        onClick={handleSearchClick}
      />
    </div>
  );
}
