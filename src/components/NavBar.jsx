import { useState } from 'react';
import SearchBar from './SearchBar';
import Logo from './Logo';

function NavBar() {
  const [query, setQuery] = useState('');
  return (
    <nav className="nav-bar">
      <Logo />
      <SearchBar query={query} setQuery={setQuery} />
      <p className="num-results">
        Found <strong>X</strong> results
      </p>
    </nav>
  );
}

export default NavBar;
