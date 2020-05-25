import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';

const CleatTime = ({ hour, minutes, seconds }) => {
  return (
    <Box p={2} fontSize="1.8rem">
      {`クリアタイム：${hour}:${minutes}:${seconds}`}
    </Box>
  );
};

CleatTime.propTypes = {
  hour: PropTypes.string.isRequired,
  minutes: PropTypes.string.isRequired,
  seconds: PropTypes.string.isRequired,
};

export default CleatTime;
