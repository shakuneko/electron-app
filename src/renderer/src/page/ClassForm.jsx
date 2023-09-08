import React, { useState } from "react";
import Navbar from "../components/Navbar";

function ClassForm() {
    const [toggle,setToggle] = useState(1)

    function updateToggle(id){
        setToggle(id)
    }
  


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
         
          <form className="form">
              <div class="form-group">
                  <label for="exampleInputEmail1">種類:</label>
                  <div className="form_btn">
                    <button className="btn btn-outline-golden" type="button" onClick={()=>updateToggle(1)}>PT</button>
                    <button className="btn btn-outline-golden" type="button" onClick={()=>updateToggle(2)}>皮拉提斯</button>
                    <button className="btn btn-outline-golden" type="button" onClick={()=>updateToggle(3)}>團課</button>
                    <button className="btn btn-outline-golden" type="button" onClick={()=>updateToggle(4)}>場地租借</button>
                  </div>
              </div>
              <div className={toggle === 1 ? "show-content":"content"}>
                <p>hihi</p>

              </div>
              <div className={toggle === 2 ? "show-content":"content"}>
                <p>hi</p>

              </div>
              <div className={toggle === 3 ? "show-content":"content"}>
                <p>bye</p>

              </div>
              <div className={toggle === 4 ? "show-content":"content"}>
                <p>byebye</p>

              </div>
              <div className="form-group">
                  <label  for="exampleInputEmail1">教練:</label>
                  <div className="select">
                    <select className="form-select " >
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
                  <select class="form-select" >
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
                      <select class="form-select " >
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
                    <select class="form-select" >
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
                    <input type="text" class="form-select"></input>
                  </div>
              </div>
              
              <div class="form-group">
                  <label  className="" for="exampleInputEmail1">體驗課:</label>
                  <div className=" check">
                    <div class="form-check">
                      <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value='true' ></input>
                      <label class="form-check-label" for="flexRadioDefault1">
                        是
                      </label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" value='false' ></input>
                      <label class="form-check-label" for="flexRadioDefault2">
                        否
                      </label>
                  </div>
              </div>
              </div>
              <div class="form-group2">
                  <label for="exampleInputPassword1">備註:</label>
                  <div className="select">
                    <textarea class="form-select" id="exampleFormControlTextarea1" rows="3" ></textarea>
                  </div>  
              </div>
              <div class="form-group3">
                <button type="submit" class="btn btn-golden" >新增</button>
              </div>
            </form>
            
         
        </div>
      </div>
    </div>
  )
  }

export default ClassForm