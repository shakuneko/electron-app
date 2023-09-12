
const initialState = {
  coachForm: {
    name: '',
    gender: '',
    idcode: '',
    tel: '',
    email: '',
    address: '',
    salary: '',
    account: '',
    contact: '',
    relation: '',
    contact_tel: '',
    note: '',
    selectedItem: null,
  },
};

const coachReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_COACH_NAME':
      const { name, gender, idcode, tel, email, address, salary, account, contact, relation, contact_tel, note } = action.payload;
      return {
        ...state,
        coachForm: 
          {...state.coachForm,
            name,
            gender, 
            idcode, 
            tel, 
            email, 
            address, 
            salary, 
            account, 
            contact, 
            relation, 
            contact_tel, 
            note }, 
      };
    
    default:
      return state;
  }
};

export default coachReducer;