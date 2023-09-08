import React from "react";
import Navbar from "../components/Navbar";


function From() {
  return (
    <div className="container-fluid" style={{backgroundColor:"white"}}>
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
                    <button className="btn btn-outline-primary" type="button">PT</button>
                    <button className="btn btn-outline-primary" type="button">皮拉提斯</button>
                    <button className="btn btn-outline-primary" type="button">團課</button>
                    <button className="btn btn-outline-primary" type="button">場地租借</button>
                  </div>
              </div>
              <div className="form-group">
                  <label  for="exampleInputEmail1">教練:</label>
                  <div className="select">
                    <select className="form-select " aria-label="Default select example">
                        <option selected>-</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                  </div>
              </div>
              <div className="form-group">
                  <label for="exampleInputEmail1">學員1:</label>
                  <div className="select">
                  <select class="form-select" aria-label="Default select example">
                      <option selected>-</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                  </select>
                  </div>
              </div>
              <div className="form-group">
                  <label for="exampleInputEmail1">學員2:</label>
                  <div className="select">
                    <select class="form-select " aria-label="Default select example">
                        <option selected>-</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                  </div>
              </div>
              <div className="form-group">
                  <label for="exampleInputEmail1">堂數:</label>
                  <div className="select">
                    <select class="form-select" aria-label="Default select example">
                        <option selected>-</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                  </div>
              </div>
              <div class="form-group">
                  <label for="exampleInputEmail1">堂薪:</label>
                  <div className="select">
                    <input type="email" class="form-select" id="exampleInputEmail1" aria-describedby="emailHelp"></input>
                  </div>
              </div>
              
              <div class="form-group">
                  <label  className="" for="exampleInputEmail1">體驗課:</label>
                  <div className=" check">
                    <div className="checkbox">
                        <input type="checkbox" class="form-check-input" id="exampleCheck1"></input>
                        <label class="form-check-label" for="exampleCheck1">是</label>
                    </div>
                    <div className="checkbox">
                        <input type="checkbox" class="form-check-input" id="exampleCheck1"></input>
                        <label class="form-check-label" for="exampleCheck1">否</label>
                    </div>
                  </div>
              </div>
              
              <div class="form-group2">
                  <label for="exampleInputPassword1">備註:</label>
                  <div className="select">
                    <textarea class="form-select" id="exampleFormControlTextarea1" rows="3"></textarea>
                  </div>  
              </div>
              <div class="form-group3">
                <button type="submit" class="btn btn-primary">新增</button>
              </div>
            </form>
         
        </div>
      </div>
    </div>
  )
}

export default From