import React, {useState,useEffect } from "react";
import Navbar from "../components/Navbar";
import { connect } from 'react-redux';
import { updateClassForm } from '../redux/Actions/formActions'
import jsonData from '../json/new_class.json'

//找ID最大值並往下增加ID
function generateUniqueID(existingIDs) {
  // 找到现有 ID 中的最大值
  const maxID = Math.max(...existingIDs);

  // 将新的 ID 设置为最大值加一
  const newID = maxID + 1;

  return newID.toString(); // 将新的 ID 转换为字符串
}

function ClassForm(props) {
  //設定每個分頁的初始狀態
  const initialFormData = {
    page1: {
      coachName:'',
      stuName: '',
      stuName2:'',
      coursesAll: '',
      salary:'',
      exCourse:'',
      buyNote: '',
    },
    page2: {
      coachName:'',
      stuName: '',
      coursesAll: '',
      salary:'',
      exCourse:'',
      buyNote: '',
    },
    page3: {
      coachName:'',
      stuName: '',
      coursesAll: '',
      salary:'',
      exCourse:'',
      buyNote: '',
    },
    page4: {
      coachName:'',
      coursesAll: '',
      salary:'',
      buyNote: '',
    },
    page5: {
      coachName:'',
      floor: '',
      date:'',
      time: '',
      buyNote: '',
    },
  };
// 使用状态管理保存表单数据
const [classForm, setClassForm] = useState(initialFormData);

  // 使用状态管理保存当前页面
const [currentPage, setCurrentPage] = useState('page1');
const [studentNames, setStudentNames] = useState([]);
const [selectedCourse, setSelectedCourse] = useState(''); // 用于存储当前所选的课程名称

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
  //下拉選單選學員的名稱，找出學員對應的stuID
  if (name === 'stuName') {
    // 在 JSON 数据中查找对应的学员
    const student = jsonData
      .find((category) => category.category === 'student')
      .stuDetail.find((student) => student.stuName === value);

    if (student) {
      // 这里你可以使用 student 对象，它包含了所选学员的详细信息

      // 获取所选学员的ID
      const selectedStudentID = student.stuID;

      // 构建新购买详情对象
      setClassForm((prevFormData) => ({
        ...prevFormData,
        [page]: {
          ...prevFormData[page],
          stuName: value, // 学员的名称
          stuID: selectedStudentID, // 学员的ID
        },
      }));
    } else {
      console.log('未找到对应学员。');
    }
  } else {
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
  
};

const handleSubmit = (event) => {
  event.preventDefault();
  props.updateClassForm(currentPage,classForm[currentPage])

  // 获取已有的 classID 列表
 const existingClassIDs = jsonData
 .find((item) => item.category === 'class')
 .classDetail.map((class_category) => parseInt(class_category.classID));
 const newClassID = generateUniqueID(existingClassIDs)
// 获取已有的 class 数据
const classData = jsonData.find((item) => item.category === 'class');
const newClassItem = {
  classID: newClassID, 
  courseType: selectedCourse, 
  exCourse: classForm[currentPage].exCourse, 
  coursesAll: classForm[currentPage].coursesAll, 
  reserveDetail:[],
  coach:[],
  student:[],
};
// 推送新的 class 数据对象到 class 数据数组中
classData.classDetail.push(newClassItem);
//  const existingStudentIDs = jsonData
//  .find((item) => item.category === 'student')
//  .stuDetail.map((student) => parseInt(student.stuID));

 // 要加到BuyDetail的資料
 const newBuyDetail = {
  classID: newClassID,
  coachName: classForm[currentPage].coachName,
  stuName: classForm[currentPage].stuName,
  stuName2: classForm[currentPage].stuName2,
  coursesAll: classForm[currentPage].coursesAll,
  salary: classForm[currentPage].salary,
  exCourse: classForm[currentPage].exCourse,
  buyNote: classForm[currentPage].buyNote,
};
  // 在这里处理表单提交的逻辑
  console.log('表单数据：', classForm);

  // 找出ID對應的學員，把BuyDetail資料放進去
  const selectedStudentName = classForm[currentPage].stuName;
  // 查找对应的学员
  const selectedStudent = jsonData
    .find((item) => item.category === 'student')
    .stuDetail.find((student) => student.stuName === selectedStudentName);
  if (selectedStudent) {
    // 获取所选学员的 ID
    // const selectedStudentID = selectedStudent.stuID;
    // 使用学员的 ID 将新购买详情对象添加到学员的 buyDetail 数组中
    selectedStudent.buyDetail.push(newBuyDetail);
 

    // 清除表单数据为初始状态
    setClassForm(initialFormData);

    // 恢复 radio 按钮的原状，将 exCourse 重置为空字符串
    setClassForm((prevFormData) => ({
      ...prevFormData,
      [currentPage]: {
        ...prevFormData[currentPage],
        exCourse: '',
      },
    }));

    // 输出更新后的 jsonData
    console.log(jsonData);
    // 如果你希望在这里将更新后的 jsonData 用于其他操作，可以在这里执行相关逻辑
    // 例如：props.updateJsonData(jsonData);
  } else {
    console.log('未找到对应学生。');
  }
};
//繳費按鈕
const initialButtonData = [
  { text: '已付款', clicked: false, visible: true },
  { text: '未付款', clicked: false, visible: true },

];
const [buttons, setButtons] = useState(initialButtonData);
const handleClick = (index, buttonValue) => {
  // 处理按钮的点击事件，根据索引来确定点击的按钮
  const updatedButtons = [...buttons];
  updatedButtons[index].clicked = true;
  setButtons(updatedButtons);

  // 切换按钮的文本内容
  const updatedText = buttons[index].text === '未付款' ? '已付款' : '未付款';
  const updatedButtonsText = [...buttons];
  updatedButtonsText[index].text = updatedText;
  setButtons(updatedButtonsText);

  console.log('点击的按钮值：', buttonValue);

};

//下拉選單
useEffect(() => {
  // 从 JSON 数据中提取学员名字的列表
  const studentData = jsonData.find((item) => item.category === 'student');
  const studentNames = studentData.stuDetail.map((student) => student.stuName);

  // 更新学员名字列表的状态变量
  setStudentNames(studentNames);
}, []); // 空数组表示仅在组件加载时运行

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
                    <button className={`btn btn-outline-golden page-button ${currentPage === 'page4' ? 'active' : ''}`} type="button" onClick={() => handleButtonClick('page4','團課')}>團課</button>
                    <button className={`btn btn-outline-golden page-button ${currentPage === 'page5' ? 'active' : ''}`} type="button" onClick={() => handleButtonClick('page5','場地租借')}>場地租借</button>
                  </div>
              </div>
              {/* PT課 */}
              {currentPage === 'page1' && (
                <div className="class_category">
                    <div className="form-group">
                        <label  for="exampleInputEmail1">教練:</label>
                        <div className="select">
                          <select className="form-select" 
                          name="coachName"
                          value={classForm.page1.coachName}
                          onChange={(e) => handleInputChange(e, 'page1')}
                          >
                              <option selected>-</option>
                              <option value="A">A</option>
                              <option value="B">B</option>
                              <option value="C">C</option>
                          </select>
                        </div>
                    </div>
                    <div className="form-group4">
                      <div className="form-group4-1"> 
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
                        {buttons[0].visible && (
                          <button
                            type="button"
                            className={`btn btn-originalgray ${buttons[0].clicked ? 'active' : ''}`}
                            onClick={() => handleClick(0, buttons[0].text)}
                          >
                            {buttons[0].text}
                          </button>
                        )}
                        {/* <button className="btn btn-originalgray" type="button">已付費</button> */}
                    </div>
                    <div className="form-group4"> 
                      <div className="form-group4-1">
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
                      {buttons[1].visible && (
                          <div>
                            <button
                              type="button"
                              className={`btn btn-originalgray ${buttons[1].clicked ? 'active' : ''}`}
                              onClick={() => handleClick(1, buttons[1].text)}
                            >
                              {buttons[1].text}
                            </button>
                          </div>
                        )}
                      {/* <button className="btn btn-originalgray" type="button">未付費</button> */}
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
                        <label for="exampleInputEmail1">堂薪:</label>
                        <div className="select">
                          <input 
                            type="text" 
                            class="form-select"
                            name="salary"
                            value={classForm.page1.salary}
                            onChange={(e) => handleInputChange(e, 'page1')}
                          ></input>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label  className="" for="exampleInputEmail1">體驗課:</label>
                        <div className=" check">
                          <div class="form-check">
                            <input 
                              //class="form-check-input" 
                              type="radio"
                              name="exCourse" // 同一组 radio 按钮要使用相同的 name
                              value="true"
                              className={`form-check-input ${classForm.page1.exCourse === 'option1' ? 'checked' : ''}`}
                              // checked={classForm.page1.selectedOption === 'option1'}
                              onChange={(e) => handleRadioChange(e, 'page1')} // 传递页面名称
                             ></input>
                            <label class="form-check-label" for="flexRadioDefault1">
                              是
                            </label>
                          </div>
                          <div class="form-check">
                            <input 
                              type="radio"
                              name="exCourse" // 同一组 radio 按钮要使用相同的 name
                              value="false"
                              className={`form-check-input ${classForm.page1.exCourse === 'option2' ? 'checked' : ''}`}
                              // checked={classForm.page1.selectedOption === 'option2'}
                              onChange={(e) => handleRadioChange(e, 'page1')} // 传递页面名称
                             ></input>
                            <label class="form-check-label" for="flexRadioDefault2">
                              否
                            </label>
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
                                <option value="A">A</option>
                                <option value="B">B</option>
                                <option value="C">C</option>
                            </select>
                          </div>
                      </div>
                      <div className="form-group4">
                        <div className="form-group4-1"> 
                          <label for="exampleInputEmail1">學員1:</label>
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
                          </div>
                          <button className="btn btn-originalgray" type="button">已付費</button>
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
                          <label for="exampleInputEmail1">堂薪:</label>
                          <div className="select">
                            <input 
                            type="text" 
                            class="form-select"
                            name="salary"
                            value={classForm.page2.salary}
                            onChange={(e) => handleInputChange(e, 'page2')}
                            ></input>
                          </div>
                      </div>
                      
                      <div class="form-group">
                          <label  className="" for="exampleInputEmail1">體驗課:</label>
                          <div className=" check">
                            <div class="form-check">
                              <input 
                               type="radio"
                               name="exCourse" // 同一组 radio 按钮要使用相同的 name
                               value="true"
                               className={`form-check-input ${classForm.page2.exCourse === 'option1' ? 'checked' : ''}`}
                               // checked={classForm.page1.selectedOption === 'option2'}
                               onChange={(e) => handleRadioChange(e, 'page2')} // 传递页面名称
                              ></input>
                              <label class="form-check-label" for="flexRadioDefault1">
                                是
                              </label>
                            </div>
                            <div class="form-check">
                              <input 
                               type="radio"
                               name="exCourse" // 同一组 radio 按钮要使用相同的 name
                               value="false"
                               className={`form-check-input ${classForm.page2.exCourse === 'option2' ? 'checked' : ''}`}
                               // checked={classForm.page1.selectedOption === 'option2'}
                               onChange={(e) => handleRadioChange(e, 'page2')} // 传递页面名称
                              ></input>
                              <label class="form-check-label" for="flexRadioDefault2">
                                否
                              </label>
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
                                <option value="A">A</option>
                                <option value="B">B</option>
                                <option value="C">C</option>
                            </select>
                          </div>
                      </div>
                      <div className="form-group4">
                        <div className="form-group4-1"> 
                          <label for="exampleInputEmail1">學員1:</label>
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
                          </div>
                          <button className="btn btn-originalgray" type="button">已付費</button>
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
                          <label for="exampleInputEmail1">堂薪:</label>
                          <div className="select">
                            <input 
                            type="text" 
                            class="form-select"
                            name="salary"
                            value={classForm.page3.salary}
                            onChange={(e) => handleInputChange(e, 'page3')}
                            ></input>
                          </div>
                      </div>
                      
                      <div class="form-group">
                          <label  className="" for="exampleInputEmail1">體驗課:</label>
                          <div className=" check">
                            <div class="form-check">
                              <input 
                               type="radio"
                               name="exCourse" // 同一组 radio 按钮要使用相同的 name
                               value="true"
                               className={`form-check-input ${classForm.page3.exCourse === 'option1' ? 'checked' : ''}`}
                               // checked={classForm.page1.selectedOption === 'option2'}
                               onChange={(e) => handleRadioChange(e, 'page3')} // 传递页面名称
                              ></input>
                              <label class="form-check-label" for="flexRadioDefault1">
                                是
                              </label>
                            </div>
                            <div class="form-check">
                              <input 
                               type="radio"
                               name="exCourse" // 同一组 radio 按钮要使用相同的 name
                               value="false"
                               className={`form-check-input ${classForm.page3.exCourse === 'option2' ? 'checked' : ''}`}
                               // checked={classForm.page1.selectedOption === 'option2'}
                               onChange={(e) => handleRadioChange(e, 'page3')} // 传递页面名称
                              ></input>
                              <label class="form-check-label" for="flexRadioDefault2">
                                否
                              </label>
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
              {/* 團課 */}
              {currentPage === 'page4' && (
                <div className="class_category">
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
                                <option value="A">A</option>
                                <option value="B">B</option>
                                <option value="C">C</option>
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
                              onChange={(e) => handleInputChange(e, 'page4')}
                            >
                                <option selected>-</option>
                                <option value="1">1</option>
                                <option value="10">10</option>
                            </select>
                          </div>
                      </div>
                      <div class="form-group">
                          <label for="exampleInputEmail1">堂薪:</label>
                          <div className="select">
                            <input 
                            type="text" 
                            class="form-select"
                            name="salary"
                            value={classForm.page4.salary}
                            onChange={(e) => handleInputChange(e, 'page4')}
                            ></input>
                          </div>
                      </div>
                      
                      <div class="form-group">
                          <label  className="" for="exampleInputEmail1">體驗課:</label>
                          <div className=" check">
                            <div class="form-check">
                              <input 
                               type="radio"
                               name="exCourse" // 同一组 radio 按钮要使用相同的 name
                               value="true"
                               className={`form-check-input ${classForm.page4.exCourse === 'option1' ? 'checked' : ''}`}
                               // checked={classForm.page1.selectedOption === 'option2'}
                               onChange={(e) => handleRadioChange(e, 'page4')} // 传递页面名称
                              ></input>
                              <label class="form-check-label" for="flexRadioDefault1">
                                是
                              </label>
                            </div>
                            <div class="form-check">
                              <input 
                               type="radio"
                               name="exCourse" // 同一组 radio 按钮要使用相同的 name
                               value="false"
                               className={`form-check-input ${classForm.page4.exCourse === 'option2' ? 'checked' : ''}`}
                               // checked={classForm.page1.selectedOption === 'option2'}
                               onChange={(e) => handleRadioChange(e, 'page4')} // 传递页面名称
                              ></input>
                              <label class="form-check-label" for="flexRadioDefault2">
                                否
                              </label>
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
                            value={classForm.page4.buyNote}
                            onChange={(e) => handleInputChange(e, 'page4')}
                            ></textarea>
                          </div>  
                      </div>
                      <div class="form-group3">
                        <button type="submit" class="btn btn-golden" >新增</button>
                      </div>
                  </div>
              )}
               {/* 場租 */}
               {currentPage === 'page5' && (
                <div className="class_category">
                        <div className="form-group">
                            <label  for="exampleInputEmail1">教練:</label>
                            <div className="select">
                              <select 
                                className="form-select " 
                                name="coachName"
                                value={classForm.page5.coachName}
                                onChange={(e) => handleInputChange(e, 'page5')}
                              >
                                  <option selected>-</option>
                                  <option value="A">A</option>
                                  <option value="B">B</option>
                                  <option value="C">C</option>
                              </select>
                            </div>
                        </div>
                        <div className="form-group">
                            <label  for="exampleInputEmail1">樓層:</label>
                            <div className="select">
                              <select 
                                className="form-select " 
                                name="floor"
                                value={classForm.page5.floor}
                                onChange={(e) => handleInputChange(e, 'page5')}
                              >
                                  <option selected>-</option>
                                  <option value="1">1樓</option>
                                  <option value="2">2樓</option>
                                  <option value="3">3樓</option>
                                  <option value="4">4樓</option>
                              </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="exampleInputEmail1">日期:</label>
                            <div className="select">
                              <input 
                                type="text" 
                                class="form-select" 
                                name="date"
                                value={classForm.page5.date}
                                onChange={(e) => handleInputChange(e, 'page5')}
                              ></input>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="exampleInputEmail1">時間:</label>
                            <div className="select">
                              <input 
                                type="text" 
                                class="form-select" 
                                name="time"
                                value={classForm.page5.time}
                                onChange={(e) => handleInputChange(e, 'page5')}
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
                                value={classForm.page5.buyNote}
                                onChange={(e) => handleInputChange(e, 'page5')}
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
  const mapDispatchToProps = {
    updateClassForm,
  };
  
  export default connect(null, mapDispatchToProps)(ClassForm);

// import React from 'react';
// import { useSelector } from 'react-redux';
// function ClassForm() {
//   const coachForm = useSelector((state) => state.root.coach.coachForm);
//   const stuForm = useSelector((state) => state.root.stu.stuForm);
// const classForm = useSelector((state) => state.root.class.classForm);
//   // const { coachForm } = props;
//   // console.log(props);
//   console.log(coachForm);
//   console.log(stuForm);
//   return (
//     <div>
//       {/* 使用从 Redux Store 中提取的 JSON 数据来渲染 */}
//       <pre>{JSON.stringify(coachForm, null, 2)}</pre>
//       <pre>{JSON.stringify(stuForm, null, 2)}</pre>
// <pre>{JSON.stringify(classForm, null, 2)}</pre>
//      </div>
//   );
// }


// export default ClassForm;