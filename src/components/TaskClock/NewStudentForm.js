import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addStudent } from '@src/store/slices/classes/studentSlice';
import { setSelectedStudent } from '@src/store/slices/classes/selectedSlice';

const NewStudentForm = () => {
  const [studentName, setStudentName] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (studentName.trim() !== '') {
      const newStudent = {
        name: studentName,
      };
      dispatch(addStudent(newStudent));
      dispatch(setSelectedStudent(newStudent));
      setStudentName('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={studentName}
        onChange={(e) => setStudentName(e.target.value)}
        placeholder="Enter student's name"
        required
      />
      <button type="submit">Add New Student</button>
    </form>
  );
};

export default NewStudentForm;
