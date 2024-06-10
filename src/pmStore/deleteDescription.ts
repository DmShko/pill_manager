import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import deleteDescriptionAPI  from '../API/deleteDescriptionAPI';

// types
import { deleteDescriptionInitialState, ActionDeleteDescription } from '../types/descriptionTypes';

const deleteDescriptionSliceInitialState: deleteDescriptionInitialState = {

  isDelete: false,
  isLoading: false,
  message: '',
 
};

const deleteDescriptionSlice = createSlice({
  name: 'deleteDescription',
  initialState: deleteDescriptionSliceInitialState,

  reducers: {

    changeDeleteDescription(state, action: PayloadAction<ActionDeleteDescription>) {
      switch(action.payload.operation){
        case 'clearMessage':
            state.message = '';
            break;
        case 'changeisDelete':
            state.isDelete = (action.payload.data as boolean);
            break;
        default: break;
      }
    },
    
  },

  extraReducers:  
    builder => {
      builder.addCase(deleteDescriptionAPI.pending, (state) => {
        state.isLoading = true; state.message = ''; state.isDelete = false;
      });
            
      builder.addCase(deleteDescriptionAPI.fulfilled, (state, action) => {

        state.isLoading = false;
        state.isDelete = true;
        state.message = action.payload.data.message;
        // some actions with 'action'...
      });
            
      builder.addCase(deleteDescriptionAPI.rejected, (state, action) => {
                    
        state.isLoading = false;
        state.isDelete = false;

        if(action.payload !== undefined) state.message = action.payload;

      });
    },
  }
);

export const { changeDeleteDescription } = 
deleteDescriptionSlice.actions;

export default deleteDescriptionSlice.reducer;