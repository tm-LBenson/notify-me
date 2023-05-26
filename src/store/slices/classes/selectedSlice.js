import { createSlice } from '@reduxjs/toolkit';
import { addDay, addEvent } from './classesSlice';

const initialState = {
  selectedClass: null,
  selectedDay: null,
  selectedEvent: null,
  selectedMentoringSession: null,
  selectedStudent: null,
};

const selectedSlice = createSlice({
  name: 'selected',
  initialState,
  reducers: {
    setSelectedClass: (state, action) => {
      state.selectedClass = action.payload;
      state.selectedDay = null;
      state.selectedEvent = null;
      state.selectedMentoringSession = null;
    },
    setSelectedDay: (state, action) => {
      state.selectedDay = action.payload;
      state.selectedEvent = null;
      state.selectedMentoringSession = null;
    },
    setSelectedEvent: (state, action) => {
      state.selectedEvent = action.payload;
      state.selectedMentoringSession = null;
    },
    setSelectedMentoringSession: (state, action) => {
      state.selectedMentoringSession = action.payload;
    },
    setSelectedStudent: (state, action) => {
      state.selectedStudent = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addDay, (state, action) => {
        if (
          state.selectedClass &&
          state.selectedClass.className === action.payload.className
        ) {
          state.selectedClass.days.push(action.payload.newDay);
          state.selectedDay = action.payload.newDay;
        }
      })
      .addCase(addEvent, (state, action) => {
        if (
          state.selectedDay &&
          state.selectedDay.id === action.payload.dayId
        ) {
          state.selectedDay.events.push(action.payload.newEvent);
          state.selectedEvent = action.payload.newEvent;
        }
      });
  },
});

export const {
  setSelectedClass,
  setSelectedDay,
  setSelectedEvent,
  setSelectedMentoringSession,
  setSelectedStudent,
} = selectedSlice.actions;

export default selectedSlice.reducer;
