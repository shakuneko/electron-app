import React, {useState } from "react";
import { useDispatch } from 'react-redux';
import { updateCoachStatus } from "../redux/reducers/saveSlice";

//alert
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function CoachDataModifyDetail ({coachData, coachDetail}) {
    const dispatch = useDispatch(); // 获取dispatch函数的引用
    const [coachForm, setCoachForm] = useState(coachData);
    const [selectedOptions, setSelectedOptions] = useState(coachData.major); // 用于存储选中的选项
    console.log("coachForm data", coachForm, "coachData", coachData)
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
    // console.log("coachForm data second", coachForm)

    const [open, setOpen] = useState(false);
    const handleClose = () => {
    setOpen(false);
    };
    // 提交表單的函數
    const handleSubmit = (event) => {
        event.preventDefault();

        console.log('表單數據：', coachForm);

        let newCoachData = {
            ...coachForm,
            coachName:coachForm.coachName,
            coachGender:coachForm.coachGender,
            coachIDcode:coachForm.coachIDcode,
            coachPhone:coachForm.coachPhone,
            coachBank:coachForm.coachBank,
            coachContact:coachForm.coachContact,
            coachRelation:coachForm.coachRelation,
            coachContact_tel:coachForm.coachContact_tel,
            coachNote:coachForm.coachNote,
            major:coachForm.major, 
            joinDate:coachForm.joinDate,
            PtSalary:coachForm.PtSalary,
            PilatesSalary1:coachForm.PilatesSalary1,
            PilatesSalary2:coachForm.PilatesSalary2,
            exCoursePilatesSalary1:coachForm.exCoursePilatesSalary1,
            exCoursePilatesSalary2:coachForm.exCoursePilatesSalary2,
            MassageSalary:coachForm.MassageSalary, 
            RentSalary:coachForm.RentSalary, 
            teachClass:coachForm.teachClass,
        };
        const updatedCoachData = coachDetail.map((coach) => {
            if (coach.coachID === coachData.coachID) {
              const updatedCoach = {
                ...newCoachData
                // 其他属性也可以在这里更新
              };
        
              return updatedCoach;
            }
            return coach;
          });

         dispatch(updateCoachStatus(updatedCoachData))
        console.log('updateCoachStatus', updateCoachStatus);
        setCoachForm(newCoachData); // local update
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
            <DialogTitle id="alert-dialog-title" style={{ fontWeight:900}}>修改資料</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    已修改 {coachForm.coachName} 教練資料！
                </DialogContentText>
            </DialogContent>
            <DialogActions style={{ marginBottom:"8px" }}>
                <button onClick={handleClose} className='btn btn-golden'>
                    確認
                </button>
            </DialogActions>
        </Dialog>
        <form className="form"  onSubmit={handleSubmit}>
        {/* <div class="form-group">
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
            </div> */}
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
            {/* <div class="form-group">
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
            </div> */}
            <div class="form-group">
                <label >課程種類:</label>
                <div className="form_btn2">
                <div className="form_btn1">
                <button 
                    type="button" 
                    onClick={() => handleItemClick('PT')}
                    className={`btn btn-outline-golden ${selectedOptions.includes('PT') ? 'active' : ''}`}>PT</button>
                <button 
                    type="button" 
                    onClick={() => handleItemClick('基皮')}
                    className={`btn btn-outline-golden ${selectedOptions.includes('基皮') ? 'active' : ''}`}>基皮</button>
                <button 
                    type="button" 
                    onClick={() => handleItemClick('高皮')}
                    className={`btn btn-outline-golden ${selectedOptions.includes('高皮') ? 'active' : ''}`}>高皮</button>
                <button
                    type="button" 
                    onClick={() => handleItemClick('運動按摩')}
                    className={`btn btn-outline-golden ${selectedOptions.includes('運動按摩') ? 'active' : ''}`}>運動按摩</button>
                <button
                    type="button" 
                    onClick={() => handleItemClick('場地租借')}
                    className={`btn btn-outline-golden ${selectedOptions.includes('場地租借') ? 'active' : ''}`}>場地租借</button>
                    </div>
                    <div className="form_btn1">
                    <button
                    type="button" 
                    onClick={() => handleItemClick('體驗PT1v1')}
                    className={`btn btn-outline-golden ${selectedOptions.includes('體驗PT1v1') ? 'active' : ''}`}>體驗PT1v1</button>
                    <button
                    type="button" 
                    onClick={() => handleItemClick('體驗PT1v2')}
                    className={`btn btn-outline-golden ${selectedOptions.includes('體驗PT1v2') ? 'active' : ''}`}>體驗PT1v2</button>
                    <button
                    type="button" 
                    onClick={() => handleItemClick('體驗基皮')}
                    className={`btn btn-outline-golden ${selectedOptions.includes('體驗基皮') ? 'active' : ''}`}>體驗基皮</button>
                    <button
                    type="button" 
                    onClick={() => handleItemClick('體驗高皮')}
                    className={`btn btn-outline-golden ${selectedOptions.includes('體驗高皮') ? 'active' : ''}`}>體驗高皮</button>
                </div>
                </div>
            </div>    
            {selectedOptions.includes('PT') && (
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
            )}
            {selectedOptions.includes('基皮') && (
            <div class="form-group">
                <label >基皮堂薪:</label>
                <div className="select">
                <input 
                    type="number" 
                    class="form-select" 
                    name="PilatesSalary1"
                    placeholder="請填寫整數數字，例如：1200，如未開課請填0"
                    required
                    value={coachForm.PilatesSalary1}
                    onChange={handleInputChange}
                ></input>
                </div>
            </div>
            )}
            {selectedOptions.includes('高皮') && (
            <div class="form-group">
                <label >高皮堂薪:</label>
                <div className="select">
                <input 
                    type="number" 
                    class="form-select" 
                    name="PilatesSalary2"
                    placeholder="請填寫整數數字，例如：1200，如未開課請填0"
                    required
                    value={coachForm.PilatesSalary2}
                    onChange={handleInputChange}
                ></input>
                </div>
            </div>
            )}
            {selectedOptions.includes('運動按摩') && (
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
            )}
                {selectedOptions.includes('場地租借') && (
            <div class="form-group">
                <label>場地租借費用:</label>
                <div className="select">
                <input 
                    type="number" 
                    class="form-select" 
                    name="RentSalary"
                    placeholder="請填寫整數數字，例如：1200，如未開課請填0"
                    required
                    value={coachForm.RentSalary}
                    onChange={handleInputChange}
                ></input>
                </div>
            </div>      
                )}
                {selectedOptions.includes('體驗基皮') && (
            <div class="form-group">
                <label>體驗基皮堂薪:</label>
                <div className="select">
                <input 
                    type="number" 
                    class="form-select" 
                    name="exCoursePilatesSalary1"
                    placeholder="請填寫整數數字，例如：1200，如未開課請填0"
                    required
                    value={coachForm.exCoursePilatesSalary1}
                    onChange={handleInputChange}
                ></input>
                </div>
            </div>      
                )}
                {selectedOptions.includes('體驗高皮') && (
            <div class="form-group">
                <label>體驗高皮堂薪:</label>
                <div className="select">
                <input 
                    type="number" 
                    class="form-select" 
                    name="exCoursePilatesSalary2"
                    placeholder="請填寫整數數字，例如：1200，如未開課請填0"
                    required
                    value={coachForm.exCoursePilatesSalary2}
                    onChange={handleInputChange}
                ></input>
                </div>
            </div>      
                )}
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
            <button type="submit" class="btn btn-golden">修改</button>
            </div>
        </form>
    </div>
  )
}

export default CoachDataModifyDetail;


