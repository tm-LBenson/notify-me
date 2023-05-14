import React from 'react';
import { formatTime } from './utils/formatTime';

const TotalTimeOutput = ({ totalTime }) => {
  const totalTimeFormatted = formatTime(Math.round(totalTime));

  return (
    <div className="total-time-output">
      <table>
        <thead>
          <tr>
            <th>Days</th>
            <th>Hours</th>
            <th>Minutes</th>
            <th>Seconds</th>
          </tr>
        </thead>
        <tbody>
          <tr>
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

export default TotalTimeOutput;
