import { configureStore } from '@reduxjs/toolkit';

import loggerMiddleware from './middleware/logger';
import projects from './slices/projects';
import selectedProject from './slices/selectedProject';
const store = configureStore({
  reducer: {
    projects,
    selectedProject,
  },

  middleware: [loggerMiddleware],
});

export default store;
