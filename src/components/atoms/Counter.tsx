import { FC } from 'react';

type Props = {
  hour: string;
  minutes: string;
  seconds: string;
};

const Counter: FC<Props> = ({ hour, minutes, seconds }) => (
  <>{`${hour}:${minutes}:${seconds}`}</>
);

export default Counter;
