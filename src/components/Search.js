// src/components/SearchBar.js
import React, { useState } from 'react';

function SearchBar({ onSearchChange, onSortChange, onFilterChange }) {
  let [search, setSearch] = useState('');
  let [sort, setSort] = useState('');
  let [filter, setFilter] = useState('');

  let handleSearch = (e) => {
    let value = e.target.value;
    setSearch(value);
    onSearchChange(value);
  };

  let handleSort = (e) => {
    let value = e.target.value;
    setSort(value);
    onSortChange(value);
  };

  let handleFilter = (e) => {
    let value = e.target.value;
    setFilter(value);
    onFilterChange(value);
  };

  return (
    <div className="row mb-4">
      <div className="col-md-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search books..."
          value={search}
          onChange={handleSearch}
        />
      </div>
      <div className="col-md-4">
        <select className="form-select" value={sort} onChange={handleSort}>
          <option value="">Sort By</option>
          <option value="priceLowHigh">Price: Low to High</option>
          <option value="priceHighLow">Price: High to Low</option>
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>
      <div className="col-md-4">
        <select className="form-select" value={filter} onChange={handleFilter}>
          <option value="">Filter By</option>
          <option value="science">Science</option>
          <option value="fiction">Fiction</option>
          <option value="history">History</option>
          <option value="biography">Biography</option>
        </select>
      </div>
    </div>
  );
}

export default SearchBar;
