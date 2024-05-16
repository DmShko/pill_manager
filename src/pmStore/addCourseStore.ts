import { createSlice } from '@reduxjs/toolkit'

import addCourseAPI  from '../API/addCourseAPI';

// types
import { addCourseInitialState } from '../types/prescriptionTypes';

const addCourseSliceInitialState: addCourseInitialState = {

  isLoading: false,
  error: '',
  token: '',
 
};

const addCourseSlice = createSlice({
  name: 'addCourse',
  initialState: addCourseSliceInitialState,

  reducers: {
    
  },

  extraReducers:  
    builder => {
      builder.addCase(addCourseAPI.pending, (state) => {
        state.isLoading = true; state.error = '';
      });
            
      builder.addCase(addCourseAPI.fulfilled, (state, action) => {

        state.isLoading = false;
        state.token = action.payload.data.token;

        // some actions with 'action'...
      });
            
      builder.addCase(addCourseAPI.rejected, (state, action) => {
                    
        state.isLoading = false;
        state.error = action.payload as string;
        
      });
    },
  }
);

export default addCourseSlice.reducer;