import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// type for one pill element
interface Pill {
    name?: string
    id: string
    prescription?: string
    quality?: number
    perDay?: number
    duration?: number
    description?: string
};

enum CourseStatus {
  'done', 
  'suspended', 
  'not done'
};

// type for one courses item
interface Courses {
  courseName?: string
  doctorName?: string
  id: string
  status?: CourseStatus
  pills: Pill[]
};

// type for itialState
interface PmInitialState {
  courses: Courses[]
  isLoading: boolean
  error: boolean
};

const pmInitialState: PmInitialState = {

  courses: [],
  isLoading: false,
  error: false,
 
};

const pmSlice = createSlice({
    name: 'pmStorage',
    initialState: pmInitialState,
    reducers: {

        changeCourses(state, action: PayloadAction<Courses>) {
            switch (action.type) {
              case 'clearCourses':
                state.courses = [];
                break;
              case 'addCourse':       
                state.courses = [...state.courses, action.payload];
                break;
              case 'deleteCourse':
                state.courses = state.courses.filter(element => element.id !== action.payload.id);
                break;
              default: break;
            }
        },
        
    },
    
    }
);

export const {
    changeCourses
} = pmSlice.actions;
export default pmSlice.reducer;