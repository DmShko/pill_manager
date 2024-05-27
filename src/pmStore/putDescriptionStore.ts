import { createSlice } from '@reduxjs/toolkit'

import putDescriptionAPI from '../API/putDescriptionAPI';

// types
import { putDescriptionInitialState } from '../types/descriptionTypes';

const putDescriptionInitialState: putDescriptionInitialState = {

  isLoading: false,
  isChange: false,
  message: '',
 
};

const putDescriptionSlice = createSlice({
  name: 'putDescription',
  initialState: putDescriptionInitialState,

  reducers: {
    
  },

  extraReducers:  
    builder => {
      builder.addCase(putDescriptionAPI.pending, (state) => {
        state.isLoading = true; state.message = ''; state.isChange = false;
      });
            
      builder.addCase(putDescriptionAPI.fulfilled, (state, action) => {

        state.isLoading = false;
        state.message = action.payload.data.message;
        state.isChange = true;
        // some actions with 'action'...
      });
            
      builder.addCase(putDescriptionAPI.rejected, (state, action) => {
                    
        state.isLoading = false;
        state.isChange = false;
        
        if(action.payload !== undefined) state.message = action.payload;

      });
    },
  }
);

export default putDescriptionSlice.reducer;