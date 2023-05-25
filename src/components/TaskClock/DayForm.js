import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addDay } from '@src/store/slices/classes/classesSlice';
import { setSelectedClass } from '@src/store/slices/classes/selectedSlice';

const DayForm = () => {
  const [dayName, setDayName] = useState(
    new Date().toLocaleDateString('en-US'),
  );
  const dispatch = useDispatch();
  const { selectedClass } = useSelector((state) => state.selected);

  const handleSubmit = (event) => {
    event.preventDefault();

    const newDay = {
      id: crypto.randomUUID(),
      dayName,
      events: [],
      mentoringSessions: [],
    };
    dispatch(addDay({ className: selectedClass.className, newDay }));
  };

  const handleChange = (event) => {
    setDayName(event.target.value);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="day-form"
    >
      <input
        type="date"
        placeholder={new Date().toLocaleDateString('en-US')}
        onChange={handleChange}
        required
      />
      <button
        type="submit"
        className="btn day-form__button"
      >
        Add Day
      </button>
    </form>
  );
};

export default DayForm;
