// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   coachForm: {
//     coachName: '',
//     coachGender: '',
//     coachIDcode: '',
//     coachPhone: '',
//     coachEmail: '',
//     coachAddress: '',
//     coachBank: '',
//     coachContact: '',
//     coachRelation: '',
//     coachContact_tel: '',
//     coachNote: '',
//     major: null,
//     joinDate: '',
//     PtSalary: '',
//     PilatesSalary: '',
//     GroupSalary: '',
//     MassageSalary: '',
//   },
//   stuForm: {
//     stuName: '',
//     stuGender: '',
//     stuPhone: '',
//     stuEmail: '',
//     stuAddress: '',
//     stuContact: '',
//     stuRelation: '',
//     stuContact_tel: '',
//     stuNote: '',
//   },
//   reserveForm: {
//     reserveDate: '',
//     reserveTime: '',
//     reserveStu: '',
//   },
//   classForm: {
//     page1: {
//       coachName: '',
//       stuName: '',
//       stuName2: '',
//       coursesAll: '',
//       coursePrice: '',
//       exCourse: '',
//       buyNote: '',
//       buyDate: '',
//     },
//     page2: {
//       coachName: '',
//       stuName: '',
//       coursesAll: '',
//       coursePrice: '',
//       exCourse: '',
//       buyNote: '',
//       buyDate: '',
//     },
//     page3: {
//       coachName: '',
//       stuName: '',
//       coursesAll: '',
//       coursePrice: '',
//       exCourse: '',
//       buyNote: '',
//       buyDate: '',
//     },
//     page4: {
//       coachName: '',
//       coursesAll: '',
//       coursePrice: '',
//       buyNote: '',
//       buyDate: '',
//     },
//     page5: {
//       coachName: '',
//       floor: '',
//       date: '',
//       time: '',
//       buyNote: '',
//       buyDate: '',
//     },
//   },
//   jsonDate: [],
// };

// const formSlice = createSlice({
//   name: 'form',
//   initialState,
//   reducers: {
//     updateCoachName: (state, action) => {
//       state.coachForm = { ...state.coachForm, ...action.payload };
//     },
//     updateStuForm: (state, action) => {
//       state.stuForm = { ...state.stuForm, ...action.payload };
//     },
//     updateReserveForm: (state, action) => {
//       state.reserveForm = { ...state.reserveForm, ...action.payload };
//     },
//     updateClassForm: (state, action) => {
//       const { page, data } = action.payload;
//       state.classForm[page] = data;
//     },
//     // 添加其他更新表单的 reducer
//   },
// });

// export const {
//   updateCoachName,
//   updateStuForm,
//   updateReserveForm,
//   updateClassForm,
// } = formSlice.actions;
// export default formSlice.reducer;
