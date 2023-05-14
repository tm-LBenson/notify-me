import React from 'react';

const formatTime = (totalSeconds) => {
  if (totalSeconds < 60) {
    return `${totalSeconds} seconds`;
  }

  const totalMinutes = totalSeconds / 60;
  if (totalMinutes < 60) {
    return `${totalMinutes.toFixed(0)} minutes`;
  }

  const totalHours = totalMinutes / 60;
  if (totalHours < 24) {
    return `${totalHours.toFixed(0)} hours`;
  }

  const totalDays = totalHours / 24;
  return `${totalDays.toFixed(0)} days`;
};

const TotalTimeOutput = ({ totalTime }) => {
  return <p>Total time: {formatTime(totalTime)}</p>;
};

export default TotalTimeOutput;
