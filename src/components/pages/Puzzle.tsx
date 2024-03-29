import { FC } from 'react';
import Divider from '@mui/material/Divider';
import Konva from 'konva';
import PuzzleGuide from 'components/organisms/PuzzleGuide';
import SelectDifficultyModal from 'components/organisms/SelectDifficultyModal';
import CompleteModal from 'components/organisms/CompleteModal';
import PauseModal from 'components/organisms/PauseModal';
import PuzzleCanvas from 'components/organisms/PuzzleCanvas';
import { Diffculty } from 'models/Diffculty';
import { Piece } from 'models/Piece';
import { Time } from 'models/Time';

type Props = {
  image?: HTMLImageElement;
  loadingStatus: 'loaded' | 'loading' | 'failed';
  pieceData: Piece[];
  matchPieceCount: number;
  pieceTotalCount: number;
  time: Time;
  difficultyModalOpen: boolean;
  pauseModalOpen: boolean;
  completeModalOpen: boolean;
  onSelectDifficulty: (diffculty: Diffculty) => void;
  onPause: VoidFunction;
  onPauseRelese: VoidFunction;
  onRestart: VoidFunction;
  onPieceDragStart: (e: Konva.KonvaEventObject<DragEvent>) => void;
  onPieceDragEnd: (e: Konva.KonvaEventObject<DragEvent>) => void;
};

const Puzzle: FC<Props> = ({
  image,
  loadingStatus,
  pieceData,
  matchPieceCount,
  pieceTotalCount,
  time,
  difficultyModalOpen,
  pauseModalOpen,
  completeModalOpen,
  onSelectDifficulty,
  onPause,
  onPauseRelese,
  onRestart,
  onPieceDragStart,
  onPieceDragEnd,
}) => (
  <div>
    <PuzzleGuide
      matchPieceCount={matchPieceCount}
      pieceTotalCount={pieceTotalCount}
      hour={time.hour}
      minutes={time.minutes}
      seconds={time.seconds}
      onPause={onPause}
    />
    <Divider />
    {loadingStatus === 'loaded' && (
      <PuzzleCanvas
        image={image}
        pieceData={pieceData}
        onPieceDragStart={onPieceDragStart}
        onPieceDragEnd={onPieceDragEnd}
      />
    )}
    <SelectDifficultyModal
      open={difficultyModalOpen}
      loading={loadingStatus === 'loading'}
      onSelectDifficulty={onSelectDifficulty}
    />
    <PauseModal open={pauseModalOpen} onPauseRelese={onPauseRelese} />
    <CompleteModal
      open={completeModalOpen}
      hour={time.hour}
      minutes={time.minutes}
      seconds={time.seconds}
      onRestart={onRestart}
    />
  </div>
);

export default Puzzle;
