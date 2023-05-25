import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedStudent } from '@src/store/slices/classes/selectedSlice';

const StudentView = () => {
  const dispatch = useDispatch();
  const { students } = useSelector((state) => state.students);

  const handleStudentSelect = (student) => {
    dispatch(setSelectedStudent(student));
  };

  return (
    <div className="student-list">
      <h2>All Students</h2>
      {students.length > 0 ? (
        <ul>
          {students.map((student) => (
            <li
              key={student.name}
              onClick={() => handleStudentSelect(student)}
            >
              {student.name}
            </li>
          ))}
        </ul>
      ) : (
        <p>No students yet</p>
      )}
    </div>
  );
};

export default StudentView;
