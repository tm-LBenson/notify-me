import React from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBTypography } from 'mdb-react-ui-kit';
import { useSelector } from 'react-redux';

export default function Timeline() {
  const { events } = useSelector((state) => state.classes);
  console.log(events);
  const { selectedDay } = useSelector((state) => state.selected);
  const filteredEvents = events.filter((event) => {
    if (selectedDay) {
      return event.dayFirebaseId === selectedDay.firebaseId;
    }
  });

  const sortedEvents = [...(filteredEvents[0]?.events || [])].sort((a, b) => {
    return a.timestamp.localeCompare(b.timestamp);
  });

  return (
    <MDBContainer
      fluid
      className="py-5"
    >
      <MDBRow>
        <MDBCol lg="12">
          <div className="horizontal-timeline">
            <MDBTypography
              listInLine
              className="items"
            >
              {sortedEvents?.map((event, index) => (
                <li
                  key={index}
                  className="items-list"
                >
                  <div className="px-4">
                    <div className="event-date badge bg-info">
                      {event.timestamp}
                    </div>
                    <h5 className="pt-2">{event.type}</h5>
                    <p className="text-muted">
                      <span className="bold">Notes:</span> {event.notes}
                    </p>
                  </div>
                </li>
              ))}
            </MDBTypography>
          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
