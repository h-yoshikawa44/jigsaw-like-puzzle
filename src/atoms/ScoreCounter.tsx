import { VFC } from 'react';

type Props = {
  count: number;
  totalCount: number;
};

const ScoreCounter: VFC<Props> = ({ count, totalCount }) => (
  <>{`${count} / ${totalCount}`}</>
);

export default ScoreCounter;
