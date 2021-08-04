import { VFC } from 'react';
import { Box } from '@material-ui/core';
import PieceCounter from '../molecules/PieceCounter';
import TimeCounter from '../molecules/TimeCounter';
import PrimaryButton from '../atoms/PrimaryButton';

type Props = {
  matchPieceCount: number;
  pieceTotalCount: number;
  hour: string;
  minutes: string;
  seconds: string;
  handlePauseAction: VoidFunction;
};

const PuzzleGuide: VFC<Props> = ({
  matchPieceCount,
  pieceTotalCount,
  hour,
  minutes,
  seconds,
  handlePauseAction,
}) => (
  <Box display="flex" justifyContent="center" alignItems="center">
    <PieceCounter
      matchPieceCount={matchPieceCount}
      pieceTotalCount={pieceTotalCount}
    />
    <TimeCounter hour={hour} minutes={minutes} seconds={seconds} />
    <Box m={2}>
      <PrimaryButton text="一時停止" onClickAction={handlePauseAction} />
    </Box>
  </Box>
);

export default PuzzleGuide;
