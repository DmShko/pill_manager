import { createSlice } from '@reduxjs/toolkit'

import patchCoursesAPI  from '../API/patchCourseAPI';

// types
import { patchCoursesInitialState } from '../types/prescriptionTypes';

const patchCoursesSliceInitialState: patchCoursesInitialState = {

  isLoading: false,
  error: '',
 
};

const patchCourseSlice = createSlice({
  name: 'patchCourses',
  initialState: patchCoursesSliceInitialState,

  reducers: {
    
  },

  extraReducers:  
    builder => {
      builder.addCase(patchCoursesAPI.pending, (state) => {
        state.isLoading = true; state.error = '';
      });
            
      builder.addCase(patchCoursesAPI.fulfilled, (state) => {

        state.isLoading = false;

        // some actions with 'action'...
      });
            
      builder.addCase(patchCoursesAPI.rejected, (state, action) => {
                    
        state.isLoading = false;

        if(action.payload !== undefined) state.error = action.payload;

      });
    },
  }
);

export default patchCourseSlice.reducer;