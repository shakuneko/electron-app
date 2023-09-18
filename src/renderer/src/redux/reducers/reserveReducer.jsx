
const initialState = {
    reserveForm: {
        reserveDate:'',
        reserveTime:'',
        reserveStu:'',
    },
  };
  
  const formReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'UPDATE_COACH_NAME':
        return {
          ...state,
          reserveForm: {
            ...state.reserveForm,
            ...action.payload,
          },
        };
  
      default:
        return state;
    }
  };
  
  export default formReducer;