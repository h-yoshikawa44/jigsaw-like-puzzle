import { FC } from 'react';
import Button from '@mui/material/Button';
import { Diffculty } from 'models/Diffculty';

type Props = {
  difficulty: Diffculty;
  onClick: (diffculty: Diffculty) => void;
};

const DifficultyButton: FC<Props> = ({ difficulty, onClick }) => (
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
        color={difficulty === 'normal' ? 'primary' : 'error'}
        onClick={() => onClick(difficulty)}
      >
        {difficulty === 'normal' ? '中級（54ピース）' : '上級（96ピース）'}
      </Button>
    )}
  </>
);

export default DifficultyButton;
