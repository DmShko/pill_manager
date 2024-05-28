import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import putDescriptionAPI from '../API/putDescriptionAPI';

// types
import { putDescriptionInitialState, ActionPutDescription } from '../types/descriptionTypes';

const putDescriptionInitialState: putDescriptionInitialState = {

  isLoading: false,
  isChange: false,
  message: '',
 
};

const putDescriptionSlice = createSlice({
  name: 'putDescription',
  initialState: putDescriptionInitialState,

  reducers: {
    changePutDescription(state, action: PayloadAction<ActionPutDescription>) {
      switch(action.payload.operation){
        case 'clearMessage':
            state.message = '';
            break;
        case 'changeIsChange':
            state.isChange = (action.payload.data as boolean);
            break;
        default: break;
      }
    },
  },

  extraReducers:  
    builder => {
      builder.addCase(putDescriptionAPI.pending, (state) => {
        state.isLoading = true; state.message = ''; state.isChange = false;
      });
            
      builder.addCase(putDescriptionAPI.fulfilled, (state, action) => {

        state.isLoading = false;
        if(action.payload !== undefined) state.message = action.payload.data.message;
        state.isChange = true;
        // some actions with 'action'...
      });
            
      builder.addCase(putDescriptionAPI.rejected, (state, action) => {
                    
        state.isLoading = false;
        state.isChange = false;
        
        if(action.payload !== undefined) state.message = 'Course Name is required';

      });
    },
  }
);

export const {
  changePutDescription,
} = putDescriptionSlice.actions;

export default putDescriptionSlice.reducer;