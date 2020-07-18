import React, { useState } from 'react';
import './Search.css';
import { connect } from 'react-redux';
import { getSearchResults } from '../../../actions/productsActions';

export const Search = (props) => {

  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState(null)
  
  const searchChange = e => {
    setSearchTerm(e.target.value);
  }

  const sortByChange = e => {
    setSortBy(e.target.value);
    console.log(sortBy);
  }

  const getResults = e => {
    e.preventDefault();
    props.getSearchResults(searchTerm, sortBy);
  }

  return (
    <div className="search">
      <form onSubmit={getResults}>
        <div className="searchgrid">
          <div>
            <input onChange={searchChange} className="searchbar" type="text" placeholder="Search"/>
          </div>
          <div>
            <select onChange={sortByChange} className="sort" name="sort">
              <option selected disabled>Sort by</option>
              <option value="asc-price">Lowest prices first</option>
              <option value="des-price">Higest prices first</option>
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

const mapStateToProps = state => ({

})

export default connect(mapStateToProps, { getSearchResults })(Search);
