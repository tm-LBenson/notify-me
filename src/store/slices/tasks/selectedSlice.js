import { createSlice } from '@reduxjs/toolkit';
import { addDay, addEvent } from './tasksSlice';

const initialState = {
  selectedTask: null,
  selectedDay: null,
  selectedEvent: null,
  selectedMentoringSession: null,
  selectedStudent: null,
};

const selectedSlice = createSlice({
  name: 'selected',
  initialState,
  reducers: {
    setSelectedTask: (state, action) => {
      state.selectedTask = action.payload;
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
          state.selectedTask &&
          state.selectedTask.taskName === action.payload.taskName
        ) {
          state.selectedTask.days.push(action.payload.newDay);
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
  setSelectedTask,
  setSelectedDay,
  setSelectedEvent,
  setSelectedMentoringSession,
  setSelectedStudent,
} = selectedSlice.actions;

export default selectedSlice.reducer;
