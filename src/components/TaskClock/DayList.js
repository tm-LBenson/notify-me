import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedDay } from '@src/store/slices/classes/selectedSlice';

const DayList = () => {
  const dispatch = useDispatch();
  const { selectedClass,selectedDay  } = useSelector((state) => state.selected);

  const handleDaySelect = (day) => {
    dispatch(setSelectedDay(day));
  };

  return (
    <div className="day-list">
      <h2>Days for {selectedClass.className}</h2>
      {console.log(selectedClass)}
      {selectedClass.days.length > 0 ? (
        <ul>
     {selectedClass.days.map((day) => (
  <li
    key={day.id}
    onClick={() => handleDaySelect(day)}
    className={selectedDay && selectedDay.id === day.id ? 'selected' : ''}
  >
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
