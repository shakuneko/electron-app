
const initialState = {
  coachForm: {
    coachName: '',
    coachGender: '',
    coachIDcode: '',
    coachPhone: '',
    coachEmail: '',
    coachAddress: '',
    salary: '',
    coachBank: '',
    coachContact: '',
    coachRelation: '',
    coachContact_tel: '',
    coachNote: '',
    major: null,
  },
};

const formReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_COACH_NAME':
      const { coachName, coachGender, coachIDcode, coachPhone, coachEmail, coachAddress, salary, coachBank, coachContact, coachRelation, coachContact_tel, coachNote } = action.payload;
      return {
        ...state,
        coachForm: 
          {...state.coachForm,
            coachName,
            coachGender, 
            coachIDcode, 
            coachPhone, 
            coachEmail, 
            coachAddress, 
            salary, 
            coachBank, 
            coachContact, 
            coachRelation, 
            coachContact_tel, 
            coachNote }, 
      };

    default:
      return state;
  }
};

export default formReducer;