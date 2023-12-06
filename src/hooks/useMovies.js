import { useEffect, useState } from 'react';
import { API_KEY } from '../data/API_KEY';

export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState('');

  useEffect(
    function () {
      //   callback?.();
      const controller = new AbortController();

      async function fetchMoviesData() {
        try {
          setIsLoading(true);
          setIsError('');
          const res = await fetch(
            `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`,
            { signal: controller.signal }
          );
          if (!res.ok) throw new Error('Connection Lost');

          const data = await res.json();

          if (data.Response === 'False') throw new Error(data.Error);

          setMovies(data.Search);
          setIsError('');
        } catch (err) {
          if (err.name !== 'AbortError') {
            setIsError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }
      if (query.length < 3) {
        setMovies([]);
        setIsError('');
        return;
      }
      fetchMoviesData();

      return () => {
        controller.abort();
      };
    },
    [query]
  );
  return { movies, isLoading, isError };
}
