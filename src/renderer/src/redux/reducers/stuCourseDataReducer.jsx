// 在您的 Redux reducer 文件中，比如 reducers.js
const initialState = {
    stuCourse: [], // 初始数据
  };
  
  const stuCourseDataReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'UPDATE_STU_COURSE_DATA':
        return {
          ...state,
          stuCourse: action.payload, // 更新数据
        };
      default:
        return state;
    }
  };
  
  export default stuCourseDataReducer;