import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  students: [],
};

const studentsSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    addStudent: (state, action) => {
      state.students.push(action.payload);
    },
  },
});

export const { addStudent } = studentsSlice.actions;

export default studentsSlice.reducer;
