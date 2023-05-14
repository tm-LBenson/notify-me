import { createSlice } from '@reduxjs/toolkit';

const initialState = { selectedProject: null };
const selectedProjects = createSlice({
  name: 'selectedProjects',
  initialState,
  reducers: {
    setSelectedProject: (state, action) => {
      state.selectedProject = action.payload;
    },
  },
});

export const { setSelectedProject } = selectedProjects.actions;

export default selectedProjects.reducer;
