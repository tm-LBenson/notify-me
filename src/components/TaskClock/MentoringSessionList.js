import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedMentoringSession } from '@src/store/slices/tasks/selectedSlice';

const MentoringSessionList = () => {
  const dispatch = useDispatch();
  const { selectedDay } = useSelector((state) => state.selected);

  const handleMentoringSessionSelect = (mentoringSession) => {
    dispatch(setSelectedMentoringSession(mentoringSession));
  };

  return (
    <div className="mentoring-session-list">
      <h2>Mentoring Sessions for {selectedDay.date}</h2>
      {selectedDay.mentoringSessions.length > 0 ? (
        <ul>
          {selectedDay.mentoringSessions.map((mentoringSession) => (
            <li
              key={mentoringSession.id}
              onClick={() => handleMentoringSessionSelect(mentoringSession)}
            >
              {mentoringSession.startTime} - {mentoringSession.endTime} with{' '}
              {mentoringSession.studentName}
            </li>
          ))}
        </ul>
      ) : (
        <p>No mentoring sessions yet</p>
      )}
    </div>
  );
};

export default MentoringSessionList;
