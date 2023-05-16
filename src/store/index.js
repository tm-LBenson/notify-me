import { configureStore } from '@reduxjs/toolkit';

import loggerMiddleware from './middleware/logger';
import projects from './slices/projects';
import selectedProject from './slices/selectedProject';
import taskSlice from './slices/tasks/tasksSlice';
import selectedSlice from './slices/tasks/selectedSlice';
import studentSlice from './slices/tasks/studentSlice';
const store = configureStore({
  reducer: {
    projects,
    selectedProject,
    tasks: taskSlice,
    selected: selectedSlice,
    students: studentSlice,
  },

  middleware: [loggerMiddleware],
});

export default store;
