import { FC } from 'react';

type Props = {
  count: number;
  totalCount: number;
};

const ScoreCounter: FC<Props> = ({ count, totalCount }) => (
  <>{`${count} / ${totalCount}`}</>
);

export default ScoreCounter;
