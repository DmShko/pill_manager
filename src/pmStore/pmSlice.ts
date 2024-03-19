import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// type for one pill element
interface Pill {
    name: string
    id: string
    status: boolean
    prescription: string
    quality: number
    perDay: number
    duration: number
    description: string
};

// type for itialState
interface PmInitialState {
  pills: Pill[]
  isLoading: boolean
  error: boolean
};

const pmInitialState: PmInitialState = {

  pills: [],
  isLoading: false,
  error: false,
 
};

const pmSlice = createSlice({
    name: 'pmStorage',
    initialState: pmInitialState,
    reducers: {

        changePills(state, action: PayloadAction <{ operation: string, data: Pill | string}>) {
            switch (action.payload.operation) {
              case 'clearPills':
                state.pills = [];
                break;
              case 'addPill':
                if(typeof action.payload.data === 'object')
                state.pills = [...state.pills, action.payload.data];
                break;
              case 'deletePill':
                if(typeof action.payload.data === 'string')
                state.pills = state.pills.filter(element => element.id !== action.payload.data);
                break;
              default: break;
            }
        },
        
    },
    
    }
);

export const {
    changePills
} = pmSlice.actions;
export default pmSlice.reducer;