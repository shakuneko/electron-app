import React, { useState,useRef } from "react";
import Navbar from "../components/Navbar";
import { useForm } from "react-hook-form";

function ClassForm() {
  
  // 分頁
  const [toggle,setToggle] = useState(1)

  function updateToggle(id){
      setToggle(id)
  }
  // useForm
  const {register,handleSubmit, reset} = useForm();
  const submit = (data, e)=>{
    console.log(data);
    e.target.reset();
}
  const handleReset = () => {
    reset();
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
         
          <form className="form"  onSubmit={handleSubmit(submit)}>
              <div class="form-group">
                  <label for="exampleInputEmail1">種類:</label>
                  <div className="form_btn">
                    <button className="btn btn-outline-golden" type="button" onClick={()=>updateToggle(1)}>PT</button>
                    <button className="btn btn-outline-golden" type="button" onClick={()=>updateToggle(2)}>皮拉提斯</button>
                    <button className="btn btn-outline-golden" type="button" onClick={()=>updateToggle(3)}>團課</button>
                    <button className="btn btn-outline-golden" type="button" onClick={()=>updateToggle(4)}>場地租借</button>
                  </div>
              </div>
              {/* PT課 */}
              <div className={toggle === 1 ? "show-content":"content"}>
                <div className="class_category">
                    <div className="form-group">
                        <label  for="exampleInputEmail1">教練:</label>
                        <div className="select">
                          <select className="form-select" {...register("coach", { required: true })}>
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
                        <select class="form-select" {...register("stu1", { required: true })}>
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
                            <select class="form-select " {...register("stu2", { required: true })}>
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
                          <select class="form-select" {...register("number", { required: true })}>
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
                          {...register("salary", { required: true })}
                          // value={classform.name}
                          // onChange={changrValue}
                          ></input>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label  className="" for="exampleInputEmail1">體驗課:</label>
                        <div className=" check">
                          <div class="form-check">
                            <input 
                            class="form-check-input" 
                            type="radio" 
                            name="flexRadioDefault" 
                            id="flexRadioDefault1" 
                            value='true'
                            {...register("lesson", { required: true })}
                             ></input>
                            <label class="form-check-label" for="flexRadioDefault1">
                              是
                            </label>
                          </div>
                          <div class="form-check">
                            <input class="form-check-input" 
                            type="radio" 
                            name="flexRadioDefault"
                             id="flexRadioDefault2" 
                             value='false' 
                             {...register("lesson", { required: true })}
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
                          <textarea class="form-select" id="exampleFormControlTextarea1" rows="3" {...register("note", { required: true })}></textarea>
                        </div>  
                    </div>
                    <div class="form-group3">
                      <button type="submit" class="btn btn-golden" >新增</button>
                    </div>
                </div>

              </div>
               {/* 皮拉提斯課 */}
              <div className={toggle === 2 ? "show-content":"content"}>
                <div className="class_category">
                      <div className="form-group">
                          <label  for="exampleInputEmail1">教練:</label>
                          <div className="select">
                            <select className="form-select " {...register("coach2", { required: true })} >
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
                          <select class="form-select"{...register("stu12", { required: true })} >
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
                              <select class="form-select " {...register("stu22", { required: true })}>
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
                            <select class="form-select" {...register("numder2", { required: true })}>
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
                            <input type="text" class="form-select"{...register("salary2", { required: true })}></input>
                          </div>
                      </div>
                      
                      <div class="form-group">
                          <label  className="" for="exampleInputEmail1">體驗課:</label>
                          <div className=" check">
                            <div class="form-check">
                              <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value='true'{...register("lesson2", { required: true })} ></input>
                              <label class="form-check-label" for="flexRadioDefault1">
                                是
                              </label>
                            </div>
                            <div class="form-check">
                              <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" value='false' {...register("lesson2", { required: true })}></input>
                              <label class="form-check-label" for="flexRadioDefault2">
                                否
                              </label>
                          </div>
                      </div>
                      </div>
                      <div class="form-group2">
                          <label for="exampleInputPassword1">備註:</label>
                          <div className="select">
                            <textarea class="form-select" id="exampleFormControlTextarea1" rows="3" {...register("note2", { required: true })}></textarea>
                          </div>  
                      </div>
                      <div class="form-group3">
                        <button type="submit" class="btn btn-golden" >新增</button>
                      </div>
                  </div>

              </div>
              {/* 團課 */}
              <div className={toggle === 3 ? "show-content":"content"}>
                <p>bye</p>

              </div>
              
               {/* 場租 */}
              <div className={toggle === 4 ? "show-content":"content"}>
                <div className="class_category">
                        <div className="form-group">
                            <label  for="exampleInputEmail1">教練:</label>
                            <div className="select">
                              <select className="form-select " {...register("coach3", { required: true })}>
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
                              <select className="form-select " {...register("floor", { required: true })}>
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
                              <input type="text" class="form-select" {...register("date", { required: true })}></input>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="exampleInputEmail1">時間:</label>
                            <div className="select">
                              <input type="text" class="form-select" {...register("time", { required: true })}></input>
                            </div>
                        </div>
                        <div class="form-group2">
                            <label for="exampleInputPassword1">備註:</label>
                            <div className="select">
                              <textarea class="form-select" id="exampleFormControlTextarea1" rows="3" {...register("note3", { required: true })}></textarea>
                            </div>  
                        </div>
                        <div class="form-group3">
                          <button type="submit" class="btn btn-golden">新增</button>
                        </div>
                    </div>
              </div>
             
              
            </form>
            
         
        </div>
      </div>
    </div>
  )
  }

export default ClassForm