import React, {useState } from "react";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from 'react-redux';
import { updateStuForm } from '../redux/Actions/formActions'
import {  selectFileName,setStudentFormSave } from "../redux/reducers/saveSlice";
// import { useNavigate } from 'react-router-dom';
//alert
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
function generateUniqueID(existingStuIDs) {
  if (existingStuIDs.length === 0) {
    return "1";
  } else {
    const maxID = Math.max(...existingStuIDs);

    // 将新的 ID 设置为最大值加一
    const newID = maxID + 1;
  
    return newID.toString(); // 将新的 ID 转换为字符串
  }
}
function StudentForm(props){
  const dispatch = useDispatch(); // 获取dispatch函数的引用
  // const navigate = useNavigate(); // 获取 navigate 函数
  const fileNameData = useSelector(selectFileName);
  const [newStudentData, setNewStudentData] = useState({});
  const initialFormData = {
    stuID:'',
    stuName:'',
    stuGender: '',
    stuBirth:'',
    stuAge:'',
    stuPhone: '',
    stuContact: '',
    stuRelation:'',
    stuContact_tel:'',
    stuNote:'',
    createDate:'',
  };
  //  // 使用useState來創建一個狀態變數，並初始化為空字串
   const [stuForm, setStuForm] = useState(initialFormData);
  //  const _stuForm = useSelector((state) => state.root.stu.stuForm);

   let newStuData = props.classes[1].stuDetail.map((item, index) => {
      return item
    });

    console.log("newStuData",newStuData)
   // 定義一個處理表單輸入變化的函數
 
   const handleInputChange = (event) => {
      // 從事件對象中獲取輸入的名稱和值
      const{name,value}=event.target;

      setStuForm ({
        ...stuForm,
        [name]: value,
      });
  };
 
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  // 提交表單的函數
  const handleSubmit = (event) => {
    event.preventDefault();  
    // 在這裡處理表單提交的邏輯，可以使用formData中的值
    console.log('表单数据：', stuForm);

     // 获取已有的学生 ID 列表
    // const existingStudentIDs = jsonData.find((item) => item.category === 'student').stuDetail.map((student) => parseInt(student.stuID));
    const existingStuIDs = newStuData.map((student) => student.stuID);
    
    // 生成唯一的学生ID
    let newStudentID = generateUniqueID(existingStuIDs);
    // 假设你要将新的学生数据添加到"student"类别下
    let _newStudentData = {
      stuID: newStudentID,
      stuName: stuForm.stuName,
      stuGender: stuForm.stuGender,
      stuPhone: stuForm.stuPhone,
      stuBirth:stuForm.stuBirth,
      stuAge:stuForm.stuAge,
      stuContact: stuForm.stuContact,
      stuRelation: stuForm.stuRelation,
      stuContact_tel: stuForm.stuContact_tel,
      stuNote: stuForm.stuNote,
      createDate: stuForm.createDate,
      buyDetail: [],
    };
    const updatedStuData = [...newStuData, _newStudentData];
    dispatch(updateStuForm(updatedStuData))
    dispatch(setStudentFormSave({
      data:updatedStuData,
      category: "student",
     
    }));

    // 清除表单数据为初始状态
    setStuForm(initialFormData);
    // navigate('/student'); // 使用 navigate 进行导航
    setOpen(true);
    
    
  };

  return (
    
    <div className="container-fluid">
       <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title" style={{ fontWeight:900}}>新增完成</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              已添加一筆新的學員資料！
            </DialogContentText>
          </DialogContent>
          <DialogActions style={{ marginBottom:"8px" }}>
            <button onClick={handleClose} className='btn btn-golden'>
              確認
            </button>
          </DialogActions>
        </Dialog>
      <div className="row form_class row-no-gutters">
        <div className="nav col-2">
          <Navbar /> 
        </div>
        <div className="col-10 new_class">
          <div className="title_word">
            <div className="title_word2"> 
              <h1>新增學員</h1>
              <div className="title_note">(請在此新增上課學員或場租人資料)</div>
            </div>
          </div>
            <form className="form" onSubmit={handleSubmit}>
              {/* <div class="form-group">
                    <label>建檔日期:</label>
                    <div className="select">
                    <input 
                      id="tel" 
                      type="date" 
                      name="createDate"
                      class="form-select" 
                      required
                      value={stuForm.createDate}
                      onChange={handleInputChange} 
                    ></input>
                    </div>
                </div> */}
                <div class="form-group">
                    <label>姓名:</label>
                    <div className="select">
                    <input 
                      id="name" 
                      name="stuName"
                      type="text" 
                      class="form-select" 
                      required
                      value={stuForm.stuName}
                      onChange={handleInputChange}
                    ></input>
                    </div>
                </div>
                <div class="form-group">
                    <label>性別:</label>
                    <div className="select">
                    <input 
                      id="gender"
                      type="text" 
                      name="stuGender"
                      class="form-select" 
                      required
                      value={stuForm.stuGender}
                      onChange={handleInputChange} 
                    ></input>
                    </div>
                </div>
                <div class="form-group">
                    <label>出生年月日:</label>
                    <div className="select">
                    <input 
                      id="birth"
                      type="text" 
                      name="stuBirth"
                      class="form-select" 
                      required
                      value={stuForm.stuBirth}
                      onChange={handleInputChange} 
                    ></input>
                    </div>
                </div>
                <div class="form-group">
                    <label>年齡:</label>
                    <div className="select">
                    <input 
                      id="age"
                      type="text" 
                      name="stuAge"
                      class="form-select" 
                      required
                      value={stuForm.stuAge}
                      onChange={handleInputChange} 
                    ></input>
                    </div>
                </div>
                <div class="form-group">
                    <label>電話:</label>
                    <div className="select">
                    <input 
                      id="tel" 
                      type="text" 
                      name="stuPhone"
                      class="form-select" 
                      required
                      value={stuForm.stuPhone}
                      onChange={handleInputChange} 
                    ></input>
                    </div>
                </div>
                {/* <div class="form-group">
                    <label>Email:</label>
                    <div className="select">
                    <input 
                      id="email"
                      type="email" 
                      name="stuEmail"
                      class="form-select" 
                      placeholder="例如：123@gmail.com"
                      value={stuForm.stuEmail}
                      onChange={handleInputChange} 
                    ></input>
                    </div>
                </div>
                <div class="form-group">
                    <label>地址:</label>
                    <div className="select">
                    <input 
                      id="address" 
                      type="text" 
                      name="stuAddress"
                      class="form-select"  
                      required
                      value={stuForm.stuAddress}
                      onChange={handleInputChange}  
                    ></input>
                    </div>
                </div> */}
                <div class="form-group">
                    <label>緊急連絡人姓名:</label>
                    <div className="select">
                    <input 
                      id="contact" 
                      type="text" 
                      name="stuContact"
                      class="form-select" 
                      required
                      value={stuForm.stuContact}
                      onChange={handleInputChange} 
                    ></input>
                    </div>
                </div>
                <div class="form-group">
                    <label>您與他的關係:</label>
                    <div className="select">
                    <input 
                      id="relation" 
                      type="text" 
                      name="stuRelation"
                      class="form-select" 
                      required
                      value={stuForm.stuRelation}
                      onChange={handleInputChange} 
                    ></input>
                    </div>
                </div>
                <div class="form-group">
                    <label>緊急連絡人電話:</label>
                    <div className="select">
                    <input 
                      id="contact_tel" 
                      type="text" 
                      name="stuContact_tel"
                      class="form-select" 
                      required
                      value={stuForm.stuContact_tel}
                      onChange={handleInputChange} 
                    ></input>
                    </div>
                </div>
                <div class="form-group2">
                    <label>備註:</label>
                    <div className="select">
                    <textarea 
                      id="note" 
                      name="stuNote"
                      class="form-select" 
                      rows="3"
                      value={stuForm.stuNote}
                      onChange={handleInputChange} 
                    ></textarea>
                    </div>  
                </div>
                <div class="form-group3">
                <button type="submit"  class="btn btn-golden" >新增</button>
                
                </div>
            </form>
        </div>
      </div>
    </div>
  )
}


export default StudentForm;