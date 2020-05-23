import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Box, Button, Divider, Fade, Modal } from '@material-ui/core';
import ExtensionIcon from '@material-ui/icons/Extension';
import TimerIcon from '@material-ui/icons/Timer';
import Konva from 'konva';
import { Stage, Layer, Group, Rect, Line, Image } from 'react-konva';
import useImage from 'use-image';
import _shuffle from 'lodash/shuffle';

const TimeCounter = ({ hour, minutes, seconds }) => {
  return (
    <Box m={2} fontSize="1.8rem">
      <TimerIcon style={{ paddingRight: '5px' }} />
      {`${hour}:${minutes}:${seconds}`}
    </Box>
  );
};

TimeCounter.propTypes = {
  hour: PropTypes.string.isRequired,
  minutes: PropTypes.string.isRequired,
  seconds: PropTypes.string.isRequired,
};

const Guide = ({
  matchPieceCount,
  pieceTotalCount,
  hour,
  minutes,
  seconds,
  handlePauseAction,
}) => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Box m={2} fontSize="1.8rem">
        <ExtensionIcon style={{ paddingRight: '5px' }} />
        {`${matchPieceCount} / ${pieceTotalCount}`}
      </Box>
      <TimeCounter hour={hour} minutes={minutes} seconds={seconds} />
      <Box m={2}>
        <Button onClick={handlePauseAction} variant="contained" color="primary">
          一時停止
        </Button>
      </Box>
    </Box>
  );
};

Guide.propTypes = {
  matchPieceCount: PropTypes.number.isRequired,
  pieceTotalCount: PropTypes.number.isRequired,
  hour: PropTypes.string.isRequired,
  minutes: PropTypes.string.isRequired,
  seconds: PropTypes.string.isRequired,
  handlePauseAction: PropTypes.func.isRequired,
};

const SelectDifficultyModal = ({ open, handleSelectDifficultyAction }) => {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      closeAfterTransition
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Fade in={open}>
        <Box
          p={4}
          width={400}
          bgcolor="background.paper"
          boxShadow={3}
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <h2 id="transition-modal-title">難易度選択</h2>
          <p id="transition-modal-description">
            難易度に応じて、ピース数が変わります
          </p>
          <Box p={2}>
            <Button
              variant="contained"
              style={{ color: 'white', backgroundColor: 'green' }}
              onClick={() => handleSelectDifficultyAction('easy')}
            >
              初級（24ピース）
            </Button>
          </Box>
          <Box p={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleSelectDifficultyAction('normal')}
            >
              中級（54ピース）
            </Button>
          </Box>
          <Box p={2}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleSelectDifficultyAction('hard')}
            >
              上級（96ピース）
            </Button>
          </Box>
          <Box mt={6} fontSize="0.8rem">
            <Link to="/policy">当サービスについて</Link>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

SelectDifficultyModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleSelectDifficultyAction: PropTypes.func.isRequired,
};

const PauseModal = ({ open, handlePauseReleseAction }) => {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      closeAfterTransition
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Fade in={open}>
        <Box
          p={4}
          width={400}
          bgcolor="background.paper"
          boxShadow={3}
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <h2 id="transition-modal-title">一時停止中</h2>
          <p id="transition-modal-description">疲れたときは小休憩</p>
          <Box p={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handlePauseReleseAction()}
            >
              復帰
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

PauseModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handlePauseReleseAction: PropTypes.func.isRequired,
};

