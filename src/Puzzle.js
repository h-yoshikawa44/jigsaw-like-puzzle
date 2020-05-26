import React from 'react';
import PuzzleTemplate from './templates/PuzzleTemplate';

const Puzzle = () => {
  const imageUrl = `${process.env.PUBLIC_URL}/photo0000_6339.png`;

  return <PuzzleTemplate imageUrl={imageUrl} />;
};

export default Puzzle;
