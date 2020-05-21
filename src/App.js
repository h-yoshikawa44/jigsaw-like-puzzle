import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Konva from 'konva';
import { Stage, Layer, Image } from 'react-konva';
import useImage from 'use-image';

const TimeCounter = ({ hour, minutes, seconds }) => {
  return (
    <Box m={3} fontSize="h4.fontSize">{`${hour}:${minutes}:${seconds}`}</Box>
  );
};

TimeCounter.propTypes = {
  hour: PropTypes.string.isRequired,
  minutes: PropTypes.string.isRequired,
  seconds: PropTypes.string.isRequired,
};

const Timer = () => {
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
      <TimeCounter hour={hour} minutes={minutes} seconds={seconds} />
      <Box m={3}>
        <Button onClick={timerStart} variant="contained" color="primary">
          開始
        </Button>
      </Box>
      <Box m={3}>
        <Button onClick={timeStop} variant="contained" color="primary">
          一時停止
        </Button>
      </Box>
    </Box>
  );
};

const App = () => {
  const [remainingPieceCount, setRemainingPieceCount] = useState(24);
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
      setRemainingPieceCount((count) => count - 1);
      Object.assign(update, { draggable: false, x: 600, y: 120 });
    }
    e.target.to(update);
  };

  /* global window */
  const [image] = useImage(`${process.env.PUBLIC_URL}/photo0000_6339.png`);
  // const ref = useRef('test');

  // time = setInterval(console.log(time), 1000);
  return (
    <Container fixed>
      <Timer />
      <Box>
        残り：
        {remainingPieceCount}
      </Box>
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer width={720}>
          {/* <Text text="Try to drag a star" /> */}
          <Image image={image} opacity={0.5} width={720} height={480} y={10} />
          {/* {[...Array(10)].map((_, i) => (
            <Star
              key={i}
              x={Math.random() * 500}
              y={Math.random() * window.innerHeight}
              numPoints={5}
              innerRadius={20}
              outerRadius={40}
              fill="#89b7"
              opacity={0.8}
              draggable
              rotation={Math.random() * 180}
              shadowColor="black"
              shadowBlur={10}
              shadowOpacity={0.6}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            />
          ))} */}
        </Layer>
        <Layer width={1200} y={10}>
          {/* <Text text="Try to drag a star" /> */}
          {/* {[...Array(10)].map((_, i) => (
            <Star
              key={i}
              x={Math.random() * 400}
              y={Math.random() * window.innerHeight}
              numPoints={5}
              innerRadius={20}
              outerRadius={40}
              fill="#89b717"
              opacity={0.8}
              draggable
              rotation={Math.random() * 180}
              shadowColor="black"
              shadowBlur={10}
              shadowOpacity={0.6}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            />
          ))} */}
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
        </Layer>
      </Stage>
    </Container>
  );
};

export default App;
