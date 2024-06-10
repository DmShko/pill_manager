import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import allDescriptionAPI  from '../API/allDescriptionAPI';

// types
import { getDescriptionInitialState, ActionDescription, ChangeDescriptionPropB, Desc, ChangeDescriptionPropS } from '../types/descriptionTypes';

const getDescriptionSliceInitialState: getDescriptionInitialState = {

  description: [],
  isLoad: false,
  isLoading: false,
  message: '',
 
};

const getDescriptionSlice = createSlice({
  name: 'getDescriptions',
  initialState: getDescriptionSliceInitialState,

  reducers: {

    changeDescription(state, action: PayloadAction<ActionDescription>) {
        switch (action.payload.mode) {
          case "clearDescription":
            state.description = [];
            break;
          case "changeDescriptionFutures":
            const tempCourse = state.description.find(
              (element) =>
                element._id === (action.payload.data as ChangeDescriptionPropB)._id
            );
  
            if (
              tempCourse !== undefined 
            ) {
              // for string boolean
              if (
                typeof (action.payload.data as ChangeDescriptionPropB).prop ===
                "boolean"
              ) {
                tempCourse[action.payload.key as keyof Pick<Desc, "selected">] =
                  (action.payload.data as ChangeDescriptionPropB).prop;
              } 
  
              // for string futures
              if (
                typeof (action.payload.data as ChangeDescriptionPropS).prop ===
                "string"
              ) {
                tempCourse[action.payload.key as keyof Omit<Desc, "selected">] =
                (action.payload.data as ChangeDescriptionPropS).prop;
              };
            }
            break;
          default:
            break;
        }
      },
    
  },

  extraReducers:  
    builder => {
      builder.addCase(allDescriptionAPI.pending, (state) => {
        state.isLoading = true; state.message = '';
        state.isLoad = false;
      });
            
      builder.addCase(allDescriptionAPI.fulfilled, (state, action) => {

        state.isLoading = false;
        state.isLoad = true;

        state.description = action.payload;
        // some actions with 'action'...
      });
            
      builder.addCase(allDescriptionAPI.rejected, (state, action) => {
                    
        state.isLoading = false;
        state.isLoad = false;
        
        if(action.payload !== undefined) state.message = action.payload;

      });
    },
  }
);

export const { changeDescription } =
getDescriptionSlice.actions;

export default getDescriptionSlice.reducer;