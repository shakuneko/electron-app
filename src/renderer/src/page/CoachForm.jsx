import React, {useState } from "react";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from 'react-redux';
import { updateCoachName } from '../redux/Actions/formActions'
// import jsonData from '../json/new_class.json'
import { selectFileName,setCoachFormSave } from "../redux/reducers/saveSlice";
import { useNavigate } from 'react-router-dom';
function generateUniqueID(existingCoachIDs) {
  if (existingCoachIDs.length === 0) {
    return "1";
  } else {
    const maxID = Math.max(...existingCoachIDs);

    // 将新的 ID 设置为最大值加一
    const newID = maxID + 1;
  
    return newID.toString(); // 将新的 ID 转换为字符串
  }
}

function CoachForm(props) {
  const dispatch = useDispatch(); // 获取dispatch函数的引用
  const navigate = useNavigate(); // 获取 navigate 函数
  const [newCoaData, setNewCoaData] = useState({});
  const initialFormData = {
    coachName:'',
    coachGender: '',
    coachIDcode: '',
    coachPhone:'',
    coachEmail: '',
    coachAddress: '',
    coachBank:'',
    coachContact: '',
    coachRelation:'',
    coachContact_tel:'',
    coachNote:'',
    major: null, // 新增一个字段用于存储按钮选项值
    joinDate:'',
    PtSalary:'',
    PilatesSalary:'',
    MassageSalary:'', 
  };
// 使用状态管理保存表单数据
const [coachForm, setCoachForm] = useState(initialFormData);
let newCoachData = props.classes[2].coachDetail.map((item, index) => {
  return item
});
console.log("newCoachData",newCoachData)
//複選按鈕
const [selectedOptions, setSelectedOptions] = useState([]); // 用于存储选中的选项
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
   // 如果选项已经被选中，则从selectedOptions数组中移除它，否则将它添加进去
   if (selectedOptions.includes(item)) {
    setSelectedOptions(selectedOptions.filter((selectedItem) => selectedItem !== item));
    } else {
      setSelectedOptions([...selectedOptions, item]);
    }
  setCoachForm({
    ...coachForm,
    major: selectedOptions,
  });
  setCoachForm((prevCoachForm) => {
    // 如果选项已经被选中，则从selectedOptions数组中移除它，否则将它添加进去
    const updatedOptions = prevCoachForm.major.includes(item)
      ? prevCoachForm.major.filter((selectedItem) => selectedItem !== item)
      : [...prevCoachForm.major, item];
    
    return {
      ...prevCoachForm,
      major: updatedOptions,
    };
  });
};

