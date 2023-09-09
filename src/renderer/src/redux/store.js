import { configureStore } from '@reduxjs/toolkit';
import pageReducer from './pageSlice';

// Part2: Combine Reducers and Create a Store
const store = configureStore({
   reducer: {
     page: pageReducer,
   },
   devTools: process.env.NODE_ENV !== 'production',
 });

//  export store to global
export default store;