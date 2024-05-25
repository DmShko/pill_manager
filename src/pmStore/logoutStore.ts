import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import logoutAPI  from '../API/logoutAPI';

// types
import { LogoutInitialState } from '../types/authTypes';
import { ActionLogout } from '../types/authTypes';

const singInSliceInitialState: LogoutInitialState = {

  isLogout: false,
  isLoading: false,
  message: '',
 
};

const logoutSlice = createSlice({
  name: 'logout',
  initialState: singInSliceInitialState,

  reducers: {

    changeLogout(state, action: PayloadAction<ActionLogout>) {
      switch(action.payload.operation){
        case 'clearMessage':
            state.message = '';
            break;
        case 'changeIsLogout':
            state.isLogout = (action.payload.data as boolean);
            break;
        default: break;
      }
    },

  },

  extraReducers:  
    builder => {
      builder.addCase(logoutAPI.pending, (state) => {
        state.isLoading = true; state.message = ''; state.isLogout = false;
      });
            
      builder.addCase(logoutAPI.fulfilled, (state) => {

        state.isLoading = false;
        state.isLogout = true;
        state.message = 'Come in again';

        // some actions with 'action'...
      });
            
      builder.addCase(logoutAPI.rejected, (state, action) => {
                    
        state.isLoading = false;
        state.isLogout = false;
        state.message = action.payload as string;
        
      });
    },
  }
);

export const {
  changeLogout
} = logoutSlice.actions;

export default logoutSlice.reducer;