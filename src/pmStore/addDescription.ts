import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import addDescriptionAPI  from '../API/addDescriptionAPI';

// types
import { addDescriptionInitialState, ActionAddDescription } from '../types/descriptionTypes';

const addDescriptionSliceInitialState: addDescriptionInitialState = {

  isLoading: false,
  isLoad: false,
  message: '',
  selected: false,
 
};

const addDescriptionSlice = createSlice({
  name: 'addDescription',
  initialState: addDescriptionSliceInitialState,

  reducers: {

    changeAddDescription(state, action: PayloadAction<ActionAddDescription>) {
      switch(action.payload.operation){
        case 'clearMessage':
            state.message = '';
            break;
        case 'changeMessage':
            state.message = (action.payload.data as string);
            break;
        case 'isLoad':
            state.isLoad = (action.payload.data as boolean);
            break;
        default: break;
      }
    },
    
  },

  extraReducers:  
    builder => {
      builder.addCase(addDescriptionAPI.pending, (state) => {
        state.isLoading = true; state.isLoad = false; state.message = '';
      });
            
      builder.addCase(addDescriptionAPI.fulfilled, (state, action) => {
      
        state.isLoading = false;
        state.isLoad = true;
        state.message = action.payload.data.message;
        // some actions with 'action'...
      });
            
      builder.addCase(addDescriptionAPI.rejected, (state, action) => {
    
        state.isLoad = false;            
        state.isLoading = false;
        state.message = action.payload as string;
        
      });
    },
  }
);
export const { changeAddDescription } =
addDescriptionSlice.actions;
export default addDescriptionSlice.reducer;