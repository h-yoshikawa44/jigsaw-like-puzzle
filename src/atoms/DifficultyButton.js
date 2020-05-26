import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';

const DifficultyButton = ({ difficulty, onClickAction }) => {
  return (
    <>
      {difficulty === 'easy' && (
        <Button
          variant="contained"
          style={{ color: 'white', backgroundColor: 'green' }}
          onClick={() => onClickAction(difficulty)}
        >
          初級（24ピース）
        </Button>
      )}
      {(difficulty === 'normal' || difficulty === 'hard') && (
        <Button
          variant="contained"
          color={difficulty === 'normal' ? 'primary' : 'secondary'}
          onClick={() => onClickAction(difficulty)}
        >
          {difficulty === 'normal' ? '中級（54ピース）' : '上級（96ピース）'}
        </Button>
      )}
    </>
  );
};

DifficultyButton.propTypes = {
  difficulty: PropTypes.string.isRequired,
  onClickAction: PropTypes.func.isRequired,
};

export default DifficultyButton;
