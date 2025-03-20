import { useState, useRef, useEffect, useCallback } from 'react';
import { Time } from 'models/Time';

const useCounter = (): {
  time: Time;
  countStart: VoidFunction;
  countStop: VoidFunction;
  countReset: VoidFunction;
} => {
  const [countTime, setCountTime] = useState<number>(0);
  const [time, setTime] = useState<Time>({
    hour: '00',
    minutes: '00',
    seconds: '00',
  });
  const intervalId = useRef<NodeJS.Timeout>(null);

  const countUp = useCallback(() => {
    setCountTime((prev) => prev + 1);
  }, []);

  useEffect(() => {
    setTime({
      hour: `00${Math.floor(countTime / 60 / 60)}`.slice(-2),
      minutes: `00${Math.floor(countTime / 60)}`.slice(-2),
      seconds: `00${countTime % 60}`.slice(-2),
    });
  }, [countTime]);

  const countStart = useCallback(() => {
    intervalId.current = setInterval(countUp, 1000);
  }, [countUp]);

  const countStop = useCallback(() => {
    if (intervalId.current) clearInterval(intervalId.current);
  }, []);

  const countReset = useCallback(() => {
    if (intervalId.current) {
      clearInterval(intervalId.current);
      setCountTime(0);
      setTime({ hour: '00', minutes: '00', seconds: '00' });
    }
  }, []);

  return { time, countStart, countStop, countReset };
};

export default useCounter;
