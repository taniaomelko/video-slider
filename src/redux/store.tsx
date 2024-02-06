import { configureStore } from '@reduxjs/toolkit';
import { videosReducer } from './reducers';

import { combineReducers } from "redux";

export const store = configureStore({
  reducer: combineReducers({
    videos: videosReducer,
  })
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
