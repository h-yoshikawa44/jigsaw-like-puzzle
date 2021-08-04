import { VFC } from 'react';
import { Box } from '@material-ui/core';
import ExtensionIcon from '@material-ui/icons/Extension';
import ScoreCounter from '../atoms/ScoreCounter';

type Props = {
  matchPieceCount: number;
  pieceTotalCount: number;
};

const PieceCounter: VFC<Props> = ({ matchPieceCount, pieceTotalCount }) => (
  <Box m={2} fontSize="1.8rem">
    <ExtensionIcon style={{ paddingRight: '5px' }} />
    <ScoreCounter count={matchPieceCount} totalCount={pieceTotalCount} />
  </Box>
);

export default PieceCounter;
