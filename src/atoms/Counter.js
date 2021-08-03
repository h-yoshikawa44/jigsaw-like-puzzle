import React from 'react';
import PropTypes from 'prop-types';

const Counter = ({ hour, minutes, seconds }) => (
  <>{`${hour}:${minutes}:${seconds}`}</>
);

Counter.propTypes = {
  hour: PropTypes.string.isRequired,
  minutes: PropTypes.string.isRequired,
  seconds: PropTypes.string.isRequired,
};

export default Counter;
