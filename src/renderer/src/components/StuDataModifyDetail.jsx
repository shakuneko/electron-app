import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateStuStatus } from "../redux/reducers/saveSlice";

//Alert
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function StuDataModifyDetail({stuData, stuDetail}) {
    //  // 使用useState來創建一個狀態變數，並初始化為空字串
    const dispatch = useDispatch();
   const [stuForm, setStuForm] = useState(stuData);
   console.log("stuForm data", stuForm)
   //  const _stuForm = useSelector((state) => state.root.stu.stuForm);
 
    // let newStuData = props.classes[1].stuDetail.map((item, index) => {
    //    return item
    //  });
 
    //  console.log("newStuData",newStuData)
    // 定義一個處理表單輸入變化的函數
  
    const handleInputChange = (event) => {
       // 從事件對象中獲取輸入的名稱和值
       const{name,value}=event.target;
 
       setStuForm ({
         ...stuForm,
         [name]: value,
       });
   };
   console.log("stuForm data", stuForm)

   const [open, setOpen] = useState(false);
   const handleClose = () => {
     setOpen(false);
   };

   let stuAge = 0
   if (stuForm.stuBirth) {
       const birthDateString = stuForm.stuBirth;
       const birthDate = new Date(birthDateString);
       const currentDate = new Date();
       let age = currentDate.getFullYear() - birthDate.getFullYear();
   
       if (
         currentDate.getMonth() < birthDate.getMonth() ||
         (currentDate.getMonth() === birthDate.getMonth() &&
           currentDate.getDate() < birthDate.getDate())
       ) {
         age--; // 生日还未到，减去一年
       }
       stuAge = age
   }

   // 提交表單的函數
   const handleSubmit = (event) => {
     event.preventDefault();  
     // 在這裡處理表單提交的邏輯，可以使用formData中的值
     console.log('表單數據：', stuForm);
     
     // 生成唯一的学生ID
    //  let newStudentID = generateUniqueID(existingStuIDs);
     // 假设你要将新的学生数据添加到"student"类别下
     let newStudentData = {
        ...stuForm,
        stuName: stuForm.stuName,
        stuAge: stuAge,
        stuGender: stuForm.stuGender,
        stuPhone: stuForm.stuPhone,
        stuEmail: stuForm.stuEmail,
        stuAddress: stuForm.stuAddress,
        stuContact: stuForm.stuContact,
        stuRelation: stuForm.stuRelation,
        stuContact_tel: stuForm.stuContact_tel,
        stuNote: stuForm.stuNote,
     };
     const updatedStuData = stuDetail.map((student) => {
        if (student.stuID === stuData.stuID) {
          const updatedStudent = {
            ...newStudentData
            // 其他属性也可以在这里更新
          };
      
          return updatedStudent;
        }
        return student;
      });

     dispatch(updateStuStatus(updatedStuData))
     console.log('updatedStuData', updatedStuData);
     setStuForm(newStudentData); // local update
     setOpen(true);
    };



    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                >
                <DialogTitle id="alert-dialog-title" style={{ fontWeight:900}}>修改資料</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        已修改 {stuForm.stuName} 學員資料！
                    </DialogContentText>
                </DialogContent>
                <DialogActions style={{ marginBottom:"8px" }}>
                    <button onClick={handleClose} className='btn btn-golden'>
                        確認
                    </button>
                </DialogActions>
            </Dialog>
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
                        id="tel" 
                        type="date" 
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
                        value={stuAge}
                        //   onChange={handleInputChange} 
                        disabled
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
                    <button type="submit"  class="btn btn-golden" >修改</button>
                
                </div>
            </form>
        </div>
       
    );
  }

export default StuDataModifyDetail;
