import React from 'react';
import PropTypes from 'prop-types';

const ScoreCounter = ({ count, totalCount }) => (
  <>{`${count} / ${totalCount}`}</>
);

ScoreCounter.propTypes = {
  count: PropTypes.number.isRequired,
  totalCount: PropTypes.number.isRequired,
};

export default ScoreCounter;
