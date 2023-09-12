

import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers/rootReducer'; // 假设有 coachReducer

// 创建 Redux store
const store = configureStore({
  reducer: {
    root: rootReducer, // 将 coachReducer 与 coach 键关联
    // 如果有其他 reducers，也可以在这里添加
  },
});

export default store;

//只有coach
// import { configureStore } from '@reduxjs/toolkit';
// import coachReducer from './reducers/coachReducer'; // 假设有 coachReducer

// // 创建 Redux store
// const store = configureStore({
//   reducer: {
//     coach: coachReducer, // 将 coachReducer 与 coach 键关联
//     // 如果有其他 reducers，也可以在这里添加
//   },
// });

// export default store;