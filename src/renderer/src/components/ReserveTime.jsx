
import React, { useState } from "react";
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
  
    const handleInputChange = (event) => {
      // 從事件對象中獲取輸入的名稱和值
      const{name,value}=event.target;
    
      setReserveForm ({
        ...reserveForm,
        [name]: value,
      });
    };
    const handleSubmit = () => {
      // 调用Redux操作以更新预约数据
      props.updateReserveTime(reserveForm);
      console.log(reserveForm);

      const existingReserveIDs = jsonData.find((item) => item.category === 'class').classDetail.flatMap((classItem)=>classItem.reserveDetail.map((reserve) => parseInt(reserve.reserveID)));
      const newReserveID = generateUniqueID(existingReserveIDs);

      const neweReserveData = {
        reserveID: newReserveID,
        reserveDate:reserveForm.reserveDate,
        reserveTime:reserveForm.reserveTime,
        reserveStu:reserveForm.reserveStu,
        cancel:"否",
        attandence:"是",
        note:"你好",
        student:[],
      };

      const updatedJsonData = [...jsonData];
      // 将新的学生数据添加到JSON中
      
      // 找到目标的classDetail
      const classDetail = updatedJsonData
        .find((item) => item.category === 'class')
        .classDetail;
      
      // 循环处理每个classItem并将新的reserveData添加到它们的reserveDetail数组中
      classDetail.forEach((classItem) => {
        if (classItem.reserveDetail) {
          classItem.reserveDetail.push(neweReserveData);
        }
      });
      
      console.log(updatedJsonData);
  
      // 清除表单数据（可选）
      setReserveForm(initialFormData);

      console.log(jsonData);
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
            <p className="rstitle col-3">時間：</p>
            <div className="DatePicksTitle col-9">
            <select 
              class="form-control"
              name="reserveStu"
              value={reserveForm.reserveStu} 
              onChange={handleInputChange}
            >
              <option value="option1">選項1</option>
              <option value="option2">選項2</option>
              <option value="option3">選項3</option>
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
  const mapDispatchToProps = {
    updateReserveTime,
  };
  
  export default connect(null, mapDispatchToProps)(ReserveTime);