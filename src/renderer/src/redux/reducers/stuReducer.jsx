
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
    }
  };
  
  const formReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_STU_FORM':
          const { stuName, stuGender, stuPhone, stuEmail, stuAddress, stuAccount, stuContact, stuRelation, stuContact_tel, stuNote } = action.payload;
        return {
          ...state,
          stuForm: 
            {...state.coachForm,
              stuName,
              stuGender, 
              stuPhone, 
              stuEmail, 
              stuAddress,  
              stuAccount, 
              stuContact, 
              stuRelation, 
              stuContact_tel, 
              stuNote }, 
        };
      
      default:
        return state;
    }
  };
  
  export default formReducer;