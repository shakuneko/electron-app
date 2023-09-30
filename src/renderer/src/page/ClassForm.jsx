import React, {useState,useEffect } from "react";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from 'react-redux';
import Radio from '@mui/joy/Radio';

import { selectFileName,setClassFormSave,addNewBuyDetail,addTeachClass} from '../redux/reducers/saveSlice'
//找ID最大值並往下增加ID
function generateUniqueID(existingClassIDs) {
  if (existingClassIDs.length === 0) {
    return "1";
  } else {
    const maxID = Math.max(...existingClassIDs);

    // 将新的 ID 设置为最大值加一
    const newID = maxID + 1;
  
    return newID.toString(); // 将新的 ID 转换为字符串
  }
}


function ClassForm(props) {
  const dispatch = useDispatch(); // 获取dispatch函数的引用

  //設定每個分頁的初始狀態
  const fileNameData = useSelector(selectFileName);
  const stuID = fileNameData.newJsonData[1].stuDetail[0].stuID;
  console.log('stuID:', stuID);
  // 现在，fileNameData包含了filename的数据，你可以在这里使用它
  console.log('FileName Data:', fileNameData);
  //找學生ID
  function findStudentIDByName(studentName) {
    const matchingStudent = fileNameData.newJsonData[1].stuDetail.find(student => student.stuName === studentName);
    return matchingStudent ? matchingStudent.stuID : '';
  }
//找教練ID
function findCoachIDByName(CoachName) {
  const matchingCoach = fileNameData.newJsonData[2].coachDetail.find((coach) => coach.coachName === CoachName);
  return matchingCoach ? matchingCoach.coachID : '';
}
  const initialFormData = {
    page1: {
      coachName:'',
      stuName: '',
      stuName2:'',
      coursesAll: '',
      buyDate:'',
      coursePrice:'',
      payMethod:'',
      invoiceNum:'',
      invoiceNum2:'',
      exCourse:'',
      exCoursePrice:'',
      buyNote: '',
    },
    page2: {
      coachName:'',
      stuName: '',
      coursesAll: '',
      buyDate:'',
      coursePrice:'',
      payMethod:'',
      invoiceNum:'',
      exCourse:'',
      exCoursePrice:'',
      buyNote: '',
    },
    page3: {
      coachName:'',
      stuName: '',
      buyDate:'',
      coursePrice:'',
      payMethod:'',
      coursePrice:'',
      invoiceNum:'',
      exCourse:'',
      exCoursePrice:'',
      buyNote: '',
    },
    page4: {
      coachName:'',
      stuName:'',
      floor: '',
      coursesAll:'',
      coursePrice:'',
      invoiceNum:'',
      buyNote: '',
    },
  };
// 使用状态管理保存表单数据
const [classForm, setClassForm] = useState(initialFormData);
const [currentPage, setCurrentPage] = useState('page1');   // 使用状态管理保存当前页面
const [studentNames, setStudentNames] = useState([]);
const [coachNames, setCoachNames] = useState([]);
const [selectedCourse, setSelectedCourse] = useState(''); // 用于存储当前所选的课程名称
const [isRadioSelected, setIsRadioSelected] = useState(false); //體驗課按鈕

let newClassData = props.classes[0].classDetail.map((item, index) => {
  return item
});
console.log("newClassData",newClassData)

 // 处理分頁点击按钮事件
 const handleButtonClick = (page, courseName) => {
  setCurrentPage(page);
  setSelectedCourse(courseName); // 更新所选的课程名称
};


// 定義一個處理表單輸入變化的函數
const handleInputChange = (event,page) => {
  // 從事件對象中獲取輸入的名稱和值
  const{name,value}=event.target;
  setClassForm((prevFormData) => ({
    ...prevFormData,
    [page]: {
      ...prevFormData[page],
      [name]: value,
    },
  }));

  
  //下拉選單選學員的名稱，找出學員、教練對應的ID
  if (name === 'stuName') {
      // 构建新购买详情对象
      setClassForm((prevFormData) => ({
        ...prevFormData,
        [page]: {
          ...prevFormData[page],
          stuName: value, // 学员的名称
          stuID: findStudentIDByName(classForm[currentPage].stuName), 
        },
      }));
  } else
    if (name === 'coachName') {
      setClassForm((prevFormData) => ({
        ...prevFormData,
        [page]: {
          ...prevFormData[page],
          coachName: value, 
          coachID: findCoachIDByName(classForm[currentPage].coachName), 
        },
      }));
  }
  else {
    // 非学员名字字段的处理逻辑，直接更新表单数据
    setClassForm((prevFormData) => ({
      ...prevFormData,
      [page]: {
        ...prevFormData[page],
        [name]: value,
      },
    }));
  }

};

// 处理 radio 按钮的变化
const handleRadioChange = (event, page) => {
  const { value } = event.target;
  // 更新选定的 radio 按钮值
  setClassForm((prevFormData) => ({
    ...prevFormData,
    [page]: {
      ...prevFormData[page],
      exCourse: value,
    },
  }));
  // 将isRadioSelected标记为已选中
  setIsRadioSelected(true);
};
//付款方式按鈕
const [selectedOption, setSelectedOption] = useState(); // 用于存储选中的选项
const handleItemClick = (item, page) => {
  // 判断是否点击了相同的按钮，如果是，取消选择，否则选择新的按钮
  if (selectedOption === item) {
    setSelectedOption('');
  } else {
    setSelectedOption(item);
  }

  // 将所选的支付方式存储到表单数据中，并将分页信息一并存储
  setClassForm((prevFormData) => ({
    ...prevFormData,
    [page]: {
      ...prevFormData[page],
      payMethod: item,
    },
  }));

  // 返回分页和选项值
  return { page, item };
};

const handleSubmit = (event) => {
  event.preventDefault();

  // 获取已有的 classID 列表
  const existingClassIDs = fileNameData.newJsonData[0].classDetail.map((class_category) => parseInt(class_category.classID));
  console.log("existingClassIDs",existingClassIDs)
  const newClassID = generateUniqueID(existingClassIDs);
  const addCoachName = classForm[currentPage].coachName;
  const addStudentName1 = classForm[currentPage].stuName;
  let addStudentName2 = '';

 if (currentPage === 'page1') {
  addStudentName2 = classForm[currentPage].stuName2;
}
const newClassItem = {
  classID: newClassID, 
  courseType: selectedCourse, 
  exCourse: classForm[currentPage].exCourse, 
  exCoursePrice:classForm[currentPage].exCoursePrice, 
  coursesAll: classForm[currentPage].coursesAll,
  courseLeft:classForm[currentPage].coursesAll,
  coursesFIN:'',
  courseFlag:[],
  payMethod: classForm[currentPage].payMethod, 
  floor:classForm[currentPage].floor,
  reserveDetail:[],
  coach: [
    {
      coachID: findCoachIDByName(addCoachName),
      coachName: addCoachName,
    }
  ],
  student: [
    {
      stuID: findStudentIDByName(addStudentName1),
      courseType: selectedCourse,
      stuName: addStudentName1,
    }
  ],
};

// 如果在 page1 表单中填写了第二名学生的姓名，添加到 student 数组中
if (addStudentName2) {
  newClassItem.student.push({
    stuID: findStudentIDByName(addStudentName2),
    courseType: selectedCourse,
    stuName: addStudentName2,
  });
}

//coach>coachDetail>TeachClass
const selectedCoachName = classForm[currentPage].coachName;  
const newTeachClass ={
    classID: newClassID,
  } 
  const selectedCoach = fileNameData.newJsonData[2].coachDetail.find((coach) => coach.coachName === selectedCoachName);
  if (selectedCoach) {
    dispatch(addTeachClass({ selectedCoachName, newTeachClass }));
  }
  

  // 找出ID對應的學員，把BuyDetail資料放進去
  const newBuyDetail = {
    classID: newClassID,
    coachName: classForm[currentPage].coachName,
    coursesAll: classForm[currentPage].coursesAll,
    coursePrice: classForm[currentPage].coursePrice,
    courseType: selectedCourse,
    exCourse: classForm[currentPage].exCourse,
    buyNote: classForm[currentPage].buyNote,
    buyDate:classForm[currentPage].buyDate,
    courseLeft:classForm[currentPage].coursesAll,
    coursesFIN:'',
    payMethod:classForm[currentPage].payMethod,
    preCourseLeft:'',
  };
   // 傳遞學員1的資料到BuyDetail頁面
  const selectedStudentName = classForm[currentPage].stuName;
  const selectedStudent = fileNameData.newJsonData[1].stuDetail.find((student) => student.stuName === selectedStudentName);
  if (selectedStudent) {
    const newBuyDetailWithInvoiceNum = {
      ...newBuyDetail, // 复制newBuyDetail中的所有属性
      invoiceNum: classForm[currentPage].invoiceNum // 设置invoiceNum属性
    };
    dispatch(addNewBuyDetail({ selectedStudentName, newBuyDetail: newBuyDetailWithInvoiceNum }));
 
  }

  // 傳遞學員2的資料到BuyDetail頁面
  const selectedStudentName2 = classForm[currentPage].stuName2;
  const selectedStudent2 = fileNameData.newJsonData[1].stuDetail.find((student) => student.stuName === selectedStudentName2);
  if (selectedStudent2) {
    const newBuyDetailWithInvoiceNum2 = {
      ...newBuyDetail, // 复制newBuyDetail中的所有属性
      invoiceNum: classForm[currentPage].invoiceNum2 // 设置invoiceNum属性
    };
    dispatch(addNewBuyDetail({ selectedStudentName2, newBuyDetail: newBuyDetailWithInvoiceNum2 }));
  
  }

   const updatedClassData = [...newClassData, newClassItem];
  //  dispatch(updateStuForm(updatedStuData))
   dispatch(setClassFormSave({
     data:updatedClassData,
     category: "class",
    
   }));

   // 清除表单数据为初始状态
   setClassForm(initialFormData);

  //  console.log(jsonData);
   console.log(updatedClassData);
   console.log('FileName Data:', fileNameData);
  
};


//下拉選單
useEffect(() => {
  // 从 fileNameData 中提取学员名字的列表
  const studentDetail = fileNameData.newJsonData[1].stuDetail;
  const studentNames = studentDetail.map((student) => student.stuName);

  // 从 fileNameData 中提取教练名字的列表
  const coachDetail = fileNameData.newJsonData[2].coachDetail;
  const coachNames = coachDetail.map((coach) => coach.coachName);

  // 更新学员名字列表和教练名字列表的状态变量
  setStudentNames(studentNames);
  setCoachNames(coachNames);
}, [fileNameData]); // 当 fileNameData 发生变化时运行

  return (
    <div className="container-fluid">
      <div className="row form_class row-no-gutters">
        <div className="nav col-2">
          <Navbar /> 
        </div>
        <div className="col-10 new_class">
          <div className="title_word">
            <p>新增課程</p>
          </div>
         
          <form className="form"  onSubmit={handleSubmit}>
              <div class="form-group">
                  <label for="exampleInputEmail1">種類:</label>
                  <div className="form_btn">
                    <button className={`btn btn-outline-golden page-button ${currentPage === 'page1' ? 'active' : ''}`} type="button" onClick={() => handleButtonClick('page1','PT')}>PT</button>
                    <button className={`btn btn-outline-golden page-button ${currentPage === 'page2' ? 'active' : ''}`} type="button" onClick={() => handleButtonClick('page2','皮拉提斯')}>皮拉提斯</button>
                    <button className={`btn btn-outline-golden page-button ${currentPage === 'page3' ? 'active' : ''}`} type="button" onClick={() => handleButtonClick('page3','運動按摩')}>運動按摩</button>
                    <button className={`btn btn-outline-golden page-button ${currentPage === 'page4' ? 'active' : ''}`} type="button" onClick={() => handleButtonClick('page4','場地租借')}>場地租借</button>                 
                  </div>
              </div>
              {/* PT課 */}
              {currentPage === 'page1' && (
                <div className="class_category">
                   <div class="form-group">
                        <label for="exampleInputEmail1">建檔日期:</label>
                        <div className="select">
                          <input 
                            type="date" 
                            class="form-select"
                            name="buyDate"
                            value={classForm.page1.buyDate}
                            onChange={(e) => handleInputChange(e, 'page1')}
                          ></input>
                        </div>
                    </div>
                    <div className="form-group">
                        <label  for="exampleInputEmail1">教練:</label>
                        <div className="select">
                          <select className="form-select" 
                          name="coachName"
                          value={classForm.page1.coachName}
                          onChange={(e) => handleInputChange(e, 'page1')}
                          >
                            <option selected>-</option>
                              {coachNames.map((name) => (
                              <option key={name} value={name}>
                              {name}
                            </option>
                            ))}
                          </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label for="exampleInputEmail1">學員1:</label>
                        <div className="select">
                        <select 
                          class="form-select" 
                          name="stuName"
                          value={classForm.page1.stuName}
                          onChange={(e) => handleInputChange(e, 'page1')}
                        >
                            <option selected>-</option>
                              {studentNames.map((name) => (
                                <option key={name} value={name}>
                                {name}
                            </option>
                            ))}
                        </select>
                        </div>     
                    </div>
                    <div className="form-group"> 
                          <label for="exampleInputEmail1">學員2:</label>
                          <div className="select">
                            <select 
                            class="form-select " 
                            name="stuName2"
                            value={classForm.page1.stuName2}
                            onChange={(e) => handleInputChange(e, 'page1')}
                            >
                              <option selected>-</option>
                                {studentNames.map((name) => (
                                <option key={name} value={name}>
                                {name}
                              </option>
                            ))}
                            </select>
                      </div>                
                    </div>
                    <div className="form-group">
                        <label for="exampleInputEmail1">堂數:</label>
                        <div className="select">
                          <select 
                            class="form-select" 
                            name="coursesAll"
                            value={classForm.page1.coursesAll}
                            onChange={(e) => handleInputChange(e, 'page1')}
                          >
                              <option selected>-</option>
                              <option value="1">1</option>
                              <option value="10">10</option>
                          </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="exampleInputEmail1">購買金額:</label>
                        <div className="select">
                          <input 
                            type="number" 
                            class="form-select"
                            name="coursePrice"
                            placeholder="請填寫整數數字，例如：1200"
                            value={classForm.page1.coursePrice}
                            onChange={(e) => handleInputChange(e, 'page1')}
                          ></input>
                        </div>
                    </div>
                  <div class="form-group">
                    <label for="exampleInputEmail1">購買方式:</label>
                    <div className="form_btn2">
                      <button 
                        type="button" 
                        onClick={() => {
                          const { page, item } = handleItemClick('現金', currentPage);
                          console.log(`用户在分页 ${page} 选择了付款方式：${item}`);
                        }}
                        className={`btn btn-outline-golden ${selectedOption === '現金' ? 'active' : ''}`}> 
                        現金
                      </button>
                      <button 
                        type="button" 
                        onClick={() => {
                          const { page, item } = handleItemClick('匯款', currentPage);
                          console.log(`用户在分页 ${page} 选择了付款方式：${item}`);
                        }}
                        className={`btn btn-outline-golden ${selectedOption === '匯款' ? 'active' : ''}`}>
                          匯款
                      </button>
                      <button
                        type="button" 
                        onClick={() => {
                          const { page, item } = handleItemClick('刷卡', currentPage);
                          console.log(`用户在分页 ${page} 选择了付款方式：${item}`);
                        }}
                        className={`btn btn-outline-golden ${selectedOption === '刷卡' ? 'active' : ''}`}>
                        刷卡
                      </button>
                      </div>
                    </div>
                    <div class="form-group">
                          <label for="exampleInputEmail1">發票號碼1:</label>
                          <div className="select">
                            <input 
                            type="text" 
                            class="form-select"
                            name="invoiceNum"
                            value={classForm.page1.invoiceNum}
                            onChange={(e) => handleInputChange(e, 'page1')}
                            ></input>
                          </div>
                      </div>   
                      <div class="form-group">
                          <label for="exampleInputEmail1">發票號碼2:</label>
                          <div className="select">
                            <input 
                            type="text" 
                            class="form-select"
                            name="invoiceNum2"
                            value={classForm.page1.invoiceNum2}
                            onChange={(e) => handleInputChange(e, 'page1')}
                            ></input>
                          </div>
                      </div>          
                      <div class="form-group">
                        <label  className="" for="exampleInputEmail1">體驗課:</label>
                        <div className=" check">
                          <div class="form-check">
                          <Radio
                            name="exCourse" // 同一组 radio 按钮要使用相同的 name
                            value="是"
                            label="是"
                            checked={classForm.page1.exCourse === '是'}
                            onChange={(e) => handleRadioChange(e, 'page1')} // 传递页面名称 
                          >
                          </Radio>
                          </div>
                          <div class="form-check">
                          <Radio
                            name="exCourse" // 同一组 radio 按钮要使用相同的 name
                            value="否"
                            label="否"
                            checked={classForm.page1.exCourse === '否'}
                            onChange={(e) => handleRadioChange(e, 'page1')} // 传递页面名称    
                          ></Radio>
                          </div>
                          <div className="select">
                            <input 
                              type="number" 
                              class="form-select"
                              name="exCoursePrice"
                              placeholder="體驗課金額(不是體驗課請填0)"
                              value={classForm.page1.exCoursePrice}
                              onChange={(e) => handleInputChange(e, 'page1')}
                            ></input>
                          </div>
                    </div>
                    </div>
                    <div class="form-group2">
                        <label for="exampleInputPassword1">備註:</label>
                        <div className="select">
                          <textarea 
                          class="form-select" 
                          id="exampleFormControlTextarea1" 
                          rows="3" 
                          name="buyNote"
                          value={classForm.page1.buyNote}
                          onChange={(e) => handleInputChange(e, 'page1')}
                          ></textarea>
                        </div>  
                    </div>
                    <div class="form-group3">
                      <button type="submit" onClick={handleSubmit}class="btn btn-golden" >新增</button>
                    </div>
                </div>
                )}
               {/* 皮拉提斯課 */}
               {currentPage === 'page2' && (
                <div className="class_category">
                      <div class="form-group">
                          <label for="exampleInputEmail1">建檔日期:</label>
                          <div className="select">
                            <input 
                              type="date" 
                              class="form-select"
                              name="buyDate"
                              value={classForm.page2.buyDate}
                              onChange={(e) => handleInputChange(e, 'page2')}
                            ></input>
                          </div>
                      </div>
                      <div className="form-group">
                          <label  for="exampleInputEmail1">教練:</label>
                          <div className="select">
                            <select 
                              className="form-select " 
                              name="coachName"
                              value={classForm.page2.coachName}
                              onChange={(e) => handleInputChange(e, 'page2')} 
                            >
                              <option selected>-</option>
                                {coachNames.map((name) => (
                                <option key={name} value={name}>
                                {name}
                              </option>
                              ))}
                            </select>
                          </div>
                      </div>
                      <div className="form-group">
                          <label for="exampleInputEmail1">學員:</label>
                          <div className="select">
                          <select 
                            class="form-select"
                            name="stuName"
                            value={classForm.page2.stuName}
                            onChange={(e) => handleInputChange(e, 'page2')} 
                          >
                            <option selected>-</option>
                              {studentNames.map((name) => (
                              <option key={name} value={name}>
                              {name}
                            </option>
                            ))}
                          </select>
                        </div>
                        {/* <button className="btn btn-originalgray" type="button">已付費</button> */}
                      </div>
                      <div className="form-group">
                          <label for="exampleInputEmail1">堂數:</label>
                          <div className="select">
                            <select 
                              class="form-select" 
                              name="coursesAll"
                              value={classForm.page2.coursesAll}
                              onChange={(e) => handleInputChange(e, 'page2')}
                            >
                                <option selected>-</option>
                                <option value="1">1</option>
                                <option value="10">10</option>
                            </select>
                          </div>
                      </div>
                      <div class="form-group">
                          <label for="exampleInputEmail1">購買金額:</label>
                          <div className="select">
                            <input 
                            type="number" 
                            class="form-select"
                            name="coursePrice"
                            placeholder="請填寫整數數字，例如：1200"
                            value={classForm.page2.coursePrice}
                            onChange={(e) => handleInputChange(e, 'page2')}
                            ></input>
                          </div>
                      </div>
                      <div class="form-group">
                      <label for="exampleInputEmail1">購買方式:</label>
                      <div className="form_btn2">
                      <button 
                        type="button" 
                        onClick={() => {
                          const { page, item } = handleItemClick('現金', currentPage);
                          console.log(`用户在分页 ${page} 选择了付款方式：${item}`);
                        }}
                        className={`btn btn-outline-golden ${selectedOption === '現金' ? 'active' : ''}`}> 
                        現金
                      </button>
                      <button 
                        type="button" 
                        onClick={() => {
                          const { page, item } = handleItemClick('匯款', currentPage);
                          console.log(`用户在分页 ${page} 选择了付款方式：${item}`);
                        }}
                        className={`btn btn-outline-golden ${selectedOption === '匯款' ? 'active' : ''}`}>
                          匯款
                      </button>
                      <button
                        type="button" 
                        onClick={() => {
                          const { page, item } = handleItemClick('刷卡', currentPage);
                          console.log(`用户在分页 ${page} 选择了付款方式：${item}`);
                        }}
                        className={`btn btn-outline-golden ${selectedOption === '刷卡' ? 'active' : ''}`}>
                        刷卡
                      </button>
                      </div>
                      </div> 
                      <div class="form-group">
                          <label for="exampleInputEmail1">發票號碼:</label>
                          <div className="select">
                            <input 
                            type="text" 
                            class="form-select"
                            name="invoiceNum"
                            value={classForm.page1.invoiceNum}
                            onChange={(e) => handleInputChange(e, 'page1')}
                            ></input>
                          </div>
                      </div>   
                      <div class="form-group">
                          <label  className="" for="exampleInputEmail1">體驗課:</label>
                          <div className=" check">
                          <div class="form-check">
                          <Radio
                            name="exCourse" // 同一组 radio 按钮要使用相同的 name
                            value="是"
                            label="是"
                            checked={classForm.page2.exCourse === '是'}
                            onChange={(e) => handleRadioChange(e, 'page2')} // 传递页面名称 
                          >
                          </Radio>
                          </div>
                          <div class="form-check">
                          <Radio
                            name="exCourse" // 同一组 radio 按钮要使用相同的 name
                            value="否"
                            label="否"
                            checked={classForm.page2.exCourse === '否'}
                            onChange={(e) => handleRadioChange(e, 'page2')} // 传递页面名称    
                          ></Radio>
                          </div>
                          <div className="select">
                            <input 
                              type="number" 
                              class="form-select"
                              name="exCoursePrice"
                              placeholder="體驗課金額(不是體驗課請填0)"
                              value={classForm.page2.exCoursePrice}
                              onChange={(e) =>
                                handleInputChange(e, 'page2')}
                            ></input>
                          </div>
                      </div>
                      </div>
                      <div class="form-group2">
                          <label for="exampleInputPassword1">備註:</label>
                          <div className="select">
                            <textarea 
                            class="form-select" 
                            id="exampleFormControlTextarea1" 
                            rows="3" 
                            name="buyNote"
                            value={classForm.page2.buyNote}
                            onChange={(e) => handleInputChange(e, 'page2')}
                            ></textarea>
                          </div>  
                      </div>
                      <div class="form-group3">
                        <button type="submit" class="btn btn-golden" >新增</button>
                      </div>
                  </div>
              )}
               {/* 運動按摩 */}
               {currentPage === 'page3' && (
                <div className="class_category">
                    <div class="form-group">
                          <label for="exampleInputEmail1">建檔日期:</label>
                          <div className="select">
                            <input 
                              type="date" 
                              class="form-select"
                              name="buyDate"
                              value={classForm.page3.buyDate}
                              onChange={(e) => handleInputChange(e, 'page3')}
                            ></input>
                          </div>
                      </div>
                      <div className="form-group">
                          <label  for="exampleInputEmail1">教練:</label>
                          <div className="select">
                            <select 
                              className="form-select " 
                              name="coachName"
                              value={classForm.page3.coachName}
                              onChange={(e) => handleInputChange(e, 'page3')} 
                            >
                              <option selected>-</option>
                                {coachNames.map((name) => (
                                <option key={name} value={name}>
                                {name}
                              </option>
                              ))}
                            </select>
                          </div>
                      </div>
                      <div className="form-group">
                          <label for="exampleInputEmail1">學員:</label>
                          <div className="select">
                          <select 
                            class="form-select"
                            name="stuName"
                            value={classForm.page3.stuName}
                            onChange={(e) => handleInputChange(e, 'page3')} 
                          >
                              <option selected>-</option>
                                {studentNames.map((name) => (
                                <option key={name} value={name}>
                                {name}
                              </option>
                            ))}
                          </select>
                        </div>
                        {/* <button className="btn btn-originalgray" type="button">已付費</button> */}
                      </div>
                      <div className="form-group">
                          <label for="exampleInputEmail1">堂數:</label>
                          <div className="select">
                            <select 
                              class="form-select" 
                              name="coursesAll"
                              value={classForm.page3.coursesAll}
                              onChange={(e) => handleInputChange(e, 'page3')}
                            >
                                <option selected>-</option>
                                <option value="1">1</option>
                                <option value="10">10</option>
                            </select>
                          </div>
                      </div>
                      <div class="form-group">
                          <label for="exampleInputEmail1">購買金額:</label>
                          <div className="select">
                            <input 
                            type="number" 
                            class="form-select"
                            name="coursePrice"
                            placeholder="請填寫整數數字，例如：1200"
                            value={classForm.page3.coursePrice}
                            onChange={(e) => handleInputChange(e, 'page3')}
                            ></input>
                          </div>
                      </div>
                      <div class="form-group">
                    <label for="exampleInputEmail1">購買方式:</label>
                    <div className="form_btn2">
                      <button 
                        type="button" 
                        onClick={() => {
                          const { page, item } = handleItemClick('現金', currentPage);
                          console.log(`用户在分页 ${page} 选择了付款方式：${item}`);
                        }}
                        className={`btn btn-outline-golden ${selectedOption === '現金' ? 'active' : ''}`}> 
                        現金
                      </button>
                      <button 
                        type="button" 
                        onClick={() => {
                          const { page, item } = handleItemClick('匯款', currentPage);
                          console.log(`用户在分页 ${page} 选择了付款方式：${item}`);
                        }}
                        className={`btn btn-outline-golden ${selectedOption === '匯款' ? 'active' : ''}`}>
                          匯款
                      </button>
                      <button
                        type="button" 
                        onClick={() => {
                          const { page, item } = handleItemClick('刷卡', currentPage);
                          console.log(`用户在分页 ${page} 选择了付款方式：${item}`);
                        }}
                        className={`btn btn-outline-golden ${selectedOption === '刷卡' ? 'active' : ''}`}>
                        刷卡
                      </button>
                    </div>
                    </div> 
                    <div class="form-group">
                          <label for="exampleInputEmail1">發票號碼:</label>
                          <div className="select">
                            <input 
                            type="text" 
                            class="form-select"
                            name="invoiceNum"
                            value={classForm.page3.invoiceNum}
                            onChange={(e) => handleInputChange(e, 'page3')}
                            ></input>
                          </div>
                      </div>      
                      <div class="form-group">
                          <label  className="" for="exampleInputEmail1">體驗課:</label>
                          <div className=" check">
                          <div class="form-check">
                          <Radio
                            name="exCourse" // 同一组 radio 按钮要使用相同的 name
                            value="是"
                            label="是"
                            checked={classForm.page3.exCourse === '是'}
                            onChange={(e) => handleRadioChange(e, 'page3')} // 传递页面名称 
                          >
                          </Radio>
                          </div>
                          <div class="form-check">
                          <Radio
                            name="exCourse" // 同一组 radio 按钮要使用相同的 name
                            value="否"
                            label="否"
                            checked={classForm.page3.exCourse === '否'}
                            onChange={(e) => handleRadioChange(e, 'page3')} // 传递页面名称    
                          ></Radio>
                          </div>
                          <div className="select">
                            <input 
                              type="number" 
                              class="form-select"
                              name="exCoursePrice"
                              placeholder="體驗課金額(不是體驗課請填0)"
                              value={classForm.page3.exCoursePrice}
                              onChange={(e) => handleInputChange(e, 'page3')}
                            ></input>
                          </div>
                      </div>
                      </div>
                      <div class="form-group2">
                          <label for="exampleInputPassword1">備註:</label>
                          <div className="select">
                            <textarea 
                            class="form-select" 
                            id="exampleFormControlTextarea1" 
                            rows="3" 
                            name="buyNote"
                            value={classForm.page3.buyNote}
                            onChange={(e) => handleInputChange(e, 'page3')}
                            ></textarea>
                          </div>  
                      </div>
                      <div class="form-group3">
                        <button type="submit" class="btn btn-golden" >新增</button>
                      </div>
                  </div>
              )}
               {/* 場租 */}
               {currentPage === 'page4' && (
                <div className="class_category">
                      <div class="form-group">
                            <label for="exampleInputEmail1">建檔日期:</label>
                            <div className="select">
                              <input 
                                type="date" 
                                class="form-select"
                                name="buyDate"
                                value={classForm.page4.buyDate}
                                onChange={(e) => handleInputChange(e, 'page4')}
                              ></input>
                            </div>
                        </div>
                        <div className="form-group">
                            <label  for="exampleInputEmail1">教練:</label>
                            <div className="select">
                              <select 
                                className="form-select " 
                                name="coachName"
                                value={classForm.page4.coachName}
                                onChange={(e) => handleInputChange(e, 'page4')}
                              >
                                <option selected>-</option>
                                  {coachNames.map((name) => (
                                  <option key={name} value={name}>
                                  {name}
                                </option>
                                ))}
                              </select>
                            </div>
                        </div>
                        <div className="form-group">
                          <label for="exampleInputEmail1">學員:</label>
                          <div className="select">
                          <select 
                            class="form-select"
                            name="stuName"
                            value={classForm.page3.stuName}
                            onChange={(e) => handleInputChange(e, 'page3')} 
                          >
                              <option selected>-</option>
                                {studentNames.map((name) => (
                                <option key={name} value={name}>
                                {name}
                              </option>
                            ))}
                          </select>
                        </div>
                        {/* <button className="btn btn-originalgray" type="button">已付費</button> */}
                      </div>
                        <div className="form-group">
                            <label  for="exampleInputEmail1">樓層:</label>
                            <div className="select">
                              <select 
                                className="form-select " 
                                name="floor"
                                value={classForm.page4.floor}
                                onChange={(e) => handleInputChange(e, 'page4')}
                              >
                                  <option selected>-</option>
                                  <option value="1">1樓</option>
                                  <option value="2">2樓</option>
                                  <option value="3">3樓</option>
                                  <option value="4">4樓</option>
                              </select>
                            </div>
                        </div>
                        <div className="form-group">
                          <label for="exampleInputEmail1">堂數:</label>
                          <div className="select">
                            <select 
                              class="form-select" 
                              name="coursesAll"
                              value={classForm.page4.coursesAll}
                              onChange={(e) => handleInputChange(e, 'page5')}
                            >
                                <option selected>-</option>
                                <option value="1">1</option>
                                <option value="5">5</option>
                                <option value="10">10</option>
                            </select>
                          </div>
                      </div>
                      <div class="form-group">
                          <label for="exampleInputEmail1">購買金額:</label>
                          <div className="select">
                            <input 
                            type="number" 
                            class="form-select"
                            name="coursePrice"
                            placeholder="請填寫整數數字，例如：1200"
                            value={classForm.page4.coursePrice}
                            onChange={(e) => handleInputChange(e, 'page5')}
                            ></input>
                          </div>
                      </div>
                      <div class="form-group">
                    <label for="exampleInputEmail1">購買方式:</label>
                    <div className="form_btn2">
                      <button 
                        type="button" 
                        onClick={() => {
                          const { page, item } = handleItemClick('現金', currentPage);
                          console.log(`用户在分页 ${page} 选择了付款方式：${item}`);
                        }}
                        className={`btn btn-outline-golden ${selectedOption === '現金' ? 'active' : ''}`}> 
                        現金
                      </button>
                      <button 
                        type="button" 
                        onClick={() => {
                          const { page, item } = handleItemClick('匯款', currentPage);
                          console.log(`用户在分页 ${page} 选择了付款方式：${item}`);
                        }}
                        className={`btn btn-outline-golden ${selectedOption === '匯款' ? 'active' : ''}`}>
                          匯款
                      </button>
                      <button
                        type="button" 
                        onClick={() => {
                          const { page, item } = handleItemClick('刷卡', currentPage);
                          console.log(`用户在分页 ${page} 选择了付款方式：${item}`);
                        }}
                        className={`btn btn-outline-golden ${selectedOption === '刷卡' ? 'active' : ''}`}>
                        刷卡
                        </button>
                      </div>
                      </div>  
                      <div class="form-group">
                          <label for="exampleInputEmail1">發票號碼:</label>
                          <div className="select">
                            <input 
                            type="text" 
                            class="form-select"
                            name="invoiceNum"
                            value={classForm.page4.invoiceNum}
                            onChange={(e) => handleInputChange(e, 'page4')}
                            ></input>
                          </div>
                      </div>      
                        <div class="form-group2">
                            <label for="exampleInputPassword1">備註:</label>
                            <div className="select">
                              <textarea 
                                class="form-select" 
                                id="exampleFormControlTextarea1" 
                                rows="3" 
                                name="buyNote"
                                value={classForm.page4.buyNote}
                                onChange={(e) => handleInputChange(e, 'page6')}
                              ></textarea>
                            </div>  
                        </div>
                        <div class="form-group3">
                          <button type="submit" class="btn btn-golden">新增</button>
                        </div>
                    </div>
                     )}
                </form>
              </div>
              <div>
             
              </div>
        </div>
      </div>
  )
  }
  
  
  export default ClassForm;

