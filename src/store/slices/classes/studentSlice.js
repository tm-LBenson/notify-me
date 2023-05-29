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
      console.log(action.payload);
      const student = state.students.find(
        (student) => student.classFirebaseId === action.payload.classFirebaseId,
      );
      if (student) {
        day.mentoringSessions.push(action.payload.mentoringSession);
      }
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
