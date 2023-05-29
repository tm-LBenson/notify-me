import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addMentoringSession } from '@src/store/slices/classes/classesSlice';
import {
  addStudent,
  getAllStudents,
} from '@src/store/slices/classes/studentSlice';

const Mentorships = () => {
  const dispatch = useDispatch();
  const { students } = useSelector((state) => state.students);
  const { mentorSessions } = useSelector((state) => state.students);

  const [isOpen, setIsOpen] = useState(false);
  const [studentName, setStudentName] = useState('');
  const [isAddingMentoringSession, setIsAddingMentoringSession] =
    useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [notes, setNotes] = useState('');
  const [timestamp, setTimestamp] = useState('');
  const [eventType, setEventType] = useState('');
  const [eventOptions, setEventOptions] = useState(['Start Mentoring Session']);
  const [newStudentForm, setNewStudentForm] = useState(false);
  useEffect(() => {
    dispatch(getAllStudents());
  }, [dispatch]);
  useEffect(() => {
    const filteredEvents = mentorSessions.filter((event) => {
      if (selectedStudent) {
        return event.studentId === selectedStudent.id;
      }
    });

    const sortedEvents = [...filteredEvents].sort((a, b) => {
      return a.timestamp.localeCompare(b.timestamp);
    });

    const lastEvent = sortedEvents[sortedEvents.length - 1];

    let options = [];
    if (!lastEvent || lastEvent.type === 'End Mentoring Session') {
      options = ['Start Mentoring Session'];
    } else if (
      lastEvent.type === 'Start Mentoring Session' ||
      lastEvent.type === 'Add notes'
    ) {
      options = ['Add notes', 'End Mentoring Session'];
    }
    setEventOptions(options);
    setEventType(options[0]);
  }, [selectedStudent, mentorSessions]);

  const handleNewStudentSubmit = (event) => {
    event.preventDefault();
    setNewStudentForm(false);
    if (studentName.trim() !== '') {
      const newStudent = {
        name: studentName,
      };
      dispatch(addStudent(newStudent));
      setStudentName('');
    }
  };

  const handleMentoringSessionSubmit = (event) => {
    event.preventDefault();

    const newSession = {
      type: eventType,
      notes,
      timestamp: timestamp || new Date().toISOString().substring(11, 16),
      studentId: selectedStudent.id,
    };

    dispatch(addMentoringSession(newSession));

    setEventType('');
    setNotes('');
    setTimestamp('');
  };
  return (
    <div className="mentorships">
      <h2
        onClick={() => setIsOpen(!isOpen)}
        className={`clickable-heading ${isOpen ? 'selected-header' : ''}`}
      >
        Mentorships
      </h2>
      {isOpen && (
        <>
          <div className="my-sm">
            <div className="student-list">
              <h2>All Students</h2>
              {students.map((student, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedStudent(student)}
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
            {selectedStudent && (
              <button
                onClick={() =>
                  setIsAddingMentoringSession(!isAddingMentoringSession)
                }
              >
                {isAddingMentoringSession
                  ? 'Cancel'
                  : 'Add New Mentorship Session'}
              </button>
            )}
            {isAddingMentoringSession && (
              <form onSubmit={handleMentoringSessionSubmit}>
                <select
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                >
                  {eventOptions.map((option, index) => (
                    <option
                      value={option}
                      key={index}
                    >
                      {option}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="Notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
                <input
                  type="time"
                  value={timestamp}
                  onChange={(e) => setTimestamp(e.target.value)}
                />
                <button type="submit">Submit</button>
              </form>
            )}
            <button
              className={`btn new-button ${newStudentForm ? 'cancel' : ''}`}
              onClick={() => {
                setNewStudentForm(!newStudentForm);
              }}
            >
              {!newStudentForm ? 'Add Student' : 'Cancel'}
            </button>
            {newStudentForm && (
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
          </div>
        </>
      )}
    </div>
  );
};

export default Mentorships;
