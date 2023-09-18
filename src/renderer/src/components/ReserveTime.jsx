//import { DatePicker, Space } from "antd";

// const onChangeDate = (date, dateString) => {
//     console.log(dateString);
//   };
//   const onChangeTime = (time, timeString) => {
//     console.log(timeString);
//   };
import React, { useState } from "react";
import { connect } from "react-redux";
import { updateReserveTime } from "../redux/Actions/formActions"
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
  
      // 清除表单数据（可选）
      setReserveForm(initialFormData);
    };
    // const onChangeDate = (event) => {
    //   const newDate = event.target.value;
    //   setSelectedDate(newDate);
    // };
  
    // const onChangeTime = (event) => {
    //   const newTime = event.target.value;
    //   setSelectedTime(newTime);
    // };
  
    // const handleReservation = () => {
    //   // 在這裡執行預約的相關邏輯，可以使用selectedDate和selectedTime的值
    //   console.log("選擇的日期：", selectedDate);
    //   console.log("選擇的時間：", selectedTime);
    // };
    return (
      <div className="reservetab">
        <p className="reserveboxtitle">學員預約</p>
        <div className="reservebox">
          <div className="reservebox-item">
            <p className="rstitle col-3">日期：</p>
            {/* <DatePicker onChange={onChangeDate} /> */}
            <div className="DatePicksTitle col-9">
                {/*<DatePicker onChange={onChange} picker="month" />*/}
                {/* date picker here */}
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
            {/*<DatePicker onChange={onChange} picker="month" />*/}
            {/* date picker here */}
                <input 
                  id="startDate" 
                  class="form-control" 
                  type="time" 
                  name="reserveTime"
                  value={reserveForm.reserveTime}
                  onChange={handleInputChange}
                />
            </div>
            {/* <DatePicker onChange={onChangeTime} picker="time" /> */}
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