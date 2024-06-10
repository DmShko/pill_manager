import { createSlice } from '@reduxjs/toolkit'

import addStatisticAPI  from '../API/addStatisticAPI';

// types
import { addStatisticInitialState } from '../types/prescriptionTypes';

const addStatisticSliceInitialState: addStatisticInitialState = {

  isLoading: false,
  isLoad: false,
  error: '',
 
};

const addStatisticSlice = createSlice({
  name: 'addStatistic',
  initialState: addStatisticSliceInitialState,

  reducers: {
    
  },

  extraReducers:  
    builder => {
      builder.addCase(addStatisticAPI.pending, (state) => {
        state.isLoading = true; 
        state.error = '';
        state.isLoad = false;
      });
            
      builder.addCase(addStatisticAPI.fulfilled, (state) => {

        state.isLoading = false;
        state.isLoad = true;
        // some actions with 'action'...
      });
            
      builder.addCase(addStatisticAPI.rejected, (state, action) => {
                    
        state.isLoading = false;

        if(action.payload !== undefined) state.error = action.payload;

      });
    },
  }
);

export default addStatisticSlice.reducer;