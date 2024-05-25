import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import singUpAPI  from '../API/signUpAPI';

// types
import { SingUpInitialState } from '../types/authTypes';
import { ActionSignUp } from '../types/authTypes';

const singUpSliceInitialState: SingUpInitialState = {

  isLoading: false,
  message: '',
  email:'',
  userName:'',
 
};

const singUpSlice = createSlice({
  name: 'singUp',
  initialState: singUpSliceInitialState,

  reducers: {
    changeSingUp(state, action: PayloadAction<ActionSignUp>) {
      switch(action.payload.operation){
        case 'changeUserName':
          state.userName = action.payload.data;
          break;
        case 'changeUserEmail':
          state.email = action.payload.data;
          break;
        case 'clearMessage':
            state.message = '';
            break;
        default: break;
      }
    },
  },

  extraReducers:  
    builder => {
      builder.addCase(singUpAPI.pending, (state) => {
        state.isLoading = true; state.message = '';
      });
            
      builder.addCase(singUpAPI.fulfilled, (state, action) => {

        state.isLoading = false;
        state.email = action.payload.data.user.email;
        state.message = 'Account created successfully';
        // some actions with 'action'...
      });
            
      builder.addCase(singUpAPI.rejected, (state, action) => {
                    
        state.isLoading = false;
        state.message = action.payload as string;
        
      });
    },
  }
);
export const {
  changeSingUp
} = singUpSlice.actions;
export default singUpSlice.reducer;

