import { combineReducers } from 'redux';
import coachReducer from './coachReducer'; // 导入你的 coachReducer
import stuReducer from './stuReducer'

// 使用 combineReducers 合并多个 reducer
const rootReducer = combineReducers({
  coach: coachReducer, // 将 coachReducer 添加到 rootReducer 中
  stu:stuReducer,
  // 如果有其他 reducer，也在这里添加
});

export default rootReducer;