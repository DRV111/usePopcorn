// import { useState } from 'react';
import ListBox from './ListBox';
import WatchedBox from './WatchedBox';

function MainLayout({ movies }) {
  return (
    <main className="main">
      <ListBox movies={movies} />
      <WatchedBox />
    </main>
  );
}

export default MainLayout;
