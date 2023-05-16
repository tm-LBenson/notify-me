import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedEvent } from '@src/store/slices/tasks/selectedSlice';

const EventList = () => {
  const dispatch = useDispatch();
  const { selectedDay } = useSelector((state) => state.selected);

  const handleEventSelect = (event) => {
    dispatch(setSelectedEvent(event));
  };

  // Sort events by time
  {console.log(selectedDay.events)}
  const sortedEvents = [...selectedDay.events].sort((a, b) => a.time - b.time);

  return (
    <div className="event-list">
      <h2>Events for {selectedDay.date}</h2>
      {sortedEvents.length > 0 ? (
        <ul>
          {sortedEvents.map((event) => (
            <li
              key={event.id}
              onClick={() => handleEventSelect(event)}
            >
              {event.type}: {event.time}
            </li>
          ))}
        </ul>
      ) : (
        <p>No events yet</p>
      )}
    </div>
  );
};

export default EventList;
