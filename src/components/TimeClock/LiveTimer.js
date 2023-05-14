import React, { useState, useEffect, useRef } from 'react';
import { formatTime } from './utils/formatTime';
const LiveTimer = ({ timerStarted, startTime, totalTime }) => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const startTimeRef = useRef(null);

  useEffect(() => {
    startTimeRef.current = startTime;
  }, [startTime]);

  useEffect(() => {
    let intervalId;
    if (timerStarted) {
      intervalId = setInterval(() => {
        const elapsedSec = startTimeRef.current
          ? (new Date() - new Date(startTimeRef.current)) / 1000
          : 0;
        setElapsedTime(elapsedSec);
      }, 1000);
    } else {
      setElapsedTime(0);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [timerStarted]);

  const elapsedTimeFormatted = formatTime(Math.round(elapsedTime));
  const totalTimeFormatted = formatTime(Math.round(totalTime));

  return (
    <div className="live-timer">
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Days</th>
            <th>Hours</th>
            <th>Minutes</th>
            <th>Seconds</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Elapsed time</td>
            <td>{elapsedTimeFormatted.days}</td>
            <td>{elapsedTimeFormatted.hours}</td>
            <td>{elapsedTimeFormatted.minutes}</td>
            <td>{elapsedTimeFormatted.seconds}</td>
          </tr>
          <tr>
            <td>Total time</td>
            <td>{totalTimeFormatted.days}</td>
            <td>{totalTimeFormatted.hours}</td>
            <td>{totalTimeFormatted.minutes}</td>
            <td>{totalTimeFormatted.seconds}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default LiveTimer;
