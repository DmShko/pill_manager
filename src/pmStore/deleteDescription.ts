import { createSlice } from '@reduxjs/toolkit'

import deleteDescriptionAPI  from '../API/deleteDescriptionAPI';

// types
import { deleteDescriptionInitialState } from '../types/descriptionTypes';

const deleteDescriptionInitialState: deleteDescriptionInitialState = {

  isDelete: false,
  isLoading: false,
  message: '',
 
};

const deleteDescriptionSlice = createSlice({
  name: 'deleteDescription',
  initialState: deleteDescriptionInitialState,

  reducers: {
    
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

export default deleteDescriptionSlice.reducer;