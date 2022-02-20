import React, { VFC } from 'react';
import Button from '@mui/material/Button';

type Props = {
  text: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

const PrimaryButton: VFC<Props> = ({ text, onClick }) => (
  <Button variant="contained" color="primary" onClick={onClick}>
    {text}
  </Button>
);

export default PrimaryButton;
