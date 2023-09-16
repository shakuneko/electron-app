
const initialState = {
    classForm:{
      page1: {
        coachName:'',
        stuName: '',
        stuName2:'',
        coursesAll: '',
        coursePrice:'',
        exCourse:'',
        buyNote: '',
        buyDate:'',
      },
      page2: {
        coachName:'',
        stuName: '',
        coursesAll: '',
        coursePrice:'',
        exCourse:'',
        buyNote: '',
        buyDate:'',
      },
      page3: {
        coachName:'',
        stuName: '',
        coursesAll: '',
        coursePrice:'',
        exCourse:'', 
        buyNote: '',
        buyDate:'',
      },
      page4: {
        coachName:'',
        coursesAll: '',
        coursePrice:'',
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