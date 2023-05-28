import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addEvent } from '@src/store/slices/classes/classesSlice';

const EventAccordion = ({ onAddTimeBlock }) => {
  const [eventType, setEventType] = useState('Start shift');
  const [notes, setNotes] = useState('');
  const [timestamp, setTimestamp] = useState(
    new Date().toISOString().substring(0, 16),
  );
  const [isOpen, setIsOpen] = useState(false);
  const [eventOptions, setEventOptions] = useState([]);
  const dispatch = useDispatch();
  const { selectedDay, selectedClass } = useSelector((state) => state.selected);
  const { events } = useSelector((state) => state.classes);

  useEffect(() => {
    const filteredEvents = events.filter((event) => {
      if (selectedDay) {
        return event.dayFirebaseId === selectedDay.firebaseId;
      }
    });

    const sortedEvents = [...(filteredEvents[0]?.events || [])].sort((a, b) => {
      return a.timestamp.localeCompare(b.timestamp);
    });

    const lastEvent = sortedEvents[sortedEvents.length - 1];

    let options = [];
    if (!lastEvent || lastEvent.type === 'End shift') {
      options = ['Start shift'];
    } else if (lastEvent.type === 'Start shift') {
      options = ['Start break', 'End shift'];
    } else if (lastEvent.type === 'Start break') {
      options = ['End break'];
    } else if (lastEvent.type === 'End break') {
      options = ['Start break', 'End shift'];
    }
    setEventOptions(options);
    setEventType(options[0]);
  }, [selectedDay, events]);

  const handleAddEvent = (event) => {
    event.preventDefault();

    if (!eventOptions.includes(eventType)) {
      alert('Invalid event sequence');
      return;
    }

    const newEvent = {
      type: eventType,
      timestamp: timestamp || new Date().toISOString(),
      notes,
    };

    if (selectedDay) {
      dispatch(
        addEvent({
          dayFirebaseId: selectedDay.firebaseId,
          newEvent,
          className: selectedClass.className,
        }),
      );
      onAddTimeBlock && onAddTimeBlock(newEvent);
    }

    setNotes('');
    setTimestamp(new Date().toISOString().substring(0, 16));
    setEventType(eventOptions[0]);
  };

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
          <label htmlFor="eventType">Event Type</label>
          <select
            id="eventType"
            value={eventType}
            onChange={(event) => setEventType(event.target.value)}
          >
            {eventOptions.map((option, index) => (
              <option
                key={index}
                value={option}
              >
                {option}
              </option>
            ))}
          </select>

          <div>
            <label htmlFor="eventTime">Event Time:</label>
            <input
              type="time"
              id="eventTime"
              value={timestamp}
              onChange={(e) => setTimestamp(e.target.value)}
            />
          </div>

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
