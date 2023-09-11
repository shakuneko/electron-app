// import { createStore, combineReducers } from 'redux';
// import coachReducer from './reducers/coachReducer'; // 假设您有一个名为 coachReducer 的 reducer

// // 将多个 reducers 合并成一个 rootReducer
// const rootReducer = combineReducers({
//   coach: coachReducer, // 将 coachReducer 与 coach 键关联
//   // 可以添加其他 reducers，如果有的话
// });

// // 创建 Redux store，并将 rootReducer 传递给 createStore
// const store = createStore(rootReducer);

// export default store;

import { configureStore } from '@reduxjs/toolkit';
import coachReducer from './reducers/coachReducer'; // 假设有 coachReducer

// 创建 Redux store
const store = configureStore({
  reducer: {
    coach: coachReducer, // 将 coachReducer 与 coach 键关联
    // 如果有其他 reducers，也可以在这里添加
  },
});

export default store;
