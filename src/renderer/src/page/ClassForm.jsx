import React, {useState } from "react";
import Navbar from "../components/Navbar";
import { connect } from 'react-redux';
import { updateClassForm } from '../redux/Actions/formActions'

function ClassForm(props) {
  //設定每個分頁的初始狀態
  const initialFormData = {
    page1: {
      coach:'',
      stu1: '',
      stu2:'',
      number: '',
      salary:'',
      selectedOption: '', // 将 radio 按钮放入 page1 中
      note: '',
    },
    page2: {
      coach:'',
      stu1: '',
      stu2:'',
      number: '',
      salary:'',
      selectedOption: '', 
      note: '',
    },
    page3: {
      coach:'',
      stu1: '',
      stu2:'',
      number: '',
      salary:'',
      selectedOption: '', 
      note: '',
    },
    page4: {
      coach:'',
      stu1: '',
      stu2:'',
      stu3:'',
      number: '',
      salary:'',
      note: '',
    },
    page5: {
      coach:'',
      floor: '',
      date:'',
      time: '',
      note: '',
    },
  };
// 使用状态管理保存表单数据
const [classForm, setClassForm] = useState(initialFormData);

  // 使用状态管理保存当前页面
const [currentPage, setCurrentPage] = useState('page1');


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

};

// 处理 radio 按钮的变化
const handleRadioChange = (event, page) => {
  const { value } = event.target;
  // 更新选定的 radio 按钮值
  setClassForm((prevFormData) => ({
    ...prevFormData,
    [page]: {
      ...prevFormData[page],
      selectedOption: value,
    },
  }));
};

