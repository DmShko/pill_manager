import { createSlice } from '@reduxjs/toolkit'

import deleteCoursesAPI  from '../API/deleteCourseAPI';

// types
import { delCoursesInitialState } from '../types/prescriptionTypes';

const delCoursesInitialState: delCoursesInitialState = {

  isLoading: false,
  error: '',
 
};

const deleteCoursesSlice = createSlice({
  name: 'deleteCourses',
  initialState: delCoursesInitialState,

  reducers: {
    
  },

  extraReducers:  
    builder => {
      builder.addCase(deleteCoursesAPI.pending, (state) => {
        state.isLoading = true; state.error = '';
      });
            
      builder.addCase(deleteCoursesAPI.fulfilled, (state, action) => {

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