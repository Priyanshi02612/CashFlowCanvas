import React from "react";

const SearchBar = ({ onSearch }) => {
  const handleSearchChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <div className="input-group mb-3 search" >
    <i id="search" class="bi bi-search"></i>
      <input
        type="text"
        className="form-control s1"
        placeholder="Search here..."
        onChange={handleSearchChange}
      />
    </div>

  );
};

export default SearchBar;
