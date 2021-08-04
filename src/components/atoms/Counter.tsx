import { VFC } from 'react';

type Props = {
  hour: string;
  minutes: string;
  seconds: string;
};

const Counter: VFC<Props> = ({ hour, minutes, seconds }) => (
  <>{`${hour}:${minutes}:${seconds}`}</>
);

export default Counter;
