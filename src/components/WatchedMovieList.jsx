import WatchedMovie from './WatchedMovie';

function WatchedMovieList({ watched }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie movie={watched} key={movie.imdbID} />
      ))}
    </ul>
  );
}

export default WatchedMovieList;
