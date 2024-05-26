import { createSlice } from '@reduxjs/toolkit'

import addDescriptionAPI  from '../API/addDescriptionAPI';

// types
import { addDescriptionInitialState } from '../types/descriptionTypes';

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
    
  },

  extraReducers:  
    builder => {
      builder.addCase(addDescriptionAPI.pending, (state) => {
        state.isLoading = true; state.isLoad = false; state.message = '';
      });
            
      builder.addCase(addDescriptionAPI.fulfilled, (state) => {
      
        state.isLoading = false;
        state.isLoad = true;
        state.message = 'Description is loaded';
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

export default addDescriptionSlice.reducer;