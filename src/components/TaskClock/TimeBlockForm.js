import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addEvent } from '@src/store/slices/tasks/tasksSlice';

const TimeBlockForm = () => {
  const [eventType, setEventType] = useState('Start shift');
  const [notes, setNotes] = useState('');
  const dispatch = useDispatch();
  const { selectedDay, selectedTask } = useSelector((state) => state.selected);

  const handleAddEvent = () => {
    const newEvent = {
      type: eventType,
      time: new Date().toISOString(),
      notes,
    };
    dispatch(addEvent({ dayId: selectedDay.id, newEvent, taskName: selectedTask.taskName }));
    setNotes('');
  };

  return (
    <div className="timeBlock-form">
      <select
        value={eventType}
        onChange={(event) => setEventType(event.target.value)}
      >
        <option value="Start shift">Start Shift</option>
        <option value="End shift">End Shift</option>
        <option value="Start break">Start Break</option>
        <option value="End break">End Break</option>
      </select>
      <label>
        Notes
        <textarea
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
        />
      </label>
      <button
        onClick={handleAddEvent}
        className="btn timeBlock-form__button"
      >
        Add Event
      </button>
    </div>
  );
};

export default TimeBlockForm;
