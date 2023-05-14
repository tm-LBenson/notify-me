import { createSlice } from '@reduxjs/toolkit';

const initialState = { projects: [] };
const projects = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    getAllProjects: (state, action) => {
      state.projects = action.payload;
    },
    updateProject: (state, action) => {
      const { payload } = action;
      const projectIndex = state.projects.findIndex(
        (project) => project.projectName === payload.projectName,
      );
      if (projectIndex !== -1) {
        state.projects[projectIndex] = payload;
      }
    },
  },
});

export const { getAllProjects, updateProject } = projects.actions;

export default projects.reducer;
