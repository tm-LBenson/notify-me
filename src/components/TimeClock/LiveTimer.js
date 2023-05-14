import React, { useState, useEffect, useRef } from 'react';


const LiveTimer = ({ timerStarted, startTime, totalTime }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  const startTimeRef = useRef(null);


  useEffect(() => {
    startTimeRef.current = startTime;
  }, [startTime]);

  useEffect(() => {
    let intervalId;
    if (timerStarted) {
      intervalId = setInterval(() => {
        setCurrentTime(new Date());
      }, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [timerStarted]);

  const elapsedSeconds = startTime
    ? Math.round((currentTime - new Date(startTime)) / 1000) + totalTime
    : 0;

  return (
    <div className="live-timer">
      <p>Elapsed time: {elapsedSeconds} seconds</p>
    </div>
  );
};

export default LiveTimer;
