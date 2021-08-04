import React, { VFC } from 'react';
import { Button } from '@material-ui/core';

type Props = {
  text: string;
  onClickAction: React.MouseEventHandler<HTMLButtonElement>;
};

const PrimaryButton: VFC<Props> = ({ text, onClickAction }) => (
  <Button onClick={onClickAction} variant="contained" color="primary">
    {text}
  </Button>
);

export default PrimaryButton;
