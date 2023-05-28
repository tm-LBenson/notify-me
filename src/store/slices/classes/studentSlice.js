import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  students: [],
  mentorSessions: [],
};

const studentsSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    addStudent: (state, action) => {
      state.students.push(action.payload);
    },
    getAllStudents: (state, action) => {
      state.students = action.payload;
    },
    addMentoringSession: (state, action) => {
      state.mentorSessions.push(action.payload);
    },
    getAllMentoringSession: (state, action) => {
      state.mentorSessions = action.payload;
    },
  },
});

export const {
  addStudent,
  getAllStudents,
  addMentoringSession,
  getAllMentoringSession,
} = studentsSlice.actions;

export default studentsSlice.reducer;
