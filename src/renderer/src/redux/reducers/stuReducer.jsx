
const initialState = {
    stuForm:{
      name:'',
      stuGender: '',
      stutPhone: '',
      stuEmail: '',
      stuAddress: '',
      stuContact: '',
      stuRelation:'',
      stuContact_tel:'',
      note:'',
    }
  };
  
  const formReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_STU_FORM':
          const { name, stuGender, stuPhone, stuEmail, stuAddress, stuAccount, stuContact, stuRelation, stuContact_phone, note } = action.payload;
        return {
          ...state,
          stuForm: 
            {...state.coachForm,
              name,
              stuGender, 
              stuPhone, 
              stuEmail, 
              stuAddress,  
              stuAccount, 
              stuContact, 
              stuRelation, 
              stuContact_phone, 
              note }, 
        };
      
      default:
        return state;
    }
  };
  
  export default formReducer;