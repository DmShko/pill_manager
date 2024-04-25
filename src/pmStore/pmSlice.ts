import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// my types
import { PmInitialState, ActionCourses, Course, ActionPills, Pill, ChangePillProp, ChangeCourseProp } from '../types/types';

const pmInitialState: PmInitialState = {

  courses: [],
  tempPills: [],
  isLoading: false,
  error: false,
 
};

const pmSlice = createSlice({
    name: 'pmStorage',
    initialState: pmInitialState,
    reducers: {

        changeCourses(state, action: PayloadAction<ActionCourses>) {
            switch (action.payload.mode) {
              case 'clearCourses':
                state.courses = [];
                break;
              case 'changeCourse':
                const tempCourse = state.courses.find(element => element.id === (action.payload.data as ChangeCourseProp).id);

                if(tempCourse !== undefined && Object.keys(tempCourse).includes(action.payload.key)) {
                  
                  if(typeof (action.payload.data as ChangeCourseProp).prop === 'boolean') {
                    tempCourse[action.payload.key as keyof Pick<Course, 'selected'>] = (action.payload.data as ChangeCourseProp).prop;
                  } 
                 
                }
                break;
              case 'addCourse':       
                state.courses = [...state.courses, (action.payload.data as Course)];
                break;
              case 'deleteCourse':
                state.courses = state.courses.filter(element => element.id !== action.payload.data);
                break;
              default: break;
            }
        },

        changeTempPills(state, action: PayloadAction<ActionPills>) {
          switch (action.payload.mode) {
            case 'clearPills':
              state.tempPills = [];
              break;
            case 'addPill': 
              state.tempPills = [...state.tempPills, (action.payload.data as Pill)];
              break;
            case 'changePill': 
              const temp = state.tempPills.find(element => element.id === (action.payload.data as ChangePillProp).id);
         
              if(temp !== undefined && Object.keys(temp).includes(action.payload.key)) {
                temp[action.payload.key as keyof Pill] = (action.payload.data as ChangePillProp).prop;
              }
              break;
            case 'deletePill':
              state.tempPills = state.tempPills.filter(element => element.id !== action.payload.data);
              break;
            default: break;
          }
      },
        
    },
    
    }
);

export const {
    changeCourses,
    changeTempPills
} = pmSlice.actions;
export default pmSlice.reducer;