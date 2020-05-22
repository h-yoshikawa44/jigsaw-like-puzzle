import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Divider } from '@material-ui/core';
import ExtensionIcon from '@material-ui/icons/Extension';
import TimerIcon from '@material-ui/icons/Timer';
import Konva from 'konva';
import { Stage, Layer, Group, Rect, Line, Image } from 'react-konva';
import useImage from 'use-image';

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

const Guide = ({ matchPieceCount, pieceTotalCount }) => {
  const [hour, setHour] = useState('00');
  const [minutes, setMinutes] = useState('00');
  const [seconds, setSeconds] = useState('00');
  const [timerId, setTimerId] = useState(0);
  let time = 0;

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
    time += 1;
    setHour(parseHours());
    setMinutes(parseMinutes());
    setSeconds(parseSeconds());
  };
  const timerStart = () => {
    setTimerId(setInterval(timeCount, 1000));
  };
  const timeStop = () => {
    clearInterval(timerId);
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Box m={2} fontSize="1.8rem">
        <ExtensionIcon style={{ paddingRight: '5px' }} />
        {`${matchPieceCount} / ${pieceTotalCount}`}
      </Box>
      <TimeCounter hour={hour} minutes={minutes} seconds={seconds} />
      <Box m={2}>
        <Button onClick={timerStart} variant="contained" color="primary">
          開始
        </Button>
      </Box>
      <Box m={2}>
        <Button onClick={timeStop} variant="contained" color="primary">
          一時停止
        </Button>
      </Box>
    </Box>
  );
};

Guide.propTypes = {
  matchPieceCount: PropTypes.number.isRequired,
  pieceTotalCount: PropTypes.number.isRequired,
};

const App = () => {
  const [matchPieceCount, setMatchPieceCount] = useState(0);
  const pieceTotalCount = 24;
  // const [pieceTotalCount, setPieceTotalCount] = useState(24);
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
      checkNumber(e.target.attrs.x, 600) &&
      checkNumber(e.target.attrs.y, 120)
    ) {
      setMatchPieceCount((count) => count + 1);
      Object.assign(update, { draggable: false, x: 600, y: 120 });
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

  return (
    <div>
      <Guide
        matchPieceCount={matchPieceCount}
        pieceTotalCount={pieceTotalCount}
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
            <Image
              image={image}
              crop={{ x: 0, y: 0, width: 120, height: 120 }}
              width={120}
              height={120}
              draggable
            />
            <Image
              image={image}
              crop={{ x: 120, y: 0, width: 120, height: 120 }}
              width={120}
              height={120}
              draggable
            />
            <Image
              image={image}
              crop={{ x: 240, y: 0, width: 120, height: 120 }}
              width={120}
              height={120}
              draggable
            />
            <Image
              image={image}
              crop={{ x: 360, y: 0, width: 120, height: 120 }}
              width={120}
              height={120}
              draggable
            />
            <Image
              image={image}
              crop={{ x: 480, y: 0, width: 120, height: 120 }}
              width={120}
              height={120}
              draggable
            />
            <Image
              image={image}
              crop={{ x: 600, y: 0, width: 120, height: 120 }}
              width={120}
              height={120}
              draggable
            />
            <Image
              image={image}
              crop={{ x: 0, y: 120, width: 120, height: 120 }}
              width={120}
              height={120}
              draggable
            />
            <Image
              image={image}
              crop={{ x: 120, y: 120, width: 120, height: 120 }}
              width={120}
              height={120}
              draggable
            />
            <Image
              image={image}
              crop={{ x: 240, y: 120, width: 120, height: 120 }}
              width={120}
              height={120}
              draggable
            />
            <Image
              image={image}
              crop={{ x: 360, y: 120, width: 120, height: 120 }}
              width={120}
              height={120}
              draggable
            />
            <Image
              image={image}
              crop={{ x: 480, y: 120, width: 120, height: 120 }}
              width={120}
              height={120}
              draggable
            />
            <Image
              image={image}
              crop={{ x: 600, y: 120, width: 120, height: 120 }}
              width={120}
              height={120}
              draggable
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            />
          </Group>
        </Layer>
      </Stage>
    </div>
  );
};

export default App;
