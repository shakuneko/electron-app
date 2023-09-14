import React, {useState } from "react";
import Navbar from "../components/Navbar";
import { connect } from 'react-redux';
import { updateCoachName } from '../redux/Actions/formActions'

function CoachForm(props) {
  
  const initialFormData = {
    coachName:'',
    coachGender: '',
    coachIDcode: '',
    coachPhone:'',
    coachEmail: '',
    coachAddress: '',
    salary:'',
    coachBank:'',
    coachContact: '',
    coachRelation:'',
    coachContact_tel:'',
    coachNote:'',
    major: null, // 新增一个字段用于存储按钮选项值
  };
// 使用状态管理保存表单数据
const [coachForm, setCoachForm] = useState(initialFormData);

// 定義一個處理表單輸入變化的函數
const handleInputChange = (event) => {
  // 從事件對象中獲取輸入的名稱和值
  const{name,value}=event.target;

  setCoachForm ({
    ...coachForm,
    [name]: value,
  });
};

const handleItemClick = (item) => {
  setCoachForm({
    ...coachForm,
    major: item, // 更新按钮选项值
  });
};

// 提交表單的函數
const handleSubmit = (event) => {
event.preventDefault();
props.updateCoachName(coachForm)
// 在這裡處理表單提交的邏輯，可以使用formData中的值
console.log('表单数据：', coachForm);
// 清除表单数据为初始状态
setCoachForm(initialFormData);
};

  return (
    <div className="container-fluid">
      <div className="row form_class row-no-gutters">
        <div className="nav col-2">
          <Navbar /> 
        </div>
        <div className="col-10 new_class2">
          <div className="title_word">
            <p>新增教練</p>
          </div>
            <form className="form"  onSubmit={handleSubmit}>
                <div class="form-group">
                    <label for="exampleInputEmail1">姓名:</label>
                    <div className="select">
                    <input 
                      type="text" 
                      name="coachName"
                      class="form-select" 
                      value={coachForm.coachName}
                      onChange={handleInputChange}
                    ></input>
                    </div>
                </div>
                <div class="form-group">
                    <label for="exampleInputEmail1">性別:</label>
                    <div className="select">
                    <input 
                      type="text" 
                      class="form-select" 
                      name="coachGender"
                      value={coachForm.coachGender}
                      onChange={handleInputChange}
                    ></input>
                    </div>
                </div>
                <div class="form-group">
                    <label for="exampleInputEmail1">身分證字號:</label>
                    <div className="select">
                    <input 
                      type="text" 
                      class="form-select"
                      name="coachIDcode"  
                      value={coachForm.coachIDcode}
                      onChange={handleInputChange}
                    ></input>
                    </div>
                </div>
                <div class="form-group">
                    <label for="exampleInputEmail1">電話:</label>
                    <div className="select">
                    <input 
                      type="text" 
                      name="coachPhone" 
                      class="form-select" 
                      value={coachForm.coachPhone}
                      onChange={handleInputChange}
                    ></input>
                    </div>
                </div>
                <div class="form-group">
                    <label for="exampleInputEmail1">Email:</label>
                    <div className="select">
                    <input 
                      type="text" 
                      name="coachEmail"
                      class="form-select" 
                      value={coachForm.coachEmail}
                      onChange={handleInputChange}
                    ></input>
                    </div>
                </div>
                <div class="form-group">
                    <label for="exampleInputEmail1">地址:</label>
                    <div className="select">
                    <input 
                      type="text" 
                      class="form-select" 
                      name="coachAddress"
                      value={coachForm.coachAddress}
                      onChange={handleInputChange}
                    ></input>
                    </div>
                </div>
                <div class="form-group">
                  <label for="exampleInputEmail1">課程:</label>
                  <div className="form_btn2">
                    <button 
                      type="button" 
                      onClick={() => handleItemClick('PT')}
                      className={`btn btn-outline-golden   ${coachForm.major === 'PT' ? 'active' : ''}`}>PT</button>
                    <button 
                      type="button" 
                      onClick={() => handleItemClick('皮拉提斯')}
                      className={`btn btn-outline-golden   ${coachForm.major === '皮拉提斯' ? 'active' : ''}`}>皮拉提斯</button>
                    <button
                      type="button" 
                      onClick={() => handleItemClick('團課')}
                      className={`btn btn-outline-golden   ${coachForm.major === '團課' ? 'active' : ''}`}>團課</button>
                  </div>
                </div>    
                <div class="form-group">
                    <label for="exampleInputEmail1">堂薪:</label>
                    <div className="select">
                    <input 
                      type="text" 
                      class="form-select" 
                      name="salary"
                      value={coachForm.salary}
                      onChange={handleInputChange}
                    ></input>
                    </div>
                </div>
                <div class="form-group">
                    <label for="exampleInputEmail1">帳戶:</label>
                    <div className="select">
                    <input 
                      type="text" 
                      name="coachBank"
                      class="form-select" 
                      value={coachForm.coachBank}
                      onChange={handleInputChange}
                    ></input>
                    </div>
                </div>
                <div class="form-group">
                    <label for="exampleInputEmail1">緊急連絡人姓名:</label>
                    <div className="select">
                    <input 
                      type="text" 
                      name="coachContact"
                      class="form-select" 
                      value={coachForm.coachContact}
                      onChange={handleInputChange}
                    ></input>
                    </div>
                </div>
                <div class="form-group">
                    <label for="exampleInputEmail1">您與他的關係:</label>
                    <div className="select">
                    <input 
                      type="text"
                      name="coachRelation"
                      class="form-select"
                      value={coachForm.coachRelation}
                      onChange={handleInputChange}
                     ></input>
                    </div>
                </div>
                <div class="form-group">
                    <label for="exampleInputEmail1">緊急連絡人電話:</label>
                    <div className="select">
                    <input 
                      type="text" 
                      name="coachContact_tel"
                      class="form-select" 
                      value={coachForm.coachContact_tel}
                      onChange={handleInputChange}
                    ></input>
                    </div>
                </div>
                <div class="form-group2">
                    <label for="exampleInputPassword1">備註:</label>
                    <div className="select">
                    <textarea 
                      class="form-select" 
                      name="coachNote"
                      rows="3"
                      value={coachForm.coachNote}
                      onChange={handleInputChange}
                    ></textarea>
                    </div>  
                </div>
                <div class="form-group3">
                <button type="submit" class="btn btn-golden">新增</button>
                </div>
            </form>
        </div>
      </div>
    </div>
  )
}
const mapDispatchToProps = {
  updateCoachName,
};

export default connect(null, mapDispatchToProps)(CoachForm);


// import React from 'react';
// import { useSelector } from 'react-redux';
// function CoachForm() {
//   const coachForm = useSelector((state) => state.root.coach.coachForm);
//   const stuForm = useSelector((state) => state.root.stu.stuForm);
//   const classForm = useSelector((state) => state.root.class.classForm);
//   // const { coachForm } = props;
//   // console.log(props);
//   console.log(coachForm);
//   console.log(stuForm);
//   console.log(classForm);
//   return (
//     <div>
//       {/* 使用从 Redux Store 中提取的 JSON 数据来渲染 */}
//       <pre>{JSON.stringify(coachForm, null, 2)}</pre>
//       <pre>{JSON.stringify(stuForm, null, 2)}</pre>
//       <pre>{JSON.stringify(classForm, null, 2)}</pre>
//      </div>
//   );
// }


// export default CoachForm;