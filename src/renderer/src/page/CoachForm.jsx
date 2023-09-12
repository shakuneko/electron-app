import React, {useState } from "react";
import Navbar from "../components/Navbar";
import { connect } from 'react-redux';
import { updateCoachName } from '../redux/Actions/formActions'
 
function CoachForm(props) {
  
  const initialFormData = {
    name:'',
    gender: '',
    idcode: '',
    tel:'',
    email: '',
    address: '',
    salary:'',
    account:'',
    contact: '',
    relation:'',
    contact_tel:'',
    note:'',
    selectedItem: null, // 新增一个字段用于存储按钮选项值
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
    selectedItem: item, // 更新按钮选项值
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
                      name="name"
                      class="form-select" 
                      value={coachForm.name}
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
                      name="gender"
                      value={coachForm.gender}
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
                      name="idcode"  
                      value={coachForm.idcode}
                      onChange={handleInputChange}
                    ></input>
                    </div>
                </div>
                <div class="form-group">
                    <label for="exampleInputEmail1">電話:</label>
                    <div className="select">
                    <input 
                      type="text" 
                      name="tel" 
                      class="form-select" 
                      value={coachForm.tel}
                      onChange={handleInputChange}
                    ></input>
                    </div>
                </div>
                <div class="form-group">
                    <label for="exampleInputEmail1">Email:</label>
                    <div className="select">
                    <input 
                      type="text" 
                      name="email"
                      class="form-select" 
                      value={coachForm.email}
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
                      name="address"
                      value={coachForm.address}
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
                      className={`btn btn-outline-golden   ${coachForm.selectedItem === 'PT' ? 'active' : ''}`}>PT</button>
                    <button 
                      type="button" 
                      onClick={() => handleItemClick('皮拉提斯')}
                      className={`btn btn-outline-golden   ${coachForm.selectedItem === '皮拉提斯' ? 'active' : ''}`}>皮拉提斯</button>
                    <button
                      type="button" 
                      onClick={() => handleItemClick('團課')}
                      className={`btn btn-outline-golden   ${coachForm.selectedItem === '團課' ? 'active' : ''}`}>團課</button>
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
                      name="account"
                      class="form-select" 
                      value={coachForm.account}
                      onChange={handleInputChange}
                    ></input>
                    </div>
                </div>
                <div class="form-group">
                    <label for="exampleInputEmail1">緊急連絡人姓名:</label>
                    <div className="select">
                    <input 
                      type="text" 
                      name="contact"
                      class="form-select" 
                      value={coachForm.contact}
                      onChange={handleInputChange}
                    ></input>
                    </div>
                </div>
                <div class="form-group">
                    <label for="exampleInputEmail1">您與他的關係:</label>
                    <div className="select">
                    <input 
                      type="text"
                      name="relation"
                      class="form-select"
                      value={coachForm.relation}
                      onChange={handleInputChange}
                     ></input>
                    </div>
                </div>
                <div class="form-group">
                    <label for="exampleInputEmail1">緊急連絡人電話:</label>
                    <div className="select">
                    <input 
                      type="text" 
                      name="contact_tel"
                      class="form-select" 
                      value={coachForm.contact_tel}
                      onChange={handleInputChange}
                    ></input>
                    </div>
                </div>
                <div class="form-group2">
                    <label for="exampleInputPassword1">備註:</label>
                    <div className="select">
                    <textarea 
                      class="form-select" 
                      name="note"
                      rows="3"
                      value={coachForm.note}
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