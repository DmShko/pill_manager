import { createSlice } from '@reduxjs/toolkit'

import allStatisticAPI  from '../API/allStatisticAPI';

// types
import { allStatisticInitialState } from '../types/prescriptionTypes';

const getStatisticInitialState: allStatisticInitialState = {

  statistics: [],
  isLoad: false,
  isLoading: false,
  error: '',
 
};

const getStatisticSlice = createSlice({
  name: 'allStatistic',
  initialState: getStatisticInitialState,

  reducers: {
    
  },

  extraReducers:  
    builder => {
      builder.addCase(allStatisticAPI.pending, (state) => {
        state.isLoading = true; state.error = '';
        state.isLoad = false;
      });
            
      builder.addCase(allStatisticAPI.fulfilled, (state, action) => {

        state.isLoading = false;
        state.isLoad = true;
        state.statistics = action.payload.data;
        // some actions with 'action'...
      });
            
      builder.addCase(allStatisticAPI.rejected, (state, action) => {
                    
        state.isLoading = false;

        if(action.payload !== undefined) state.error = action.payload;

      });
    },
  }
);

export default getStatisticSlice.reducer;