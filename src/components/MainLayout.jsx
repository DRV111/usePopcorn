import { useState } from 'react';
import ListBox from './ListBox';
import WatchedBox from './WatchedBox';

function MainLayout() {
  return (
    <main className="main">
      <ListBox />
      <WatchedBox />
    </main>
  );
}

export default MainLayout;
