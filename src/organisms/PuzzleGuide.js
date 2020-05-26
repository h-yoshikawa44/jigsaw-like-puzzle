import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import PieceCounter from '../molecules/PieceCounter';
import TimeCounter from '../molecules/TimeCounter';
import PrimaryButton from '../atoms/PrimaryButton';

const PuzzleGuide = ({
  matchPieceCount,
  pieceTotalCount,
  hour,
  minutes,
  seconds,
  handlePauseAction,
}) => {
  return (
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
};

PuzzleGuide.propTypes = {
  matchPieceCount: PropTypes.number.isRequired,
  pieceTotalCount: PropTypes.number.isRequired,
  hour: PropTypes.string.isRequired,
  minutes: PropTypes.string.isRequired,
  seconds: PropTypes.string.isRequired,
  handlePauseAction: PropTypes.func.isRequired,
};

export default PuzzleGuide;
