import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addEvent,
  addMentoringSession,
} from '@src/store/slices/tasks/tasksSlice';

const MentoringSessionForm = () => {
  const [eventType, setEventType] = useState('Start Mentoring Session');
  const [notes, setNotes] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [breakStart, setBreakStart] = useState('');
  const [breakEnd, setBreakEnd] = useState('');
  const [manualInput, setManualInput] = useState(false);
  const [addBreak, setAddBreak] = useState(false);
  const dispatch = useDispatch();
  const { selectedTask, selectedMentoringSession, selectedDay } = useSelector(
    (state) => state.selected,
  );
  const mentoringSessions = useSelector((state) =>
    state.tasks.tasks.flatMap((task) =>
      task.days.flatMap((day) => day.mentoringSessions),
    ),
  );

  const handleSelectStudent = (event) => {
    const selectedSession = mentoringSessions.find(
      (session) => session.studentName === studentName,
    );
    dispatch(setSelectedMentoringSession(selectedSession));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newMentoringSession = {
      notes,
      startTime: manualInput ? startTime : new Date().toISOString(),
      endTime: manualInput ? endTime : null,
      breakStart: addBreak && manualInput ? breakStart : null,
      breakEnd: addBreak && manualInput ? breakEnd : null,
    };
    dispatch(
      addMentoringSession({ dayId: selectedDay.id, newMentoringSession }),
    );

    if (!manualInput) {
      const mentoringSessionEvent = {
        type: eventType,
        time: new Date().toISOString(),
        relatedSession: newMentoringSession,
      };
      dispatch(
        addEvent({
          dayId: selectedDay.id,
          newEvent: mentoringSessionEvent,
          taskName: selectedTask.taskName,
        }),
      );
    }

    setNotes('');
    setStartTime('');
    setEndTime('');
    setBreakStart('');
    setBreakEnd('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mentoringSession-form"
    >
      <select
        value={selectedMentoringSession?.studentName}
        onChange={handleSelectStudent}
      >
        {console.log(mentoringSessions)}
        {mentoringSessions.map((session) => (
          <option
            key={session.studentName}
            value={session.studentName}
          >
            {session.studentName}
          </option>
        ))}
      </select>

      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Enter notes"
      />
      <div>
        <label>
          <input
            type="checkbox"
            checked={manualInput}
            onChange={() => setManualInput(!manualInput)}
          />
          Manual Time Input
        </label>
      </div>
      {manualInput && (
        <>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            placeholder="Enter start time"
            required
          />
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            placeholder="Enter end time"
            required
          />
          <div>
            <label>
              <input
                type="checkbox"
                checked={addBreak}
                onChange={() => setAddBreak(!addBreak)}
              />
              Add Break
            </label>
          </div>
          {addBreak && (
            <>
              <input
                type="time"
                value={breakStart}
                onChange={(e) => setBreakStart(e.target.value)}
                placeholder="Enter break start time"
                required
              />
              <input
                type="time"
                value={breakEnd}
                onChange={(e) => setBreakEnd(e.target.value)}
                placeholder="Enter break end time"
                required
              />
            </>
          )}
        </>
      )}
      <button
        type="submit"
        className="btn mentoringSession-form__button"
      >
        {manualInput ? 'Submit' : 'Start Mentoring Session'}
      </button>
    </form>
  );
};

export default MentoringSessionForm;
