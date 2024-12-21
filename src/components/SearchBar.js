import React from 'react';

const SearchBar = ({ onSearch }) => {
  return (
    <input
      type="text"
      placeholder="Search Todos..."
      className="w-full p-2 border rounded mb-4"
      onChange={(e) => onSearch(e.target.value)}
    />
  );
};

export default SearchBar;
