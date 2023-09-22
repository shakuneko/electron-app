import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    stuForm:{
      stuID:'',
      stuName:'',
      stuGender: '',
      stuPhone: '',
      stuEmail: '',
      stuAddress: '',
      stuContact: '',
      stuRelation:'',
      stuContact_tel:'',
      stuNote:'',
      createDate:'',
      buyDetail: [],
    },
  };
//   const formSlice = createSlice({
//     name: 'form',
//     initialState,
//     reducers: {
//       updateStuForm: (state, action) => {
//         state.jsonDate = [...state.jsonDate, action.payload];
//       },
//     },
//   });
  
//   export const { updateStuForm } = formSlice.actions;
  
//   export default formSlice.reducer;
  const formReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_STU_FORM':
          // const { stuName, stuGender, stuPhone, stuEmail, stuAddress, stuAccount, stuContact, stuRelation, stuContact_tel, stuNote } = action.payload;
          return {
                    ...state,
                    stuForm: {
                      ...state.stuForm,
                      ...action.payload,
                    },
                  };
      
      default:
        return state;
    }
  };
  
  export default formReducer;