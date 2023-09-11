
// const initialState = {
//     coachData: [], // 存儲教練表單數據的狀態
//   };
  
//   const coachReducer = (state = initialState, action) => {
//     switch (action.type) {
//       case 'UPDATE_COACH_DATA':
//         return {
//           ...state,
//           coachData: action.payload,
//         };
//       default:
//         return state;
//     }
//   };
  
//   export default coachReducer;
  

const initialState = {
  coachNames: [],
  // sex:'',
};

const coachReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_COACH_NAME':
      return {
        ...state,
        coachNames: [...state.coachNames, action.payload], 
      };
    // case 'UPDATE_SEX':
    //   return {
    //     ...state,
    //     sex: action.payload,
    //   };
    default:
      return state;
  }
};

export default coachReducer;