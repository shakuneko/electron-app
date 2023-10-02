import React, { useState, useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { updateTableData } from '../redux/Actions/saveActions'; // 导入您的更新动作
import { addReserveTableData } from "../redux/reducers/saveSlice"

  function ReserveTime(props) {
    const dispatch = useDispatch(); // 获取dispatch函数的引用
    const {tableData,setTableData} = props;
    const classes = props.classes;
    const id = props.classes.classID
    const courseLeft = props.classes.courseLeft
    const initialFormData = {
      reserveDate:'',
      reserveTime:'',
      reserveStu:[],
    }
    const [reserveForm, setReserveForm] = useState(initialFormData); // 存儲選擇的日期
    // const [selectedStudents, setSelectedStudents] = useState([]);
    const [matchingStudents, setMatchingStudents] =  useState(new Set());
    // const [selectedStudentType, setSelectedStudentType] = useState(new Set()); // 存储选定的学员类型
    const studentFormData = useSelector((state) => state.root.save.fileName.newJsonData[1].stuDetail);
    console.log("studentFormData", studentFormData)


    
    const handleInputChange = (event) => {
    const { name, options, value } = event.target;
  
    if (name === "reserveStu") {
      // 如果用户在下拉菜单中选择了学员，只更新学员名称
      setReserveForm((prevForm) => ({
        ...prevForm,
        [name]: options
          ? Array.from(options)
              .filter((option) => option.selected)
              .map((option) => option.value)
          : [value], // 如果用户未选择任何选项，则使用当前值
      }));
    } else {
      // 对于其他表单字段，正常更新
      setReserveForm((prevForm) => ({
        ...prevForm,
        [name]: value,
      }));
    }
  };
  
  
   // 更新 matchingStudents與selectedStudentType的示例
   useEffect(() => {
    const newClassID = props.classes.classID;
    const newMatchingStudents = new Set(); // 使用 Set 来确保唯一性

    // 假设您可以从 props 中获取学生数据
    const studentData = studentFormData;
    studentData.forEach((student) => {
    // jsonData.find((item) => item.category === 'student').stuDetail.forEach((student) => {
      student.buyDetail.forEach((buyInfo) => {
        if (buyInfo.classID === newClassID ) { //ClassID一樣就放進來
          newMatchingStudents.add({
            stuName: student.stuName,
            stuID: student.stuID,
            courseType: buyInfo.courseType,
          });
        }
      });
    });
  
    setMatchingStudents(Array.from(newMatchingStudents));
  }, [props.classes.classID]);


const handleSubmit = () => {
  if (courseLeft > 0) {
  // 获取当前用户选择的学员名称
  const selectedStudentNames = reserveForm.reserveStu;
  //找當前classID裡面的reserveID
  const selectedClass = props.classes; // 假设 props.classes 包含了目标 class 的信息
  if (selectedClass) {
    const reserveDetail = selectedClass.reserveDetail || []; // 获取目标 class 的 reserveDetail 数组，如果不存在则创建一个空数组
    const existingReserveIDs = reserveDetail.map((reserve) => reserve.reserveID); // 提取已有的 reserveID 数组
    // 计算新的reserveID
    let newReserveID = (existingReserveIDs.length > 0 ? (Math.max(...existingReserveIDs) + 1) : 1).toString();
  
  // 创建用于新预约数据的对象
  let newReserveData = {
    reserveID: newReserveID,
    reserveDate: reserveForm.reserveDate,
    reserveTime: reserveForm.reserveTime,
    cancel: "-",
    attandence: "-",
    note: "",
    student: [], // 将在下面更新
  };
  const courseType = props.classes.courseType;
  // 更新 reserveDetail > student 
  selectedStudentNames.forEach((selectedStudentName) => {
    let selectedStudentInfo = matchingStudents.find(
      (student) => student.stuName === selectedStudentName
    );
    
    if (selectedStudentInfo) {
      newReserveData.student.push({
        stuID: selectedStudentInfo.stuID,
        stuName: selectedStudentInfo.stuName,
        courseType: courseType, // 将 courseType 添加到学员信息中
      });
    }
  });
 
      dispatch(updateTableData([...tableData, newReserveData]))
      dispatch(addReserveTableData({data: [...tableData, newReserveData], classID: id}));
      setReserveForm(initialFormData);
    } 
  }else{
    alert('剩餘堂數已經為0，無法預約。');
  }
  };

    return (
      <div className="reservetab">
        <p className="reserveboxtitle">學員預約</p>
        <div className="reservebox">
          <div className="reservebox-item">
            <p className="rstitle col-3">日期：</p>
            <div className="DatePicksTitle col-9">
                <input 
                  id="datee" 
                  class="form-control" 
                  type="date" 
                  name="reserveDate"
                  value={reserveForm.reserveDate}
                  onChange={handleInputChange}
                />
            </div>
          </div>
          <div className="reservebox-item">
            <p className="rstitle col-3">時間：</p>
            <div className="DatePicksTitle col-9">
                <input 
                  id="startTime" 
                  class="form-control" 
                  type="time"
                  name="reserveTime"
                  value={reserveForm.reserveTime}
                  onChange={handleInputChange}
                />
            </div>
          </div>
          <div className="reservebox-item">
            <p className="rstitle col-3">學員：</p>
            <div className="DatePicksTitle col-9">
             <select 
              class="form-control"
               name="reserveStu"
               multiple={true}  // 启用多选功能
               value={reserveForm.reserveStu} // 存储选中的学员名称的数组 
              onChange={handleInputChange}
            >
               {Array.from(matchingStudents).map((student) => (
                <option key={student.stuID} value={student.stuName}>
                  {student.stuName}
                </option>
              ))}
            </select>
            </div>
          </div>
        <div className="mb-4">
            <button 
              type="button" 
              className="btn btn-golden"
              onClick={handleSubmit}
            >
              確定
            </button>
          </div>
        </div>
      </div>
    );
  }
 
  
  export default ReserveTime;