const handleSubmit = (event) => {
  event.preventDefault();
  props.updateClassForm(currentPage,classForm[currentPage])
  // 在这里处理表单提交的逻辑
  console.log('表单数据：', classForm);

  // 清除表单数据为初始状态
  setClassForm(initialFormData);

  // 恢复 radio 按钮的原状，将 selectedOption 重置为空字符串
  setClassForm((prevFormData) => ({
    ...prevFormData,
    [currentPage]: {
      ...prevFormData[currentPage],
      selectedOption: '',
    },
  }));

  
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
                    <button className={`btn btn-outline-golden page-button ${currentPage === 'page1' ? 'active' : ''}`} type="button" onClick={() => setCurrentPage('page1')}>PT</button>
                    <button className={`btn btn-outline-golden page-button ${currentPage === 'page2' ? 'active' : ''}`} type="button" onClick={() => setCurrentPage('page2')}>皮拉提斯</button>
                    <button className={`btn btn-outline-golden page-button ${currentPage === 'page3' ? 'active' : ''}`} type="button" onClick={() => setCurrentPage('page3')}>運動按摩</button>
                    <button className={`btn btn-outline-golden page-button ${currentPage === 'page4' ? 'active' : ''}`} type="button" onClick={() => setCurrentPage('page4')}>團課</button>
                    <button className={`btn btn-outline-golden page-button ${currentPage === 'page5' ? 'active' : ''}`} type="button" onClick={() => setCurrentPage('page5')}>場地租借</button>
                  </div>
              </div>
              {/* PT課 */}

              {currentPage === 'page1' && (
                <div className="class_category">
                    <div className="form-group">
                        <label  for="exampleInputEmail1">教練:</label>
                        <div className="select">
                          <select className="form-select" 
                          name="coach"
                          value={classForm.page1.coach}
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
                          name="stu1"
                          value={classForm.page1.stu1}
                          onChange={(e) => handleInputChange(e, 'page1')}
                        >
                            <option selected>-</option>
                            <option value="1">Lulu</option>
                            <option value="2">田晴瑄</option>
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
                            name="stu2"
                            value={classForm.page1.stu2}
                            onChange={(e) => handleInputChange(e, 'page1')}
                            >
                                <option selected>-</option>
                                <option value="1">Lulu</option>
                                <option value="2">田晴瑄</option>
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
                            name="number"
                            value={classForm.page1.number}
                            onChange={(e) => handleInputChange(e, 'page1')}
                          >
                              <option selected>-</option>
                              <option value="1">1</option>
                              <option value="10">10</option>
                              <option value="20">20</option>
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
                              name="selectedOption" // 同一组 radio 按钮要使用相同的 name
                              value="true"
                              className={`form-check-input ${classForm.page1.selectedOption === 'option1' ? 'checked' : ''}`}
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
                              name="selectedOption" // 同一组 radio 按钮要使用相同的 name
                              value="false"
                              className={`form-check-input ${classForm.page1.selectedOption === 'option2' ? 'checked' : ''}`}
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
                          name="note"
                          value={classForm.page1.note}
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
                              name="coach"
                              value={classForm.page2.coach}
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
                            name="stu1"
                            value={classForm.page2.stu1}
                            onChange={(e) => handleInputChange(e, 'page2')} 
                          >
                              <option selected>-</option>
                              <option value="1">Lulu</option>
                              <option value="2">田晴瑄</option>
                          </select>
                          </div>
                          </div>
                          <button className="btn btn-originalgray" type="button">已付費</button>
                      </div>
                      <div className="form-group4"> 
                        <div className="form-group4-1">
                            <label for="exampleInputEmail1">學員2:</label>
                            <div className="select">
                              <select 
                                class="form-select " 
                                name="stu2"
                                value={classForm.page2.stu2}
                                onChange={(e) => handleInputChange(e, 'page2')}
                              >
                                  <option selected>-</option>
                                  <option value="1">Lulu</option>
                                  <option value="2">田晴瑄</option>
                              </select>
                            </div>
                        </div>
                        <button className="btn btn-originalgray" type="button">未付費</button>
                      </div>
                      <div className="form-group">
                          <label for="exampleInputEmail1">堂數:</label>
                          <div className="select">
                            <select 
                              class="form-select" 
                              name="number"
                              value={classForm.page2.number}
                              onChange={(e) => handleInputChange(e, 'page2')}
                            >
                                <option selected>-</option>
                                <option value="1">1</option>
                                <option value="10">10</option>
                                <option value="20">20</option>
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
                               name="selectedOption" // 同一组 radio 按钮要使用相同的 name
                               value="true"
                               className={`form-check-input ${classForm.page2.selectedOption === 'option1' ? 'checked' : ''}`}
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
                               name="selectedOption" // 同一组 radio 按钮要使用相同的 name
                               value="false"
                               className={`form-check-input ${classForm.page2.selectedOption === 'option2' ? 'checked' : ''}`}
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
                            name="note"
                            value={classForm.page2.note}
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
                              name="coach"
                              value={classForm.page3.coach}
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
                            name="stu1"
                            value={classForm.page3.stu1}
                            onChange={(e) => handleInputChange(e, 'page3')} 
                          >
                              <option selected>-</option>
                              <option value="1">Lulu</option>
                              <option value="2">田晴瑄</option>
                          </select>
                          </div>
                          </div>
                          <button className="btn btn-originalgray" type="button">已付費</button>
                      </div>
                      <div className="form-group4"> 
                        <div className="form-group4-1">
                            <label for="exampleInputEmail1">學員2:</label>
                            <div className="select">
                              <select 
                                class="form-select " 
                                name="stu2"
                                value={classForm.page3.stu2}
                                onChange={(e) => handleInputChange(e, 'page3')}
                              >
                                  <option selected>-</option>
                                  <option value="1">Lulu</option>
                                  <option value="2">田晴瑄</option>
                              </select>
                            </div>
                        </div>
                        <button className="btn btn-originalgray" type="button">未付費</button>
                      </div>
                      <div className="form-group">
                          <label for="exampleInputEmail1">堂數:</label>
                          <div className="select">
                            <select 
                              class="form-select" 
                              name="number"
                              value={classForm.page3.number}
                              onChange={(e) => handleInputChange(e, 'page3')}
                            >
                                <option selected>-</option>
                                <option value="1">1</option>
                                <option value="10">10</option>
                                <option value="20">20</option>
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
                               name="selectedOption" // 同一组 radio 按钮要使用相同的 name
                               value="true"
                               className={`form-check-input ${classForm.page3.selectedOption === 'option1' ? 'checked' : ''}`}
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
                               name="selectedOption" // 同一组 radio 按钮要使用相同的 name
                               value="false"
                               className={`form-check-input ${classForm.page3.selectedOption === 'option2' ? 'checked' : ''}`}
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
                            name="note"
                            value={classForm.page3.note}
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
                              name="coach"
                              value={classForm.page4.coach}
                              onChange={(e) => handleInputChange(e, 'page4')} 
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
                            name="stu1"
                            value={classForm.page4.stu1}
                            onChange={(e) => handleInputChange(e, 'page4')} 
                          >
                              <option selected>-</option>
                              <option value="1">Lulu</option>
                              <option value="2">田晴瑄</option>
                          </select>
                          </div>
                          </div>
                          <button className="btn btn-originalgray" type="button">已付費</button>
                      </div>
                      <div className="form-group4"> 
                        <div className="form-group4-1">
                            <label for="exampleInputEmail1">學員2:</label>
                            <div className="select">
                              <select 
                                class="form-select " 
                                name="stu2"
                                value={classForm.page4.stu2}
                                onChange={(e) => handleInputChange(e, 'page4')}
                              >
                                  <option selected>-</option>
                                  <option value="1">Lulu</option>
                                  <option value="2">田晴瑄</option>
                              </select>
                            </div>
                        </div>
                        <button className="btn btn-originalgray" type="button">未付費</button>
                      </div>
                      <div className="form-group4"> 
                        <div className="form-group4-1">
                            <label for="exampleInputEmail1">學員3:</label>
                            <div className="select">
                              <select 
                                class="form-select " 
                                name="stu2"
                                value={classForm.page4.stu3}
                                onChange={(e) => handleInputChange(e, 'page4')}
                              >
                                  <option selected>-</option>
                                  <option value="1">Lulu</option>
                                  <option value="2">田晴瑄</option>
                              </select>
                            </div>
                        </div>
                        <button className="btn btn-originalgray" type="button">未付費</button>
                      </div>
                      <div className="form-group">
                          <label for="exampleInputEmail1">堂數:</label>
                          <div className="select">
                            <select 
                              class="form-select" 
                              name="number"
                              value={classForm.page4.number}
                              onChange={(e) => handleInputChange(e, 'page4')}
                            >
                                <option selected>-</option>
                                <option value="1">1</option>
                                <option value="10">10</option>
                                <option value="20">20</option>
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
                               name="selectedOption" // 同一组 radio 按钮要使用相同的 name
                               value="true"
                               className={`form-check-input ${classForm.page4.selectedOption === 'option1' ? 'checked' : ''}`}
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
                               name="selectedOption" // 同一组 radio 按钮要使用相同的 name
                               value="false"
                               className={`form-check-input ${classForm.page4.selectedOption === 'option2' ? 'checked' : ''}`}
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
                            name="note"
                            value={classForm.page4.note}
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
                                name="coach"
                                value={classForm.page5.coach}
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
                                name="note"
                                value={classForm.page5.note}
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