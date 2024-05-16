import { createSlice } from '@reduxjs/toolkit'

import logoutAPI  from '../API/logoutAPI';

// types
import { logoutInitialState } from '../types/authTypes';

const singInSliceInitialState: logoutInitialState = {

  isLoading: false,
  error: '',
  message: '',
 
};

const logoutSlice = createSlice({
  name: 'logout',
  initialState: singInSliceInitialState,

  reducers: {
    
  },

  extraReducers:  
    builder => {
      builder.addCase(logoutAPI.pending, (state) => {
        state.isLoading = true; state.error = '';
      });
            
      builder.addCase(logoutAPI.fulfilled, (state, action) => {

        state.isLoading = false;
        state.message = action.payload.message;

        // some actions with 'action'...
      });
            
      builder.addCase(logoutAPI.rejected, (state, action) => {
                    
        state.isLoading = false;
        state.error = action.payload as string;
        
      });
    },
  }
);

export default logoutSlice.reducer;