import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedDay } from '@src/store/slices/tasks/selectedSlice';

const DayList = () => {
  const dispatch = useDispatch();
  const { selectedTask } = useSelector((state) => state.selected);

  const handleDaySelect = (day) => {
    dispatch(setSelectedDay(day));
  };

  return (
    <div className="day-list">
      <h2>Days for {selectedTask.taskName}</h2>
      {console.log(selectedTask)}
      {selectedTask.days.length > 0 ? (
        <ul>
          {selectedTask.days.map((day) => (
            <li
              key={day.id}
              onClick={() => handleDaySelect(day)}
            >
              {console.log(day)}
              {day.dayName}
            </li>
          ))}
        </ul>
      ) : (
        <p>No days yet</p>
      )}
    </div>
  );
};

export default DayList;
