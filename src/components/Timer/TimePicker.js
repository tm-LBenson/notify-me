import React, { useState } from 'react';

const TimePicker = ({ onTimeChange }) => {
  const now = new Date();
  const hours = ('0' + now.getHours()).slice(-2);
  const minutes = ('0' + now.getMinutes()).slice(-2);
  const timeString = `${hours}:${minutes}`;

  const [time, setTime] = useState(timeString);

  const handleTimeChange = (event) => {
    const newTime = event.target.value;
    setTime(newTime);
    onTimeChange(newTime);
  };

  return (
    <div className="time-picker">
      <label htmlFor="time">Select a time:</label>
      <input
        type="time"
        id="time"
        name="time"
        value={time}
        onChange={handleTimeChange}
      />
    </div>
  );
};

export default TimePicker;
