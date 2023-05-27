import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addEvent,
  setSelectedEvent,
} from '@src/store/slices/classes/classesSlice';

const EventAccordion = ({ onAddTimeBlock }) => {
  const [eventType, setEventType] = useState('Start shift');
  const [notes, setNotes] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [breakStartTime, setBreakStartTime] = useState('');
  const [breakEndTime, setBreakEndTime] = useState('');
  const [manualInput, setManualInput] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();
  const { selectedDay, selectedClass } = useSelector((state) => state.selected);

  const handleAddEvent = (event) => {
    event.preventDefault();
    const newEvent = {
      type: eventType,
      startTime: manualInput ? startTime : new Date().toISOString(),
      endTime: manualInput ? endTime : '',
      breakStartTime: manualInput ? breakStartTime : '',
      breakEndTime: manualInput ? breakEndTime : '',
      notes,
    };
    if (selectedDay) {
      dispatch(
        addEvent({
          dayId: selectedDay.id,
          newEvent,
          className: selectedClass.className,
        }),
      );
      onAddTimeBlock && onAddTimeBlock(newEvent);
    }
    setNotes('');
    setStartTime('');
    setEndTime('');
    setBreakStartTime('');
    setBreakEndTime('');
    setIsOpen(false);
  };

  const handleEventSelect = (event) => {
    dispatch(setSelectedEvent(event));
  };

  const sortedEvents = selectedDay
    ? [...selectedDay.events].sort((a, b) => a.time - b.time)
    : [];

  return (
    <div className="accordion">
      <h2
        onClick={() => setIsOpen(!isOpen)}
        className={`clickable-heading ${!isOpen ? '' : 'selected-header'}`}
      >
        {selectedDay ? `Events for ${selectedDay.dayName}` : 'Add Event'}
      </h2>

      {isOpen && (
        <form onSubmit={handleAddEvent}>
          {!manualInput && (
            <>
              <label htmlFor="eventType">Event Type</label>
              <select
                id="eventType"
                value={eventType}
                onChange={(event) => setEventType(event.target.value)}
              >
                <option value="Start shift">Start Shift</option>
                <option value="End shift">End Shift</option>
                <option value="Start break">Start Break</option>
                <option value="End break">End Break</option>
              </select>
            </>
          )}
          <div className="manual-input">
            <label htmlFor="manualInput">Manually Enter Event Time:</label>
            <input
              type="checkbox"
              id="manualInput"
              checked={manualInput}
              onChange={(event) => setManualInput(event.target.checked)}
            />
          </div>
          {manualInput && (
            <div>
              <label htmlFor="startTime">Start Time:</label>
              <input
                type="text"
                id="startTime"
                placeholder="Enter Start Time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />

              <label htmlFor="endTime">End Time:</label>
              <input
                type="text"
                id="endTime"
                placeholder="Enter End Time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />

              <label htmlFor="breakStartTime">Break Start Time:</label>
              <input
                type="text"
                id="breakStartTime"
                placeholder="Enter Break Start Time"
                value={breakStartTime}
                onChange={(e) => setBreakStartTime(e.target.value)}
              />

              <label htmlFor="breakEndTime">Break End Time:</label>
              <input
                type="text"
                id="breakEndTime"
                placeholder="Enter Break End Time"
                value={breakEndTime}
                onChange={(e) => setBreakEndTime(e.target.value)}
              />
            </div>
          )}
          <label htmlFor="notes">Notes:</label>
          <textarea
            id="notes"
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
          />
          <button
            type="submit"
            className="btn timeBlock-form__button"
          >
            Add Event
          </button>
        </form>
      )}
    </div>
  );
};

export default EventAccordion;
