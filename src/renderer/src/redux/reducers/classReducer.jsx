
const initialState = {
    classForm:{
      page1: {
        coachName:'',
        stuName1: '',
        stuName2:'',
        coursesAll: '',
        salary:'',
        exCourse:'',
        buyNote: '',
      },
      page2: {
        coachName:'',
        stuName: '',
        coursesAll: '',
        salary:'',
        exCourse:'',
        buyNote: '',
      },
      page3: {
        coachName:'',
        stuName: '',
        coursesAll: '',
        salary:'',
        exCourse:'', 
        buyNote: '',
      },
      page4: {
        coachName:'',
        coursesAll: '',
        salary:'',
        buyNote: '',
      },
      page5: {
        coachName:'',
        floor: '',
        date:'',
        time: '',
        buyNote: '',
      },
    },
  };
  
  const formReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'UPDATE_CLASS_FORM':
        const { page,data} = action.payload;
        return {
          ...state,
          classForm:{
                ...state.classForm,
            [page]:data,
            //  {
            //     ...state.classForm[page],
            //     coach,
            //     stu1,
            //     stu2,
            //     number,
            //     salary,
            //     selectedOption,
            //     note
            //     },
         
            },
  
        };
  
      default:
        return state;
    }
  };
  
  export default formReducer;