import { useState } from 'react';
import SearchBar from './SearchBar';

function NavBar() {
  const [query, setQuery] = useState('');
  return (
    <nav className="nav-bar">
      <div className="logo">
        <span role="img">🍿</span>
        <h1>usePopcorn</h1>
      </div>
      <SearchBar query={query} setQuery={setQuery} />
      <p className="num-results">
        Found <strong>X</strong> results
      </p>
    </nav>
  );
}

export default NavBar;
