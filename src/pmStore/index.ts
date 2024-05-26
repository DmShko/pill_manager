import { configureStore, combineReducers } from "@reduxjs/toolkit";

import { persistStore, persistReducer,} from 'redux-persist'
// FLUSH,
// REHYDRATE,
// PAUSE,
// PERSIST,
// PURGE,
// REGISTER, 
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

// my reducers
import pmReducer from './pmSlice.js';
import changeSingUp from './signUpStore.js';
import changeSingIn from './signInStore.js';
import acCourse from './addCourseStore.js';
import lo from './logoutStore.js';
import gc from './getCoursesStore.js';
import dc from './deleteCourseStore.js';
import pc from './patchCourseStore.js';
import gs from './getStatisticStore.js';
import ps from './patchStatisticStore.js';
import as from './addStatisticStore.js';
import rever from './reVerifyStore.js';
import ad from './addDescription.js';
import gd from './getDescriptions.js';
import dd from './deleteDescription.js';
import pd from './putDescriptionStore.js';

const rootReducer = combineReducers({
  signUp: changeSingUp,
  signIn: changeSingIn,
  pm: pmReducer,
  addCourse: acCourse,
  logout: lo,
  getCourses: gc,
  deleteCourses: dc,
  patchCourses: pc,
  getStatistic: gs,
  addStatistic: as,
  patchStatistic: ps,
  reVerify: rever,
  addDescription: ad,
  getDescriptions: gd,
  deleteDescription: dd,
  putDescription: pd,
});

const persistConfig = {
    // 'key' is indeficate of one or more storage
    key: 'root',
    storage,
};

// basic reducer
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false,
        }),
    }
);
//{
//ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, ],
//},

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// create own dispatch hook - "usePmDispatch" or add type to each useDispatch

// export const usePmDispatch: () => useDispatch<AppDispatch>();