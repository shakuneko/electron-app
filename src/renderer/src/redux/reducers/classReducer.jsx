
const initialState = {
    classForm:{
        page1: {
            coach:'',
            stu1: '',
            stu2:'',
            number: '',
            salary:'',
            selectedOption: '', // 将 radio 按钮放入 page1 中
            note: '',
        },
        page2: {
            coach:'',
            stu1: '',
            stu2:'',
            number: '',
            salary:'',
            selectedOption: '', 
            note: '',
        },
        page3: {
            coach:'',
            stu1: '',
            stu2:'',
            number: '',
            salary:'',
            selectedOption: '', 
            note: '',
        },
        page4: {
            coach:'',
            stu1: '',
            stu2:'',
            stu3:'',
            number: '',
            salary:'',
            note: '',
        },
        page5: {
            coach:'',
            floor: '',
            date:'',
            time: '',
            note: '',
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