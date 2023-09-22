// 在您的 Redux reducer 文件中，比如 reducers.js
const initialState = {
    classCourse: [], // 初始数据
  };
  
  const classCourseDataReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'UPDATE_CLASSS_COURSE_DATA':
        return {
          ...state,
          classCourse: action.payload, // 更新数据
        };
      default:
        return state;
    }
  };
  
  export default classCourseDataReducer;