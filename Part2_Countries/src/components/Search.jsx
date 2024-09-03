import React from 'react';

const Search = ({ search, handleSearch }) => {
  return (
    <div>
      <h2>Find Countries</h2>
      <input
        type='text'
        value={search}
        onChange={handleSearch}
        placeholder='Search for a country'
      />
    </div>
  );
};

export default Search;
