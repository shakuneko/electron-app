import { createStore, combineReducers } from 'redux';
import coachReducer from './reducers/coachReducer'; // 假設您有一個名為 coachReducer 的 reducer

// 將多個 reducers 合併成一個 rootReducer
const rootReducer = combineReducers({
  coach: coachReducer, // 將 coachReducer 與 coach 鍵關聯
  // 可以添加其他 reducers，如果有的話
});

// 創建 Redux store，並將 rootReducer 傳遞給 createStore
const store = createStore(rootReducer);

export default store;