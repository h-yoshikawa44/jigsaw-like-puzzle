import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';

const PrimaryButton = ({ text, onClickAction }) => {
  return (
    <Button onClick={onClickAction} variant="contained" color="primary">
      {text}
    </Button>
  );
};

PrimaryButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClickAction: PropTypes.func.isRequired,
};

export default PrimaryButton;
