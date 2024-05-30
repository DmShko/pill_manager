import { createSlice } from '@reduxjs/toolkit'

import deleteStatisticAPI  from '../API/deleteStatisticAPI';

// types
import { deleteStatisticInitialState } from '../types/prescriptionTypes';

const deleteStatisticInitialState: deleteStatisticInitialState = {

  isLoading: false,
  isDelete: false,
  error: '',
 
};

const deleteStatisticSlice = createSlice({
  name: 'deleteStatistic',
  initialState: deleteStatisticInitialState,

  reducers: {
    
  },

  extraReducers:  
    builder => {
      builder.addCase(deleteStatisticAPI.pending, (state) => {
        state.isLoading = true; 
        state.error = '';
        state.isDelete = false;
      });
            
      builder.addCase(deleteStatisticAPI.fulfilled, (state) => {

        state.isLoading = false;
        state.isDelete = true;
        // some actions with 'action'...
      });
            
      builder.addCase(deleteStatisticAPI.rejected, (state, action) => {
        state.isDelete = false;      
        state.isLoading = false;

        if(action.payload !== undefined) state.error = action.payload;

      });
    },
  }
);

export default deleteStatisticSlice.reducer;