import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: [],
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    addDay: (state, action) => {
      const task = state.tasks.find(
        (task) => task.taskName === action.payload.taskName,
      );
      if (task) {
        task.days.push(action.payload.newDay);
      }
    },
    addEvent: (state, action) => {
      const task = state.tasks.find(
        (task) => task.taskName === action.payload.taskName,
      );

      if (task) {
        const day = task.days.find((day) => day.id === action.payload.dayId);

        if (day) {
          day.events.push(action.payload.newEvent);
        }
      }
    },
    addMentoringSession: (state, action) => {
      const task = state.tasks.find(
        (task) => task.taskName === action.payload.taskName,
      );
      if (task) {
        const day = task.days.find((day) => day.id === action.payload.dayId);
        if (day) {
          day.mentoringSessions.push(action.payload.mentoringSession);
        }
      }
    },
  },
});

export const { addTask, addDay, addEvent, addMentoringSession } =
  tasksSlice.actions;

export default tasksSlice.reducer;
