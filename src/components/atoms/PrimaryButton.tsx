import React, { FC } from 'react';
import Button from '@mui/material/Button';

type Props = {
  text: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

const PrimaryButton: FC<Props> = ({ text, onClick }) => (
  <Button variant="contained" color="primary" onClick={onClick}>
    {text}
  </Button>
);

export default PrimaryButton;
