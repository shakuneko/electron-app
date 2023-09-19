
import React, { useState, useEffect} from "react";
import { connect } from "react-redux";
import { updateReserveTime } from "../redux/Actions/formActions"
import jsonData from '../json/new_class.json'

function generateUniqueID(existingIDs) {
  // 找到现有 ID 中的最大值
  const maxID = Math.max(...existingIDs);

  // 将新的 ID 设置为最大值加一
  const newID = maxID + 1;

  return newID.toString(); // 将新的 ID 转换为字符串
}

  function ReserveTime(props) {
    const initialFormData = {
      reserveDate:'',
      reserveTime:'',
      reserveStu:'',
    }
    const [reserveForm, setReserveForm] = useState(initialFormData); // 存儲選擇的日期
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [matchingStudents, setMatchingStudents] = useState([]);
    const [groupClassStudents, setGroupClassStudents] = useState([]);
    const [showGroupClassStudents, setShowGroupClassStudents] = useState(false);
    
    // const reserveStuData = jsonData
    // .find((item) => item.category === 'class')
    // .classDetail.flatMap((classItem) => 
    //   classItem.reserveDetail.map((reserve) => reserve.reserveStu)
    // );

  // 去重并创建选项列表
  // const uniqueReserveStu = Array.from(new Set(reserveStuData));
  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
  
    if (name === "reserveStu") {
      // 如果用户在下拉菜单中选择了学员，只更新学员名称
      setReserveForm({
        ...reserveForm,
        [name]: value,
      });
  
      // 根据所选学员名称在 matchingStudents 中查找相应的学员信息
      const selectedStudentInfo = matchingStudents.find((student) => student.stuName === value);
  
      // 更新选中的学员信息
      setSelectedStudent(selectedStudentInfo);
    } else {
      // 对于其他表单字段，正常更新
      setReserveForm({
        ...reserveForm,
        [name]: value,
      });
    }
  };
  
  
   // 更新 matchingStudents 的示例
   useEffect(() => {
    const newClassID = props.classes.classID;
    const newMatchingStudents = [];

    jsonData.find((item) => item.category === 'student').stuDetail.forEach((student) => {
      student.buyDetail.forEach((buyInfo) => {
        if (buyInfo.classID === newClassID) {
          newMatchingStudents.push({
            stuName: student.stuName,
            stuID: student.stuID,
            courseType: buyInfo.courseType,
          });
        }
      });
    });

    // 过滤出课程类型为 '團課學生' 的学员数据
    const groupClassStudents = newMatchingStudents.filter(
      (student) => student.courseType === '團課學生'
    );

    setMatchingStudents(newMatchingStudents);
    setGroupClassStudents(groupClassStudents);

    // 判断是否有團課學生数据
    setShowGroupClassStudents(groupClassStudents.length > 0);
  }, [props.classes.classID]);

  console.log('newMatchingStudents:', matchingStudents);
  console.log('groupClassStudents:', groupClassStudents);
  console.log('showGroupClassStudents:', showGroupClassStudents);

const handleSubmit = () => {
  // 获取当前用户选择的学员名称
  const selectedStudentName = reserveForm.reserveStu;
  const existingReserveIDs = jsonData.find((item) => item.category === 'class').classDetail.flatMap((classItem)=>classItem.reserveDetail.map((reserve) => parseInt(reserve.reserveID)));
  const newReserveID = generateUniqueID(existingReserveIDs);
  // 创建用于新预约数据的对象
  const neweReserveData = {
    reserveID: newReserveID,
    reserveDate: reserveForm.reserveDate,
    reserveTime: reserveForm.reserveTime,
    reserveStu: matchingStudents, // 保留所有匹配的学员信息
    cancel: "否",
    attandence: "是",
    note: "你好",
    student: [], // 将在下面更新
  };

  // 更新 student 属性
  if (selectedStudentName) {
    const selectedStudentInfo = matchingStudents.find(
      (student) => student.stuName === selectedStudentName
    );
    if (selectedStudentInfo) {
      neweReserveData.student.push({
        stuID: selectedStudentInfo.stuID,
        courseType: selectedStudentInfo.courseType,
        stuName: selectedStudentInfo.stuName,
      });

      // 判断是否需要添加 '團課學生' 的学员信息到 reserveStu
      if (selectedStudentInfo.courseType === '團課學生') {
        neweReserveData.reserveStu = {
          stuID: selectedStudentInfo.stuID,
          courseType: selectedStudentInfo.courseType,
          stuName: selectedStudentInfo.stuName,
        };
      }
    }
  }
  const updatedJsonData = [...jsonData];

  updatedJsonData.find((item) => item.category === 'class').classDetail.forEach((classItem) => {
    if (classItem.classID === props.classes.classID) { // 替换为你的实际目标 classID
      if (!classItem.reserveDetail) {
        classItem.reserveDetail = []; // 如果没有 reserveDetail 数组，先创建一个
      }

      classItem.reserveDetail.push(neweReserveData);
    } 
  });

  // 清除表单数据（可选）
  setReserveForm(initialFormData);

  console.log(updatedJsonData);
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
                  id="startDate" 
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
            {showGroupClassStudents ? (
              // 如果 courseType 是 '團課教練'，显示團課學生的下拉选单
              <select
                className="form-control"
                name="reserveStu"
                value={reserveForm.reserveStu}
                onChange={handleInputChange}
              >
                <option value="">请选择学员</option>
                  {groupClassStudents.map((student) => (
                  <option key={student.stuID} value={student.stuName}>
                  {student.stuName}
                  </option>
                ))}
              </select>
            ) : (
          // 如果 courseType 不是 '團課教練'，显示原本的下拉选单
          <select
            className="form-control"
            name="reserveStu"
            value={reserveForm.reserveStu}
            onChange={handleInputChange}
          >
            <option value="">请选择学员</option>
              {matchingStudents.map((student) => (
                <option key={student.stuID} value={student.stuName}>
              {student.stuName}
            </option>
            ))}
            </select>
          )}
            </div>
          </div>
          <div className="group-class-students-list">
            <h2>團課學生列表：</h2>
            <ul>
              {groupClassStudents.map((student) => (
                <li key={student.stuID}>{student.stuName}</li>
              ))}
            </ul>
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
  const mapDispatchToProps = {
    updateReserveTime,
  };
  
  export default connect(null, mapDispatchToProps)(ReserveTime);