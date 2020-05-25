import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import ExtensionIcon from '@material-ui/icons/Extension';
import ScoreCounter from '../atoms/ScoreCounter';

const PieceCounter = ({ matchPieceCount, pieceTotalCount }) => {
  return (
    <Box m={2} fontSize="1.8rem">
      <ExtensionIcon style={{ paddingRight: '5px' }} />
      <ScoreCounter count={matchPieceCount} totalCount={pieceTotalCount} />
    </Box>
  );
};

PieceCounter.propTypes = {
  matchPieceCount: PropTypes.number.isRequired,
  pieceTotalCount: PropTypes.number.isRequired,
};

export default PieceCounter;
