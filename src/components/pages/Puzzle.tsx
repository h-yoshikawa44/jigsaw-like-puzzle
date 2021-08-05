import { VFC } from 'react';
import Divider from '@material-ui/core/Divider';
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

const Puzzle: VFC<Props> = ({
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
      handlePauseAction={onPause}
    />
    <Divider />
    {loadingStatus === 'loaded' && (
      <PuzzleCanvas
        image={image}
        shuffledPieceInfo={pieceData}
        handleDragStart={onPieceDragStart}
        handleDragEnd={onPieceDragEnd}
      />
    )}
    <SelectDifficultyModal
      open={difficultyModalOpen}
      loading={loadingStatus === 'loading'}
      handleSelectDifficultyAction={onSelectDifficulty}
    />
    <PauseModal open={pauseModalOpen} handlePauseReleseAction={onPauseRelese} />
    <CompleteModal
      open={completeModalOpen}
      hour={time.hour}
      minutes={time.minutes}
      seconds={time.seconds}
      handleRestartAction={onRestart}
    />
  </div>
);

export default Puzzle;
