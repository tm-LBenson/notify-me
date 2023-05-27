import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  classes: [],
  days: [],
};

const classesSlice = createSlice({
  name: 'classes',
  initialState,
  reducers: {
    addClass: (state, action) => {
      state.classes.push({
        ...action.payload,
        firebaseId: action.payload.firebaseId,
      });
    },

    getAllClasses: (state, action) => {
      state.classes = action.payload;
    },
    getAllDays: (state, action) => {
      state.days = action.payload;
    },
    addDay: (state, action) => {
      const classItem = state.classes.find(
        (classItem) => classItem.className === action.payload.className,
      );
      if (classItem) {
        classItem.days.push(action.payload.newDay.id);
      }
    },
    addEvent: (state, action) => {
      const dayItem = state.days.find(
        (dayItem) => dayItem.id === action.payload.dayId,
      );

      if (dayItem) {
        dayItem.events.push(action.payload.newEvent);
      }
    },

    addMentoringSession: (state, action) => {
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
  addClass,
  addDay,
  setFirebaseId,
  addEvent,
  addMentoringSession,
  getAllClasses,
} = classesSlice.actions;

export default classesSlice.reducer;
