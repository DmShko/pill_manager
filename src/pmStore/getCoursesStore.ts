import { createSlice } from '@reduxjs/toolkit'

import getCoursesAPI  from '../API/getCoursesAPI';

// types
import { getCoursesInitialState } from '../types/prescriptionTypes';

const getCoursesSliceInitialState: getCoursesInitialState = {

  freshCourses: [],
  isLoading: false,
  error: '',
 
};

const getCoursesSlice = createSlice({
  name: 'getCourses',
  initialState: getCoursesSliceInitialState,

  reducers: {
    
  },

  extraReducers:  
    builder => {
      builder.addCase(getCoursesAPI.pending, (state) => {
        state.isLoading = true; state.error = '';
      });
            
      builder.addCase(getCoursesAPI.fulfilled, (state, action) => {

        state.isLoading = false;

        const reloadCourses = action.payload;
    
        if(reloadCourses.data !== undefined) state.freshCourses = reloadCourses.data;

        // some actions with 'action'...
      });
            
      builder.addCase(getCoursesAPI.rejected, (state, action) => {
                    
        state.isLoading = false;

        if(action.payload !== undefined) state.error = action.payload;

      });
    },
  }
);

export default getCoursesSlice.reducer;