import { configureStore, combineReducers } from "@reduxjs/toolkit";

import { persistStore, persistReducer, FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER, } from 'redux-persist'
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
import as from './getStatisticStore.js';

const rootReducer = combineReducers({
  signUp: changeSingUp,
  signIn: changeSingIn,
  pm: pmReducer,
  addCourse: acCourse,
  logout: lo,
  getCourses: gc,
  deleteCourses: dc,
  patchCourses: pc,
  getStatistic: as,
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
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
        }),
    }
);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// create own dispatch hook - "usePmDispatch" or add type to each useDispatch

// export const usePmDispatch: () => useDispatch<AppDispatch>();