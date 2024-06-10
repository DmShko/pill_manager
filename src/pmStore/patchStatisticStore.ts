import { createSlice } from '@reduxjs/toolkit'

import patchStatisticAPI  from '../API/patchStatisticAPI';

// types
import { patchStatisticInitialState } from '../types/prescriptionTypes';

const patchStatisticSliceInitialState: patchStatisticInitialState = {

  isLoading: false,
  isLoad: false,
  error: '',
 
};

const patchStatisticSlice = createSlice({
  name: 'patchStatistic',
  initialState: patchStatisticSliceInitialState,

  reducers: {

  },

  extraReducers:  
    builder => {
      builder.addCase(patchStatisticAPI.pending, (state) => {
        state.isLoading = true; 
        state.error = '';
        state.isLoad = false;
        
      });
            
      builder.addCase(patchStatisticAPI.fulfilled, (state) => {

        state.isLoading = false;
        state.isLoad = true;
        // some actions with 'action'...
      });
            
      builder.addCase(patchStatisticAPI.rejected, (state, action) => {
                    
        state.isLoading = false;
        state.error = action.payload as string;
        
      });
    },
  }
);

export default patchStatisticSlice.reducer;