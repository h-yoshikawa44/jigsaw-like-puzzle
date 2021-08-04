import { VFC } from 'react';
import { Box } from '@material-ui/core';

type Props = {
  hour: string;
  minutes: string;
  seconds: string;
};

const CleatTime: VFC<Props> = ({ hour, minutes, seconds }) => (
  <Box p={2} fontSize="1.8rem">
    {`クリアタイム：${hour}:${minutes}:${seconds}`}
  </Box>
);

export default CleatTime;
