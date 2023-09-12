import { configureStore } from '@reduxjs/toolkit';
import saveReducer from './reducers/saveSlice';

// Part2: Combine Reducers and Create a Store
const store = configureStore({
   reducer: {
     save: saveReducer,
   },
   devTools: process.env.NODE_ENV !== 'production',
 });

//  export store to global
export default store;