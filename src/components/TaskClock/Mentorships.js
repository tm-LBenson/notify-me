import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addEvent,
  addMentoringSession,
  setSelectedMentoringSession,
} from '@src/store/slices/classes/classesSlice';
import { addStudent } from '@src/store/slices/classes/studentSlice';
import { setSelectedStudent as setSelectedStudentRedux } from '@src/store/slices/classes/selectedSlice';

const Mentorships = () => {
  const [studentName, setStudentName] = useState('');
  const [eventType, setEventType] = useState('Start Mentoring Session');
  const [notes, setNotes] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [breakStart, setBreakStart] = useState('');
  const [breakEnd, setBreakEnd] = useState('');
  const [manualInput, setManualInput] = useState(false);
  const [addBreak, setAddBreak] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isAddingStudent, setIsAddingStudent] = useState(false);
  const [isAddingMentoringSession, setIsAddingMentoringSession] =
    useState(false);

  const dispatch = useDispatch();
  const { selectedClass, selectedMentoringSession, selectedDay } = useSelector(
    (state) => state.selected,
  );
  const { students } = useSelector((state) => state.students);
  const mentoringSessions = useSelector((state) =>
    state.classes.classes.flatMap((task) =>
      task.days.flatMap((day) => day.mentoringSessions),
    ),
  );

  const handleAddStudentToggle = () => {
    setIsAddingStudent(!isAddingStudent);
    if (isAddingStudent) {
      setStudentName('');
    }
  };

  const handleSelectStudent = (event) => {
    const selectedSession = mentoringSessions.find(
      (session) => session.studentName === studentName,
    );
    dispatch(setSelectedMentoringSession(selectedSession));
  };

  const handleStudentSelect = (student) => {
    setSelectedStudent(student);
    dispatch(setSelectedStudentRedux(student));
  };

  const handleHeadingClick = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const handleNewStudentSubmit = (event) => {
    event.preventDefault();
    if (studentName.trim() !== '') {
      const newStudent = {
        name: studentName,
      };
      dispatch(addStudent(newStudent));
      dispatch(setSelectedStudentRedux(newStudent));
      setStudentName('');
    }
  };

  const handleAddMentoringSessionToggle = () => {
    setIsAddingStudent(false);
    setIsAddingMentoringSession(!isAddingMentoringSession);
  };

  const handleMentoringSessionSubmit = (event) => {
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
          className: selectedClass.className,
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
    <div className="mentorships">
      <h2
        onClick={handleHeadingClick}
        className={`clickable-heading ${!isOpen ? '' : 'selected-header'}`}
      >
        Mentorships
      </h2>
      {isOpen && (
        <div className="my-sm">
          <div className="student-list">
            <h2>All Students</h2>
            {students.map((student, i) => (
              <div
                key={i}
                onClick={() => handleStudentSelect(student)}
                className={`item ${
                  selectedStudent && selectedStudent.name === student.name
                    ? 'selected'
                    : ''
                }`}
              >
                {student.name}
              </div>
            ))}
          </div>
          {!isAddingMentoringSession &&
            selectedStudent&& (
              <button
                className={`btn new-button ${isAddingStudent ? 'cancel' : ''}`}
                onClick={handleAddStudentToggle}
              >
                {isAddingStudent ? 'Cancel' : 'Add Student'}
              </button>,
            )}
          {isAddingStudent && (
            <form onSubmit={handleNewStudentSubmit}>
              <input
                type="text"
                placeholder="Enter Student Name"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
              />
              <button type="submit">Submit</button>
            </form>
          )}
          {!isAddingStudent && (
            <button
              className={`btn new-button long-button`}
              onClick={handleAddMentoringSessionToggle}
            >
              {isAddingMentoringSession
                ? 'Cancel'
                : 'Add New Mentorship Session'}
            </button>
          )}
          {isAddingMentoringSession && selectedStudent && (
            <form onSubmit={handleMentoringSessionSubmit}>
              {!manualInput && (
                <>
                  <select
                    id="eventType"
                    value={eventType}
                    onChange={(event) => setEventType(event.target.value)}
                  >
                    <option value="Start shift">Start Shift</option>
                    <option value="End shift">End Shift</option>
                    <option value="Start break">Start Break</option>
                    <option value="End break">End Break</option>
                    <option value="Add notes">Add Notes</option>
                  </select>
                  {eventType === 'Add notes' && (
                    <div>
                      <label htmlFor="notes">Notes:</label>
                      <input
                        type="text"
                        id="notes"
                        placeholder="Enter Notes"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                      />
                    </div>
                  )}
                </>
              )}
              <div>
                <label htmlFor="manualInput">
                  Manually Enter Session Data:
                </label>
                <input
                  type="checkbox"
                  id="manualInput"
                  checked={manualInput}
                  onChange={(event) => setManualInput(event.target.checked)}
                />
              </div>
              {manualInput && (
                <>
                  <div>
                    <label htmlFor="startTime">Start Time:</label>
                    <input
                      type="text"
                      id="startTime"
                      placeholder="Enter Start Time"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="endTime">End Time:</label>
                    <input
                      type="text"
                      id="endTime"
                      placeholder="Enter End Time"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="notes">Notes:</label>
                    <input
                      type="text"
                      id="notes"
                      placeholder="Enter Notes"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                    />
                  </div>
                </>
              )}
              <button type="submit">
                {manualInput
                  ? 'Submit Session Data'
                  : 'Start Mentoring Session'}
              </button>
            </form>
          )}
          {selectedMentoringSession && (
            <div>
              <h2>{selectedMentoringSession.topic}</h2>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Mentorships;
