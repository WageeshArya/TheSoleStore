import React from 'react';
import './Search.css';
export const Search = () => {
  return (
    <div className="search">
      <form>
        <div className="searchgrid">
          <div>
            <input className="searchbar" type="text" placeholder="Search"/>
          </div>
          <div>
            <select className="sort" name="sort">
              <option disabled>Sort by</option>
              <option value="asc-price">Lowest prices first</option>
              <option value="des-price">Higest prices first</option>
            </select>
          </div>
          <div>
            <select className="company" name="company">
              <option disabled>Brand</option>
            </select>
          </div>
          <div>
            <input className="findBtn" type="submit"/>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Search;
