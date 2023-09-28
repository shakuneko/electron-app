import { createSlice, current } from '@reduxjs/toolkit'
import hash from 'object-hash'
// Part1: Define Slice (including reducers and actions)
import originalJson from '../../json/class.json'

const initialState = {
  fileName: {},
  hasInit: false,
  currentPageHash: '',//傳進來的value
  oldHash: hash(originalJson),
  isSameObject: false
}
const saveSlice = createSlice({
  name: 'save',
  initialState,
  reducers: {
    setFileName:(state, action) => {
      // const fileName = action.payload;
      state.fileName = action.payload;
      const current_state = current(state)
      console.log("setFileName", current_state.fileName)
    },
    setHasinit: (state, action) => {
      const hasInit = action.payload;
      state.hasInit = hasInit;
    },
    checkPageHash: (state, action) => {
      state.currentPageHash = action.payload
      console.log('currentPageHash:', state.currentPageHash)
      
      if (state.oldHash == state.currentPageHash) {
        
        state.isSameObject = true
      } else {
        state.isSameObject = false
        
      } 
      state.oldHash = state.currentPageHash
    },
    setStudentFormSave: (state, action) => {
      console.log('setStudentForm Action:', action.payload)
      console.log("addReserveTableData state", current(state.fileName.newJsonData[1]));
      let current_state = current(state)
      const id = action.payload.id;
      let student = current_state.fileName.newJsonData[1]
      const newData = student= {
            ...student,
            stuDetail: action.payload.data
      }
      state.fileName.newJsonData[1] = newData
      console.log("setCoachForm state", current(state));
    },
    setCoachFormSave: (state, action) => {
      console.log('setCoachForm Action:', action.payload)
      console.log("addReserveTableData state", current(state.fileName.newJsonData[2]));
      let current_state = current(state)
      let coach = current_state.fileName.newJsonData[2]
      const newData = coach= {
            ...coach,
            coachDetail: action.payload.data
      }
      state.fileName.newJsonData[2] = newData
      console.log("setCoachFormSave state", current(state));
    },
    addReserveTableData: (state, action) => {
      // console.log("addReserveTableData payload", action.payload);
      // console.log("addReserveTableData state", state);

      // console.log("addReserveTableData payload", state.fileName.newJsonData[0].classDetail);
      let current_state = current(state)
      let newTableData = current_state.fileName.newJsonData.find(item => item.category === "class").classDetail.map((item) => {
        // console.log('addReserveTableData item', item, action.payload.classID)
        // console.log('addReserveTableData classID', action.payload.classID)
        if (item.classID === action.payload.classID) {
          console.log("addReserveTableData payload", action.payload);
          return {
            ...item,
            reserveDetail: action.payload.data
          }
        }
        return item;

      })
      state.fileName.newJsonData[0].classDetail = newTableData;
      console.log("addReserveTableData state", current(state));

    },
    upDateClassCourse: (state, action) => {
      let current_state = current(state)
      let newClassCourse = current_state.fileName.newJsonData.find(item => item.category === "class").classDetail.map((item) => {
        if(item.classID === action.payload.classID) {
          console.log("upDateClassCourse", action.payload);
          return {
            ...action.payload.data
          }
        }
        return item;
          
      })
      state.fileName.newJsonData[0].classDetail = newClassCourse
      console.log("upDateClassCourse state", current(state));
    },
    upDateStuCourse: (state, action) => {
      let current_state = current(state)
      let student = current_state.fileName.newJsonData
      const newData = student.map(item => {
        if (item.category === "student") {
          return {
            ...item,
            stuDetail: action.payload
          };
        }
        return item;
      });
      state.fileName.newJsonData = newData;
      console.log("upDateStuCourse state", current(state));
    },
    updateClassStatus: (state, action) => {
      let current_state = current(state)
      let classStatus = current_state.fileName.newJsonData
      const newData = classStatus.map(item => {
        if (item.category === "class") {
          return {
            ...item,
            classDetail: action.payload
          };
        }
        return item;
      });
      state.fileName.newJsonData = newData;
      console.log("updateClassStatus state", current(state));
    },
    // //other reducers
   
  }
})

// export state to global
export const selectFileName = (state) => state.root.save.fileName
export const selectHasInit = (state) => state.root.save.hasInit
export const selectSaveState = (state) => state.root.save.currentPageHash
export const selectOldHash = (state) => state.root.save.oldHash
export const selectIsSamePage = (state) => state.root.save.isSameObject


// export actions to global
export const { checkPageHash, setFileName, setHasinit, addReserveTableData, upDateClassCourse, upDateStuCourse, setStudentFormSave,setCoachFormSave,updateClassStatus } = saveSlice.actions

// export reducer to global
export default saveSlice.reducer
