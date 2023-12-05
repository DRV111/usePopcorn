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
import MovieDetails from './components/MovieDetails';
import { useMovies } from './hooks/useMovies';
// import tempWatchedData from './data/watchedMovies';
// import tempMovieData from './data/moviesList';

function App() {
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  // const [watched, setWatched] = useState([]);

  const { movies, isLoading, isError } = useMovies(query);

  const [watched, setWatched] = useState(function () {
    const storedValue = localStorage.getItem('watched');
    return JSON.parse(storedValue);
  });

  function handleSelecteMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }
  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatchedMovie(movie) {
    setWatched((watched) => [...watched, movie]);

    // localStorage.setItem('watched', JSON.stringify([...watched, movie]));
  }

  function handleRemoveWatchedMovie(movie) {
    setWatched((watched) => watched.filter((m) => m.imdbID !== movie.imdbID));
  }

  useEffect(
    function () {
      localStorage.setItem('watched', JSON.stringify(watched));
    },
    [watched]
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
          {!isLoading && !isError && (
            <MovieList movies={movies} onSelectMovie={handleSelecteMovie} />
          )}
          {isError && <ErrorMsg message={isError} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatchedMovie={handleAddWatchedMovie}
              watched={watched}
            />
          ) : (
            <>
              <Summary watched={watched} />
              <WatchedMovieList
                watched={watched}
                onRemoveWatchedMovie={handleRemoveWatchedMovie}
              />
            </>
          )}
        </Box>
      </MainLayout>
    </>
  );
}

export default App;
