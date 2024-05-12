import { createSlice } from '@reduxjs/toolkit'

import singUpAPI  from '../API/signUpAPI';

// types
import { singUpInitialState } from '../types/authType';

const singUpSliceInitialState: singUpInitialState = {

  isLoading: false,
  error: '',
  email:'',
  userName:'',
 
};

const singUpSlice = createSlice({
  name: 'singUp',
  initialState: singUpSliceInitialState,

  reducers: {
    changeSingUp(state, action) {
      switch(action.payload.operation){
        case 'changeUserName':
          state.userName = action.payload.data;
          break;
        case 'changeUserEmail':
          state.email = action.payload.data;
          break;
        default: break;
      }
    },
  },

  extraReducers:  
    builder => {
      builder.addCase(singUpAPI.pending, (state) => {
        state.isLoading = true; state.error = '';
      });
            
      builder.addCase(singUpAPI.fulfilled, (state, action) => {

        state.isLoading = false;
        state.email = action.payload.data.user.email;

        // some actions with 'action'...
      });
            
      builder.addCase(singUpAPI.rejected, (state, action) => {
                    
        state.isLoading = false;
        state.error = action.payload as string;
        
      });
    },
  }
);
export const {
  changeSingUp
} = singUpSlice.actions;
export default singUpSlice.reducer;

