import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  classes: [],
};

const classesSlice = createSlice({
  name: 'classes',
  initialState,
  reducers: {
    addClass: (state, action) => {
      state.classes.push(action.payload);
    },
    addDay: (state, action) => {
      const classItem = state.classes.find(
        (classItem) => classItem.className === action.payload.className,
      );
      if (classItem) {
        classItem.days.push(action.payload.newDay);
      }
    },
    addEvent: (state, action) => {
      const classItem = state.classes.find(
        (classItem) => classItem.className === action.payload.className,
      );

      if (classItem) {
        const day = classItem.days.find((day) => day.id === action.payload.dayId);

        if (day) {
          day.events.push(action.payload.newEvent);
        }
      }
    },
    addMentoringSession: (state, action) => {
      const classItem = state.classes.find(
        (classItem) => classItem.className === action.payload.className,
      );
      if (classItem) {
        const day = classItem.days.find((day) => day.id === action.payload.dayId);
        if (day) {
          day.mentoringSessions.push(action.payload.mentoringSession);
        }
      }
    },
  },
});

export const { addClass, addDay, addEvent, addMentoringSession } =
  classesSlice.actions;

export default classesSlice.reducer;
