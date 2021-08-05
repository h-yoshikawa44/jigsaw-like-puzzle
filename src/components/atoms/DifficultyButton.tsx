import { VFC } from 'react';
import { Button } from '@material-ui/core';
import { Diffculty } from 'models/Diffculty';

type Props = {
  difficulty: Diffculty;
  onClickAction: (diffculty: Diffculty) => void;
};

const DifficultyButton: VFC<Props> = ({ difficulty, onClickAction }) => (
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

export default DifficultyButton;
