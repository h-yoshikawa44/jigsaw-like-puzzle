import { FC } from 'react';
import Box from '@mui/material/Box';
import ExtensionIcon from '@mui/icons-material/Extension';
import ScoreCounter from 'components/atoms/ScoreCounter';

type Props = {
  matchPieceCount: number;
  pieceTotalCount: number;
};

const PieceCounter: FC<Props> = ({ matchPieceCount, pieceTotalCount }) => (
  <Box m={2} fontSize="1.8rem">
    <ExtensionIcon style={{ paddingRight: '5px' }} />
    <ScoreCounter count={matchPieceCount} totalCount={pieceTotalCount} />
  </Box>
);

export default PieceCounter;