// 提交表單的函數
const handleSubmit = (event) => {
event.preventDefault();

console.log('表单数据：', coachForm);
// const existingCoachIDs = fileNameData.newJsonData[2].coachDetail.map((coach) => parseInt(coach.coachID));
const existingCoachIDs = newCoachData.map((coach) => coach.coachID);
console.log("existingClassIDs",existingCoachIDs)
const newCoachID = generateUniqueID(existingCoachIDs);

 let _newCoachData = {
  coachID: newCoachID,
  coachName:coachForm.coachName,
  coachGender:coachForm.coachGender,
  coachIDcode:coachForm.coachIDcode,
  coachPhone:coachForm.coachPhone,
  coachEmail:coachForm.coachEmail,
  coachAddress:coachForm.coachEmail,
  coachBank:coachForm.coachBank,
  coachContact:coachForm.coachContact,
  coachRelation:coachForm.coachRelation,
  coachContact_tel:coachForm.coachContact_tel,
  coachNote:coachForm.coachNote,
  major:[coachForm.major], 
  joinDate:coachForm.joinDate,
  PtSalary:coachForm.PtSalary,
  PilatesSalary:coachForm.PilatesSalary,
  MassageSalary:coachForm.MassageSalary, 
  teachClass:[],
};
setNewCoaData(
  _newCoachData
);
dispatch(updateCoachName([...newCoachData, _newCoachData]))
    dispatch(setCoachFormSave({
      data:[...newCoachData, _newCoachData],
      category: "coach",
      id:  newCoachID
    }));
  // const updatedJsonData = [...jsonData];
  //   // 将新的学生数据添加到JSON中
  // updatedJsonData.find((item) => item.category === 'coach').coachDetail.push(_newCoachData);

  // 清除表单数据为初始状态
  setCoachForm(initialFormData);
  setSelectedOptions([]);
  // window.alert('資料填寫完成！');
  navigate('/coach'); // 使用 navigate 进行导航

};

  return (
    <div className="container-fluid">
      <div className="row form_class row-no-gutters">
        <div className="nav col-2">
          <Navbar /> 
        </div>
        <div className="col-10 new_class2">
          <div className="title_word">
            <div className="title_word2">
              <h1>新增教練</h1>
              <div className="title_note">(請在此新增開課教練或場組管理員資料)</div>
            </div>
          </div>
            <form className="form"  onSubmit={handleSubmit}>
            <div class="form-group">
                    <label >建檔日期:</label>
                    <div className="select">
                    <input 
                      type="date" 
                      name="joinDate"
                      class="form-select" 
                      required
                      value={coachForm.joinDate}
                      onChange={handleInputChange}
                    ></input>
                    </div>
                </div>
                <div class="form-group">
                    <label >姓名:</label>
                    <div className="select">
                    <input 
                      type="text" 
                      name="coachName"
                      class="form-select" 
                      required // 表示此字段为必填字段
                      value={coachForm.coachName}
                      onChange={handleInputChange}
                    ></input>
                    </div>
                </div>
                <div class="form-group">
                    <label >性別:</label>
                    <div className="select">
                    <input 
                      type="text" 
                      class="form-select" 
                      name="coachGender"
                      required 
                      value={coachForm.coachGender}
                      onChange={handleInputChange}
                    ></input>
                    </div>
                </div>
                <div class="form-group">
                    <label >身分證字號:</label>
                    <div className="select">
                    <input 
                      type="text" 
                      class="form-select"
                      name="coachIDcode"  
                      required 
                      value={coachForm.coachIDcode}
                      onChange={handleInputChange}
                    ></input>
                    </div>
                </div>
                <div class="form-group">
                    <label >電話:</label>
                    <div className="select">
                    <input 
                      type="text" 
                      name="coachPhone" 
                      class="form-select" 
                      required
                      value={coachForm.coachPhone}
                      onChange={handleInputChange}
                    ></input>
                    </div>
                </div>
                <div class="form-group">
                    <label >Email:</label>
                    <div className="select">
                    <input 
                      type="email" 
                      name="coachEmail"
                      class="form-select" 
                      placeholder="例如：123@gmail.com"
                      value={coachForm.coachEmail}
                      onChange={handleInputChange}
                    ></input>
                    </div>
                </div>
                <div class="form-group">
                    <label >地址:</label>
                    <div className="select">
                    <input 
                      type="text" 
                      class="form-select" 
                      name="coachAddress"
                      required
                      value={coachForm.coachAddress}
                      onChange={handleInputChange}
                    ></input>
                    </div>
                </div>
                <div class="form-group">
                  <label >課程:</label>
                  <div className="form_btn2">
                    <button 
                      type="button" 
                      onClick={() => handleItemClick('PT')}
                      className={`btn btn-outline-golden ${selectedOptions.includes('PT') ? 'active' : ''}`}>PT</button>
                    <button 
                      type="button" 
                      onClick={() => handleItemClick('皮拉提斯')}
                      className={`btn btn-outline-golden ${selectedOptions.includes('皮拉提斯') ? 'active' : ''}`}>皮拉提斯</button>
                    <button
                      type="button" 
                      onClick={() => handleItemClick('運動按摩')}
                      className={`btn btn-outline-golden ${selectedOptions.includes('運動按摩') ? 'active' : ''}`}>運動按摩</button>
                      <button
                      type="button" 
                      onClick={() => handleItemClick('場地租借')}
                      className={`btn btn-outline-golden ${selectedOptions.includes('場地租借') ? 'active' : ''}`}>場地租借</button>
                  </div>
                </div>    
                <div class="form-group">
                    <label >PT堂薪:</label>
                    <div className="select">
                    <input 
                      type="number" 
                      class="form-select" 
                      name="PtSalary"
                      placeholder="請填寫整數數字，例如：1200，如未開課請填0"
                      required
                      value={coachForm.PtSalary}
                      onChange={handleInputChange}
                    ></input>
                    </div>
                </div>
                <div class="form-group">
                    <label >皮拉提斯堂薪:</label>
                    <div className="select">
                    <input 
                      type="number" 
                      class="form-select" 
                      name="PilatesSalary"
                      placeholder="請填寫整數數字，例如：1200，如未開課請填0"
                      required
                      value={coachForm.PilatesSalary}
                      onChange={handleInputChange}
                    ></input>
                    </div>
                </div>
                <div class="form-group">
                    <label>運動按摩堂薪:</label>
                    <div className="select">
                    <input 
                      type="number" 
                      class="form-select" 
                      name="MassageSalary"
                      placeholder="請填寫整數數字，例如：1200，如未開課請填0"
                      required
                      value={coachForm.MassageSalary}
                      onChange={handleInputChange}
                    ></input>
                    </div>
                </div>   
                <div class="form-group">
                    <label>帳戶:</label>
                    <div className="select">
                    <input 
                      type="text" 
                      name="coachBank"
                      class="form-select" 
                      required
                      value={coachForm.coachBank}
                      onChange={handleInputChange}
                    ></input>
                    </div>
                </div>
                <div class="form-group">
                    <label>緊急連絡人姓名:</label>
                    <div className="select">
                    <input 
                      type="text" 
                      name="coachContact"
                      class="form-select" 
                      required
                      value={coachForm.coachContact}
                      onChange={handleInputChange}
                    ></input>
                    </div>
                </div>
                <div class="form-group">
                    <label>您與他的關係:</label>
                    <div className="select">
                    <input 
                      type="text"
                      name="coachRelation"
                      class="form-select"
                      required
                      value={coachForm.coachRelation}
                      onChange={handleInputChange}
                     ></input>
                    </div>
                </div>
                <div class="form-group">
                    <label>緊急連絡人電話:</label>
                    <div className="select">
                    <input 
                      type="text" 
                      name="coachContact_tel"
                      class="form-select" 
                      required
                      value={coachForm.coachContact_tel}
                      onChange={handleInputChange}
                    ></input>
                    </div>
                </div>
                <div class="form-group2">
                    <label>備註:</label>
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

export default CoachForm;


