import { VFC, useState, useEffect } from 'react';
import { Divider } from '@material-ui/core';
import Konva from 'konva';
import _shuffle from 'lodash/shuffle';
import useImage from 'use-image';
import PuzzleGuide from 'components/organisms/PuzzleGuide';
import SelectDifficultyModal from 'components/organisms/SelectDifficultyModal';
import CompleteModal from 'components/organisms/CompleteModal';
import PauseModal from 'components/organisms/PauseModal';
import PuzzleCanvas from 'components/organisms/PuzzleCanvas';
import useCounter from 'hooks/useCounter';
import { Diffculty } from 'models/Diffculty';
import { Piece } from 'models/Piece';

type Props = {
  imageUrl: string;
};

const PuzzleTemplate: VFC<Props> = ({ imageUrl }) => {
  const { time, countStart, countStop, countReset } = useCounter();

  const [difficultyModalOpen, setDifficultyModalOpen] = useState(true);
  const [pauseModalOpen, setPauseModalOpen] = useState(false);
  const [completeModalOpen, setCompleteModalOpen] = useState(false);
  const [matchPieceCount, setMatchPieceCount] = useState(0);
  const [pieceXCount, setPieceXCount] = useState(0);
  const [pieceYCount, setPieceYCount] = useState(0);
  const [pieceSize, setPieceSize] = useState(0);
  const [shuffledPieceInfo, setShuffledPieceInfo] = useState<Piece[]>([]);

  const handlePauseAction = () => {
    countStop();
    setPauseModalOpen(true);
  };
  useEffect(() => {
    const initialPiece = () => {
      const pieceInfo = [];
      const randomKey = Math.random().toString(32).substring(2);
      for (let y = 0; y < pieceYCount; y += 1) {
        for (let x = 0; x < pieceXCount; x += 1) {
          pieceInfo.push({
            id: `${y}-${x}-${randomKey}`,
            crop: {
              x: pieceSize * x,
              y: pieceSize * y,
              width: pieceSize,
              height: pieceSize,
            },
            width: pieceSize,
            height: pieceSize,
          });
        }
      }
      setShuffledPieceInfo(_shuffle(pieceInfo));
    };
    if (pieceXCount && pieceYCount && pieceSize) {
      initialPiece();
    }
  }, [pieceXCount, pieceYCount, pieceSize]);

  useEffect(() => {
    const complete = () => {
      setCompleteModalOpen(true);
    };
    if (matchPieceCount && matchPieceCount === pieceXCount * pieceYCount) {
      countStop();
      setTimeout(complete, 1500);
    }
  }, [matchPieceCount, pieceXCount, pieceYCount, countStop]);

  const handleSelectDifficultyAction = (diffculty: Diffculty) => {
    switch (diffculty) {
      case 'easy':
        setPieceXCount(6);
        setPieceYCount(4);
        setPieceSize(120);
        break;
      case 'normal':
        setPieceXCount(9);
        setPieceYCount(6);
        setPieceSize(80);
        break;
      case 'hard':
        setPieceXCount(12);
        setPieceYCount(8);
        setPieceSize(60);
        break;
      default:
        // eslint-disable-next-line no-console
        console.log('error');
    }
    setDifficultyModalOpen(false);
    countStart();
  };
  const handlePauseReleseAction = () => {
    setPauseModalOpen(false);
    countStart();
  };
  const handleRestartAction = () => {
    setCompleteModalOpen(false);
    countReset();
    setPieceXCount(0);
    setPieceYCount(0);
    setMatchPieceCount(0);
    setDifficultyModalOpen(true);
  };
  const checkNumber = (pieceNum: number, fixedPosition: number) => {
    if (pieceNum > fixedPosition + 20 || pieceNum < fixedPosition - 20) {
      return false;
    }
    return true;
  };
  const handleDragStart = (e: Konva.KonvaEventObject<DragEvent>) => {
    e.target.setAttrs({
      shadowOffset: {
        x: 15,
        y: 15,
      },
      scaleX: 1.1,
      scaleY: 1.1,
      shadowColor: 'gray',
      shadowBlur: 10,
      shadowOpacity: 0.6,
    });
    const { id } = e.target.attrs;
    const pieces = shuffledPieceInfo.slice();
    const piece = pieces.find((i) => i.id === id);
    if (piece) {
      const index = pieces.indexOf(piece);
      pieces.splice(index, 1);
      pieces.push(piece);
    }
    setShuffledPieceInfo(pieces);
  };
  const handleDragEnd = (e: Konva.KonvaEventObject<DragEvent>) => {
    const update = {
      duration: 0.5,
      easing: Konva.Easings.ElasticEaseOut,
      scaleX: 1,
      scaleY: 1,
      shadowOffsetX: 0,
      shadowOffsetY: 0,
    };
    if (
      checkNumber(e.target.attrs.x, e.target.attrs.cropX) &&
      checkNumber(e.target.attrs.y, e.target.attrs.cropY)
    ) {
      setMatchPieceCount((count) => count + 1);
      Object.assign(update, {
        draggable: false,
        x: e.target.attrs.cropX,
        y: e.target.attrs.cropY,
      });
    }
    e.target.to(update);
  };

  const [image, status] = useImage(imageUrl);

  return (
    <div>
      <PuzzleGuide
        matchPieceCount={matchPieceCount}
        pieceTotalCount={pieceXCount * pieceYCount}
        hour={time.hour}
        minutes={time.minutes}
        seconds={time.seconds}
        handlePauseAction={handlePauseAction}
      />
      <Divider />
      {status === 'loaded' && (
        <PuzzleCanvas
          image={image}
          shuffledPieceInfo={shuffledPieceInfo}
          handleDragStart={handleDragStart}
          handleDragEnd={handleDragEnd}
        />
      )}
      <SelectDifficultyModal
        open={difficultyModalOpen}
        loading={status === 'loading'}
        handleSelectDifficultyAction={handleSelectDifficultyAction}
      />
      <PauseModal
        open={pauseModalOpen}
        handlePauseReleseAction={handlePauseReleseAction}
      />
      <CompleteModal
        open={completeModalOpen}
        hour={time.hour}
        minutes={time.minutes}
        seconds={time.seconds}
        handleRestartAction={handleRestartAction}
      />
    </div>
  );
};

export default PuzzleTemplate;
