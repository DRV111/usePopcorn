import { useEffect, useState } from 'react';
import MainLayout from './components/MainLayout';
import NavBar from './components/NavBar';
import SearchBar from './components/SearchBar';
import Logo from './components/Logo';
import NumResults from './components/NumResults';
import Box from './components/Box';
import MovieList from './components/MovieList';
import Summary from './components/Summary';
import WatchedMovieList from './components/WatchedMovieList';
import Loader from './components/Loader';
import ErrorMsg from './components/ErrorMsg';
// import tempWatchedData from './data/watchedMovies';
// import tempMovieData from './data/moviesList';

const API_KEY = '106c87f9';

function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState('');

  useEffect(
    function () {
      async function fetchMoviesData() {
        try {
          setIsLoading(true);
          setIsError('');
          const res = await fetch(
            `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`
          );
          if (!res.ok) throw new Error('Connection Lost');
          const data = await res.json();
          if (data.Response === 'False') throw new Error(data.Error);
          setMovies(data.Search);
        } catch (err) {
          setIsError(err.message);
        } finally {
          setIsLoading(false);
        }
      }
      if (!query.length < 2) {
        setMovies([]);
        setIsError('');
        return;
      }
      fetchMoviesData();
    },
    [query, setQuery]
  );

  return (
    <>
      <NavBar>
        <Logo />
        <SearchBar query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>
      <MainLayout>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !isError && <MovieList movies={movies} />}
          {isError && <ErrorMsg message={isError} />}
        </Box>
        <Box>
          <Summary watched={watched} />
          <WatchedMovieList watched={watched} />
        </Box>
      </MainLayout>
    </>
  );
}

export default App;
