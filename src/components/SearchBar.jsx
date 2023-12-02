import { useEffect, useRef } from 'react';

function SearchBar({ query, setQuery }) {
  const inputEl = useRef(null);

  useEffect(
    function () {
      function callBackFn(e) {
        if (document.activeElement === inputEl.current) {
          return;
        }

        if (e.code === 'Enter') {
          inputEl.current.focus();
          setQuery('');
        }
      }
      document.addEventListener('keydown', callBackFn);
      return () => {
        document.removeEventListener('keydown', callBackFn);
      };
    },
    [setQuery]
  );

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
}

export default SearchBar;
