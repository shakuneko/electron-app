//import { DatePicker, Space } from "antd";

const onChangeDate = (date, dateString) => {
  console.log(dateString);
};
const onChangeTime = (time, timeString) => {
  console.log(timeString);
};
function ReserveTime() {
  return (
    <div className="reservetab">
      <p className="reserveboxtitle">學員預約</p>
      <div className="reservebox">
        <div className="reservebox-item">
          <p className="rstitle">日期：</p>
          {/* <DatePicker onChange={onChangeDate} /> */}
          <div className="DatePicksTitle">
                      {/*<DatePicker onChange={onChange} picker="month" />*/}
                      {/* date picker here */}
                      <input id="datee" class="form-control" type="date" />
                    </div>
        </div>
        <div className="reservebox-item">
          <p className="rstitle">時間：</p>
          <div className="DatePicksTitle">
                      {/*<DatePicker onChange={onChange} picker="month" />*/}
                      {/* date picker here */}
                      <input id="startDate" class="form-control" type="time" />
                    </div>
          {/* <DatePicker onChange={onChangeTime} picker="time" /> */}
        </div>
        <div className="comfirmbtn">
          <button type="button" className="btn btn-primary">
            確定
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReserveTime;