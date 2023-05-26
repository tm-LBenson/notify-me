import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addEvent,
  setSelectedEvent,
} from '@src/store/slices/classes/classesSlice';

const EventAccordion = ({ onAddTimeBlock }) => {
  const [eventType, setEventType] = useState('Start shift');
  const [notes, setNotes] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const { selectedDay, selectedClass } = useSelector((state) => state.selected);

  const handleAddEvent = (event) => {
    event.preventDefault();
    const newEvent = {
      type: eventType,
      time: new Date().toISOString(),
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
        <div className="accordion-content open">
          {sortedEvents.length > 0 ? (
            sortedEvents.map((event) => (
              <div
                onClick={() => handleEventSelect(event)}
                key={event.id}
                className="item"
              >
                {event.type}: {event.time}
              </div>
            ))
          ) : (
            <p>No events yet</p>
          )}
          <div className="new-button-container">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`btn new-button ${isOpen ? 'cancel' : ''}`}
            >
              {isOpen ? 'Cancel' : 'Add Event'}
            </button>

            {isOpen && (
              <form onSubmit={handleAddEvent}>
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
                <label htmlFor="notes">Notes</label>
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
        </div>
      )}
    </div>
  );
};

export default EventAccordion;
