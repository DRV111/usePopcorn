import { useState } from 'react';
import MainLayout from './components/MainLayout';
import NavBar from './components/NavBar';
import SearchBar from './components/SearchBar';
import Logo from './components/Logo';
import NumResults from './components/NumResults';
import ListBox from './components/ListBox';
import WatchedBox from './components/WatchedBox';
import MovieList from './components/MovieList';
import tempMovieData from './data/moviesList';

function App() {
  const [movies, setMovies] = useState(tempMovieData);
  const [query, setQuery] = useState('');
  return (
    <>
      <NavBar>
        <Logo />
        <SearchBar query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>
      <MainLayout>
        <ListBox>
          <MovieList movies={movies} />
        </ListBox>
        <WatchedBox />
      </MainLayout>
    </>
  );
}

export default App;
