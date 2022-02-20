import { VFC } from 'react';
import Box from '@mui/material/Box';
import TimerIcon from '@mui/icons-material/TimerOutlined';
import Counter from 'components/atoms/Counter';

type Props = {
  hour: string;
  minutes: string;
  seconds: string;
};

const TimeCounter: VFC<Props> = ({ hour, minutes, seconds }) => (
  <Box m={2} fontSize="1.8rem">
    <TimerIcon style={{ paddingRight: '5px' }} />
    <Counter hour={hour} minutes={minutes} seconds={seconds} />
  </Box>
);

export default TimeCounter;
