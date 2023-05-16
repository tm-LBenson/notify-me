import React, { useEffect, useState } from 'react';

const LiveTimer = ({ startTime }) => {
  const [liveTime, setLiveTime] = useState(0);

  useEffect(() => {
    let intervalId;

    if (startTime) {
      intervalId = setInterval(() => {
        const elapsedTime = Math.round(
          (new Date() - new Date(startTime)) / 1000,
        );
        setLiveTime(elapsedTime);
      }, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [startTime]);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;

    return `${h.toString().padStart(2, '0')}:${m
      .toString()
      .padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="live-timer">
      <h2>Timer</h2>
      <p>{formatTime(liveTime)}</p>
    </div>
  );
};

export default LiveTimer;
