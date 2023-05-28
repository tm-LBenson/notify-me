import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  classes: [],
  days: [],
  events: [],
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
    getAllEvents: (state, action) => {
      state.events = action.payload;
    },

    addEvent: (state, action) => {
      if (action.payload?.newTimeBlock?.data) {
        const day = state.events.find(
          (event) => event.dayFirebaseId === action.payload.day.firebaseId,
        );


        if (day) {
          day.events.push(action.payload.newTimeBlock.data);
        } else if (action?.payload?.day.firebaseId) {
          state.events.push({
            firebaseId: action.payload.day.firebaseId,
            dayFirebaseId: action.payload.day.firebaseId,
            events: [action.payload.newTimeBlock.data],
          });
        }
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
  getAllDays,
  getAllEvents,
  getAllClasses,
} = classesSlice.actions;

export default classesSlice.reducer;
