
const initialState = {
  coachForm: {
    coachName:'',
    coachGender: '',
    coachIDcode: '',
    coachPhone:'',
    coachEmail: '',
    coachAddress: '',
    coachBank:'',
    coachContact: '',
    coachRelation:'',
    coachContact_tel:'',
    coachNote:'',
    major: null, // 新增一个字段用于存储按钮选项值
    joinDate:'',
    PtSalary:'',
    PilatesSalary:'',
    GroupSalary:'',
    MassageSalary:'', 
  },
};

const formReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_COACH_NAME':
      return {
        ...state,
        coachForm: {
          ...state.coachForm,
          ...action.payload,
        },
      };

    default:
      return state;
  }
};

export default formReducer;