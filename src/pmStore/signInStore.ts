import { createSlice } from '@reduxjs/toolkit'

import singInAPI  from '../API/signInAPI';

// types
import { singInInitialState } from '../types/authTypes';

const singInSliceInitialState: singInInitialState = {

  isLoading: false,
  error: '',
  token: '',
 
};

const singInSlice = createSlice({
  name: 'singIn',
  initialState: singInSliceInitialState,

  reducers: {
    
  },

  extraReducers:  
    builder => {
      builder.addCase(singInAPI.pending, (state) => {
        state.isLoading = true; state.error = '';
      });
            
      builder.addCase(singInAPI.fulfilled, (state, action) => {

        state.isLoading = false;
        state.token = action.payload.data.token;

        // some actions with 'action'...
      });
            
      builder.addCase(singInAPI.rejected, (state, action) => {
                    
        state.isLoading = false;
        state.error = action.payload as string;
        
      });
    },
  }
);

export default singInSlice.reducer;