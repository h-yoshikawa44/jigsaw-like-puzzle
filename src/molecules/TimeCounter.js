import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import TimerIcon from '@material-ui/icons/Timer';
import Counter from '../atoms/Counter';

const TimeCounter = ({ hour, minutes, seconds }) => {
  return (
    <Box m={2} fontSize="1.8rem">
      <TimerIcon style={{ paddingRight: '5px' }} />
      <Counter hour={hour} minutes={minutes} seconds={seconds} />
    </Box>
  );
};

TimeCounter.propTypes = {
  hour: PropTypes.string.isRequired,
  minutes: PropTypes.string.isRequired,
  seconds: PropTypes.string.isRequired,
};

export default TimeCounter;
