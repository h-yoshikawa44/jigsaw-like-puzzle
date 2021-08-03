import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Divider } from '@material-ui/core';
import Konva from 'konva';
import _shuffle from 'lodash/shuffle';
import useImage from 'use-image';
import PuzzleGuide from '../organisms/PuzzleGuide';
import SelectDifficultyModal from '../organisms/SelectDifficultyModal';
import CompleteModal from '../organisms/CompleteModal';
import PauseModal from '../organisms/PauseModal';
import PuzzleCanvas from '../organisms/PuzzleCanvas';

const PuzzleTemplate = ({ imageUrl }) => {
  const [hour, setHour] = useState('00');
  const [minutes, setMinutes] = useState('00');
  const [seconds, setSeconds] = useState('00');
  const [timerId, setTimerId] = useState(0);
  let time = 0;
  const [backupTime, setBackupTime] = useState(0);

  const parseHours = () => `00${parseInt(time / 60 / 60, 10)}`.slice(-2);
  const parseMinutes = () => `00${parseInt((time / 60) % 60, 10)}`.slice(-2);
  const parseSeconds = () => `00${parseInt(time % 60, 10)}`.slice(-2);
  const timeCount = () => {
    if (!time && backupTime) {
      time = backupTime;
    }
    time += 1;
    setHour(parseHours());
    setMinutes(parseMinutes());
    setSeconds(parseSeconds());
    setBackupTime(time);
  };
  const timerStart = () => {
    setTimerId(setInterval(timeCount, 1000));
  };
  const timeStop = () => {
    clearInterval(timerId);
  };

  const [difficultyModalOpen, setDifficultyModalOpen] = useState(true);
  const [pauseModalOpen, setPauseModalOpen] = useState(false);
  const [completeModalOpen, setCompleteModalOpen] = useState(false);
  const [matchPieceCount, setMatchPieceCount] = useState(0);
  const [pieceXCount, setPieceXCount] = useState(0);
  const [pieceYCount, setPieceYCount] = useState(0);
  const [pieceSize, setPieceSize] = useState(0);
  const [shuffledPieceInfo, setShuffledPieceInfo] = useState([]);

  const handlePauseAction = () => {
    timeStop();
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
      timeStop();
      setTimeout(complete, 1500);
    }
  }, [matchPieceCount]);

  const handleSelectDifficultyAction = (diffculty) => {
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
    timerStart();
  };
  const handlePauseReleseAction = () => {
    setPauseModalOpen(false);
    timerStart();
  };
  const handleRestartAction = () => {
    setCompleteModalOpen(false);
    setHour('00');
    setMinutes('00');
    setSeconds('00');
    setBackupTime(0);
    setPieceXCount(0);
    setPieceYCount(0);
    setMatchPieceCount(0);
    setDifficultyModalOpen(true);
  };
  const checkNumber = (pieceNum, fixedPosition) => {
    if (pieceNum > fixedPosition + 20 || pieceNum < fixedPosition - 20) {
      return false;
    }
    return true;
  };
  const handleDragStart = (e) => {
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
    const index = pieces.indexOf(piece);
    pieces.splice(index, 1);
    pieces.push(piece);
    setShuffledPieceInfo(pieces);
  };
  const handleDragEnd = (e) => {
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
        hour={hour}
        minutes={minutes}
        seconds={seconds}
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
        hour={hour}
        minutes={minutes}
        seconds={seconds}
        handleRestartAction={handleRestartAction}
      />
    </div>
  );
};

PuzzleTemplate.propTypes = {
  imageUrl: PropTypes.string.isRequired,
};

export default PuzzleTemplate;