const CompleteModal = ({
  open,
  hour,
  minutes,
  seconds,
  handleRestartAction,
}) => {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      closeAfterTransition
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Fade in={open}>
        <Box
          p={4}
          width={400}
          bgcolor="background.paper"
          boxShadow={3}
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <h2 id="transition-modal-title">Congratulations！</h2>
          <p id="transition-modal-description">お疲れさまでしたー</p>
          <Box p={2} fontSize="1.8rem">
            {`クリアタイム：${hour}:${minutes}:${seconds}`}
          </Box>
          <Box p={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleRestartAction()}
            >
              再チャレンジ
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

CompleteModal.propTypes = {
  open: PropTypes.bool.isRequired,
  hour: PropTypes.string.isRequired,
  minutes: PropTypes.string.isRequired,
  seconds: PropTypes.string.isRequired,
  handleRestartAction: PropTypes.func.isRequired,
};

const Puzzle = () => {
  const [hour, setHour] = useState('00');
  const [minutes, setMinutes] = useState('00');
  const [seconds, setSeconds] = useState('00');
  const [timerId, setTimerId] = useState(0);
  let time = 0;
  const [backupTime, setBackupTime] = useState(0);

  const parseHours = () => {
    return `00${parseInt(time / 60 / 60, 10)}`.slice(-2);
  };
  const parseMinutes = () => {
    return `00${parseInt((time / 60) % 60, 10)}`.slice(-2);
  };
  const parseSeconds = () => {
    return `00${parseInt(time % 60, 10)}`.slice(-2);
  };
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

  const handleSelectDifficultyAction = async (diffculty) => {
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
        console.log('error');
    }
    // initialPiece();
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
    });
    const { id } = e.target.attrs;
    const items = shuffledPieceInfo.slice();
    const item = items.find((i) => i.id === id);
    const index = items.indexOf(item);
    items.splice(index, 1);
    items.push(item);
    setShuffledPieceInfo(items);
  };
  const handleDragEnd = (e) => {
    console.log(e.target);
    const update = {
      duration: 0.5,
      easing: Konva.Easings.ElasticEaseOut,
      scaleX: 1,
      scaleY: 1,
      shadowOffsetX: 5,
      shadowOffsetY: 5,
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

  const [image] = useImage(`${process.env.PUBLIC_URL}/photo0000_6339.png`);
  const flameWidth = 40;
  const imageWidth = 720;
  const imageHeight = 480;
  const padding = 50;
  /* global window */
  const stageWidth = window.innerWidth;
  const stageHeight = imageHeight + flameWidth * 2 + padding * 2;
  const imageFlameX = stageWidth / 2 - (imageWidth + flameWidth * 2) / 2;
  const initialPieceSpaceX = -180;

  return (
    <div>
      <Guide
        matchPieceCount={matchPieceCount}
        pieceTotalCount={pieceXCount * pieceYCount}
        hour={hour}
        minutes={minutes}
        seconds={seconds}
        handlePauseAction={handlePauseAction}
      />
      <Divider />
      <Stage width={stageWidth} height={stageHeight}>
        <Layer>
          <Group x={imageFlameX} y={padding}>
            <Rect
              width={imageWidth}
              height={imageHeight}
              x={flameWidth}
              y={flameWidth}
              fill="white"
            />
            <Image
              image={image}
              opacity={0.6}
              width={imageWidth}
              height={imageHeight}
              x={flameWidth}
              y={flameWidth}
            />
            <Line
              points={[
                0,
                0,
                flameWidth * 2 + imageWidth,
                0,
                flameWidth + imageWidth,
                flameWidth,
                flameWidth,
                flameWidth,
              ]}
              closed
              fillLinearGradientStartPoint={{
                x: flameWidth + imageWidth / 2,
                y: 0,
              }}
              fillLinearGradientEndPoint={{
                x: flameWidth + imageWidth / 2,
                y: flameWidth,
              }}
              fillLinearGradientColorStops={[0, '#b34e06', 1, '#501300']}
            />
            <Line
              points={[
                0,
                0,
                flameWidth,
                flameWidth,
                flameWidth,
                flameWidth + imageHeight,
                0,
                flameWidth * 2 + imageHeight,
              ]}
              closed
              fillLinearGradientStartPoint={{
                x: 0,
                y: flameWidth + imageHeight / 2,
              }}
              fillLinearGradientEndPoint={{
                x: flameWidth,
                y: flameWidth + imageHeight / 2,
              }}
              fillLinearGradientColorStops={[0, '#b34e06', 1, '#501300']}
            />
            <Line
              points={[
                flameWidth,
                flameWidth + imageHeight,
                flameWidth + imageWidth,
                flameWidth + imageHeight,
                flameWidth * 2 + imageWidth,
                flameWidth * 2 + imageHeight,
                0,
                flameWidth * 2 + imageHeight,
              ]}
              closed
              fillLinearGradientStartPoint={{
                x: flameWidth + imageWidth / 2,
                y: flameWidth * 2 + imageHeight,
              }}
              fillLinearGradientEndPoint={{
                x: flameWidth + imageWidth / 2,
                y: flameWidth + imageHeight,
              }}
              fillLinearGradientColorStops={[0, '#b34e06', 1, '#501300']}
            />
            <Line
              points={[
                flameWidth + imageWidth,
                flameWidth,
                flameWidth * 2 + imageWidth,
                0,
                flameWidth * 2 + imageWidth,
                flameWidth * 2 + imageHeight,
                flameWidth + imageWidth,
                flameWidth + imageHeight,
              ]}
              closed
              fillLinearGradientStartPoint={{
                x: flameWidth * 2 + imageWidth,
                y: flameWidth + imageHeight / 2,
              }}
              fillLinearGradientEndPoint={{
                x: flameWidth + imageWidth,
                y: flameWidth + imageHeight / 2,
              }}
              fillLinearGradientColorStops={[0, '#b34e06', 1, '#501300']}
            />
            <Line
              points={[
                0,
                0,
                flameWidth,
                flameWidth,
                flameWidth,
                flameWidth + imageHeight,
                0,
                flameWidth * 2 + imageHeight,
              ]}
              closed
              fillLinearGradientStartPoint={{
                x: 0,
                y: flameWidth + imageHeight / 2,
              }}
              fillLinearGradientEndPoint={{
                x: flameWidth,
                y: flameWidth + imageHeight / 2,
              }}
              fillLinearGradientColorStops={[0, '#b34e06', 1, '#501300']}
            />
            <Line
              points={[
                0,
                0,
                flameWidth * 2 + imageWidth,
                0,
                flameWidth + imageWidth,
                flameWidth,
                flameWidth,
                flameWidth,
              ]}
              closed
              fillLinearGradientStartPoint={{
                x: flameWidth + imageWidth / 2,
                y: 0,
              }}
              fillLinearGradientEndPoint={{
                x: flameWidth + imageWidth / 2,
                y: flameWidth,
              }}
              fillLinearGradientColorStops={[0, '#b34e06', 1, '#501300']}
            />
          </Group>
        </Layer>
        <Layer>
          <Group x={imageFlameX + flameWidth} y={padding + flameWidth}>
            {shuffledPieceInfo.map((piece) => {
              return (
                <Image
                  key={piece.id}
                  id={piece.id}
                  image={image}
                  crop={piece.crop}
                  width={piece.width}
                  height={piece.height}
                  x={initialPieceSpaceX}
                  draggable
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                />
              );
            })}
          </Group>
        </Layer>
      </Stage>
      <SelectDifficultyModal
        open={difficultyModalOpen}
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

export default Puzzle;
