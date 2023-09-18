
const initialState = {
    stuForm:{
      stuName:'',
      stuGender: '',
      stutPhone: '',
      stuEmail: '',
      stuAddress: '',
      stuContact: '',
      stuRelation:'',
      stuContact_tel:'',
      stuNote:'',
    },
    jsonDate:[]
  };
  
  const formReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_STU_FORM':
          // const { stuName, stuGender, stuPhone, stuEmail, stuAddress, stuAccount, stuContact, stuRelation, stuContact_tel, stuNote } = action.payload;
        return {
          ...state,
          jsonDate:state.jsonDate.concat(action.payload),
          // stuForm: 
          //   {...state.coachForm,
          //     stuName,
          //     stuGender, 
          //     stuPhone, 
          //     stuEmail, 
          //     stuAddress,  
          //     stuAccount, 
          //     stuContact, 
          //     stuRelation, 
          //     stuContact_tel, 
          //     stuNote }, 
        };
      
      default:
        return state;
    }
  };
  
  export default formReducer;