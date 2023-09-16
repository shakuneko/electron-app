
const initialState = {
    classForm:{
      page1: {
        coachName:'',
        stuName: '',
        stuName2:'',
        coursesAll: '',
        salary:'',
        exCourse:'',
        buyNote: '',
        buyDate:'',
      },
      page2: {
        coachName:'',
        stuName: '',
        coursesAll: '',
        salary:'',
        exCourse:'',
        buyNote: '',
        buyDate:'',
      },
      page3: {
        coachName:'',
        stuName: '',
        coursesAll: '',
        salary:'',
        exCourse:'', 
        buyNote: '',
        buyDate:'',
      },
      page4: {
        coachName:'',
        coursesAll: '',
        salary:'',
        buyNote: '',
        buyDate:'',
      },
      page5: {
        coachName:'',
        floor: '',
        date:'',
        time: '',
        buyNote: '',
        buyDate:'',
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
         
            },
  
        };
  
      default:
        return state;
    }
  };
  
  export default formReducer;