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
});

export const {
  setSelectedClass,
  setSelectedDay,
  setSelectedEvent,
  setSelectedMentoringSession,
  setSelectedStudent,
} = selectedSlice.actions;

export default selectedSlice.reducer;
