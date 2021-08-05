import { VFC, useState, useEffect } from 'react';
import useImage from 'use-image';
import Puzzle from 'components/pages/Puzzle';
import { Diffculty } from 'models/Diffculty';
import useCounter from 'hooks/useCounter';
import usePuzzle from 'hooks/usePuzzle';

const EnhancedPuzzle: VFC = () => {
  const imageUrl = `${process.env.PUBLIC_URL}/photo0000_6339.png`;
  const [image, status] = useImage(imageUrl);

  const { time, countStart, countStop, countReset } = useCounter();
  const {
    pieceData,
    pieceTotalCount,
    matchPieceCount,
    selectDifficulty,
    handlePieceDragStart,
    handlePieceDragEnd,
    pieceCountReset,
  } = usePuzzle();

  const [difficultyModalOpen, setDifficultyModalOpen] = useState(true);
  const [pauseModalOpen, setPauseModalOpen] = useState(false);
  const [completeModalOpen, setCompleteModalOpen] = useState(false);

  const handlePause = () => {
    countStop();
    setPauseModalOpen(true);
  };

  useEffect(() => {
    const complete = () => {
      setCompleteModalOpen(true);
    };
    if (matchPieceCount && matchPieceCount === pieceTotalCount) {
      countStop();
      setTimeout(complete, 1500);
    }
  }, [pieceTotalCount, matchPieceCount, countStop]);

  const handleSelectDifficulty = (diffculty: Diffculty) => {
    selectDifficulty(diffculty);
    setDifficultyModalOpen(false);
    countStart();
  };
  const handlePauseRelese = () => {
    setPauseModalOpen(false);
    countStart();
  };
  const handleRestart = () => {
    setCompleteModalOpen(false);
    countReset();
    pieceCountReset();
    setDifficultyModalOpen(true);
  };

  return (
    <Puzzle
      image={image}
      loadingStatus={status}
      pieceData={pieceData}
      matchPieceCount={matchPieceCount}
      pieceTotalCount={pieceTotalCount}
      time={time}
      difficultyModalOpen={difficultyModalOpen}
      pauseModalOpen={pauseModalOpen}
      completeModalOpen={completeModalOpen}
      onSelectDifficulty={handleSelectDifficulty}
      onPause={handlePause}
      onPauseRelese={handlePauseRelese}
      onRestart={handleRestart}
      onPieceDragStart={handlePieceDragStart}
      onPieceDragEnd={handlePieceDragEnd}
    />
  );
};

export default EnhancedPuzzle;
