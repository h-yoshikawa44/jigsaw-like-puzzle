import { VFC } from 'react';
import Button from '@material-ui/core/Button';
import { Diffculty } from 'models/Diffculty';

type Props = {
  difficulty: Diffculty;
  onClick: (diffculty: Diffculty) => void;
};

const DifficultyButton: VFC<Props> = ({ difficulty, onClick }) => (
  <>
    {difficulty === 'easy' && (
      <Button
        variant="contained"
        style={{ color: 'white', backgroundColor: 'green' }}
        onClick={() => onClick(difficulty)}
      >
        初級（24ピース）
      </Button>
    )}
    {(difficulty === 'normal' || difficulty === 'hard') && (
      <Button
        variant="contained"
        color={difficulty === 'normal' ? 'primary' : 'secondary'}
        onClick={() => onClick(difficulty)}
      >
        {difficulty === 'normal' ? '中級（54ピース）' : '上級（96ピース）'}
      </Button>
    )}
  </>
);

export default DifficultyButton;
