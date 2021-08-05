import { VFC, useState, useEffect } from 'react';
import { Divider } from '@material-ui/core';
import useImage from 'use-image';
import PuzzleGuide from 'components/organisms/PuzzleGuide';
import SelectDifficultyModal from 'components/organisms/SelectDifficultyModal';
import CompleteModal from 'components/organisms/CompleteModal';
import PauseModal from 'components/organisms/PauseModal';
import PuzzleCanvas from 'components/organisms/PuzzleCanvas';
import { Diffculty } from 'models/Diffculty';
import useCounter from 'hooks/useCounter';
import usePuzzle from 'hooks/usePuzzle';

type Props = {
  imageUrl: string;
};

const PuzzleTemplate: VFC<Props> = ({ imageUrl }) => {
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

  const handlePauseAction = () => {
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

  const handleSelectDifficultyAction = (diffculty: Diffculty) => {
    selectDifficulty(diffculty);
    setDifficultyModalOpen(false);
    countStart();
  };
  const handlePauseReleseAction = () => {
    setPauseModalOpen(false);
    countStart();
  };
  const handleRestartAction = () => {
    setCompleteModalOpen(false);
    countReset();
    pieceCountReset();
    setDifficultyModalOpen(true);
  };

  const [image, status] = useImage(imageUrl);

  return (
    <div>
      <PuzzleGuide
        matchPieceCount={matchPieceCount}
        pieceTotalCount={pieceTotalCount}
        hour={time.hour}
        minutes={time.minutes}
        seconds={time.seconds}
        handlePauseAction={handlePauseAction}
      />
      <Divider />
      {status === 'loaded' && (
        <PuzzleCanvas
          image={image}
          shuffledPieceInfo={pieceData}
          handleDragStart={handlePieceDragStart}
          handleDragEnd={handlePieceDragEnd}
        />
      )}
      <SelectDifficultyModal
        open={difficultyModalOpen}
        loading={status === 'loading'}
        handleSelectDifficultyAction={handleSelectDifficultyAction}
      />
      <PauseModal
        open={pauseModalOpen}
        handlePauseReleseAction={handlePauseReleseAction}
      />
      <CompleteModal
        open={completeModalOpen}
        hour={time.hour}
        minutes={time.minutes}
        seconds={time.seconds}
        handleRestartAction={handleRestartAction}
      />
    </div>
  );
};

export default PuzzleTemplate;
