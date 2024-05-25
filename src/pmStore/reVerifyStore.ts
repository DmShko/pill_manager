import { createSlice, PayloadAction  } from '@reduxjs/toolkit'

import reVerifyAPI  from '../API/reVerifyAPI';

// types
import { ReVerifyInitialState } from '../types/authTypes';
import { ActionReVerify } from '../types/authTypes';

const reVerifyAPIInitialState: ReVerifyInitialState = {

  isLoading: false,
  message: '',
 
};

const reVerifySlice = createSlice({
  name: 'reVerify',
  initialState: reVerifyAPIInitialState,

  reducers: {
    changeReVerify(state, action: PayloadAction<ActionReVerify>) {
      switch(action.payload.operation){
        case 'clearMessage':
            state.message = '';
            break;
        default: break;
      }
    },
  },

  extraReducers:  
    builder => {
      builder.addCase(reVerifyAPI.pending, (state) => {
        state.isLoading = true; state.message = '';
      });
            
      builder.addCase(reVerifyAPI.fulfilled, (state, action) => {
      
        state.isLoading = false;
        state.message = action.payload.data.message;
        // some actions with 'action'...
      });
            
      builder.addCase(reVerifyAPI.rejected, (state, action) => {
                 
        state.isLoading = false;
        state.message = action.payload as string;
        
      });
    },
  }
);

export const {
    changeReVerify
} = reVerifySlice.actions;

export default reVerifySlice.reducer;