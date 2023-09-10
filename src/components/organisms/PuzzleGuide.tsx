import { FC } from 'react';
import Box from '@mui/material/Box';
import PieceCounter from 'components/molecules/PieceCounter';
import TimeCounter from 'components/molecules/TimeCounter';
import PrimaryButton from 'components/atoms/PrimaryButton';

type Props = {
  matchPieceCount: number;
  pieceTotalCount: number;
  hour: string;
  minutes: string;
  seconds: string;
  onPause: VoidFunction;
};

const PuzzleGuide: FC<Props> = ({
  matchPieceCount,
  pieceTotalCount,
  hour,
  minutes,
  seconds,
  onPause,
}) => (
  <Box display="flex" justifyContent="center" alignItems="center">
    <PieceCounter
      matchPieceCount={matchPieceCount}
      pieceTotalCount={pieceTotalCount}
    />
    <TimeCounter hour={hour} minutes={minutes} seconds={seconds} />
    <Box m={2}>
      <PrimaryButton text="一時停止" onClick={onPause} />
    </Box>
  </Box>
);

export default PuzzleGuide;
