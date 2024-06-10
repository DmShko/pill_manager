import { createSlice } from '@reduxjs/toolkit'

import deleteCoursesAPI  from '../API/deleteCourseAPI';

// types
import { delCoursesInitialState } from '../types/prescriptionTypes';

const delCoursesSliceInitialState: delCoursesInitialState = {

  isLoading: false,
  error: '',
 
};

const deleteCoursesSlice = createSlice({
  name: 'deleteCourses',
  initialState: delCoursesSliceInitialState,

  reducers: {
    
  },

  extraReducers:  
    builder => {
      builder.addCase(deleteCoursesAPI.pending, (state) => {
        state.isLoading = true; state.error = '';
      });
            
      builder.addCase(deleteCoursesAPI.fulfilled, (state) => {

        state.isLoading = false;

        // some actions with 'action'...
      });
            
      builder.addCase(deleteCoursesAPI.rejected, (state, action) => {
                    
        state.isLoading = false;

        if(action.payload !== undefined) state.error = action.payload;

      });
    },
  }
);

export default deleteCoursesSlice.reducer;