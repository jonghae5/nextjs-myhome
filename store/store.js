// import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import { abilitySliceReducer } from '../slices/abilitySlice';
import { compareSliceReducer } from '../slices/compareSlice';
import { userSliceReducer } from '../slices/userSlice';
// import counterSlice from './slices/counterSlice';
// import todoSlice from './slices/todoSlice';
// import userSlice from './slices/userSlice';

const logger = createLogger();
const rootReducer = combineReducers({
  // ability: abilitySliceReducer,
  // compare: compareSliceReducer,
  user: userSliceReducer,
  //   todo: todoSlice.reducer,
  //   user: userSlice.reducer,
});

const initialState = {};

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState: initialState,
  enhancers: defaultEnhancers => [...defaultEnhancers],
});

export default store;
