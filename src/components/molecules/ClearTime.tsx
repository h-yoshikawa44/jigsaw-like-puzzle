import { FC } from 'react';
import Box from '@mui/material/Box';

type Props = {
  hour: string;
  minutes: string;
  seconds: string;
};

const CleatTime: FC<Props> = ({ hour, minutes, seconds }) => (
  <Box p={2} fontSize="1.8rem">
    {`クリアタイム：${hour}:${minutes}:${seconds}`}
  </Box>
);

export default CleatTime;
