import { useState } from 'react';
import './SearchBar.css';
function SearchBar({onHandleSearch}) {
    let [query, setQuery] = useState('');

    function onQueryChange(e) {
        setQuery(e.currentTarget.value);
    }

    return (
        <div className="search-bar">
            <input type="search" id="search" name="search" value={query} onChange={onQueryChange}/>
            <button id="search-button" onClick={onHandleSearch} data-query={query}>Search</button>
        </div>
    );
}

export default SearchBar;
