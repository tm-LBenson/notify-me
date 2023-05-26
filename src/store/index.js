import { configureStore } from '@reduxjs/toolkit';

import loggerMiddleware from './middleware/logger';
import projects from './slices/projects';
import selectedProject from './slices/selectedProject';
import classesSlice from './slices/classes/classesSlice';
import selectedSlice from './slices/classes/selectedSlice';
import studentSlice from './slices/classes/studentSlice';
const store = configureStore({
  reducer: {
    projects,
    selectedProject,
    classes: classesSlice,
    selected: selectedSlice,
    students: studentSlice,
  },

  middleware: [loggerMiddleware],
});

export default store;
