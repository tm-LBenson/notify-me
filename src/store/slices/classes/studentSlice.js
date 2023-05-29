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

    addMentoringSession: (state, action) => {
      console.log(action.payload);
      const classItem = state.classes.find(
        (classItem) => classItem.className === action.payload.className,
      );
      if (classItem) {
        const day = classItem.days.find(
          (day) => day.id === action.payload.dayId,
        );
        if (day) {
          day.mentoringSessions.push(action.payload.mentoringSession);
        }
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
