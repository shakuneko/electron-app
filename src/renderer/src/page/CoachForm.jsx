import React from "react";
import Navbar from "../components/Navbar";


function CoachForm() {
  return (
    <div className="container-fluid">
      <div className="row form_class row-no-gutters">
        <div className="nav col-2">
          <Navbar /> 
        </div>
        <div className="col-10 new_class">
          <div className="title_word">
            <p>新增教練</p>
          </div>
            <form className="form">
                <div class="form-group">
                    <label for="exampleInputEmail1">姓名:</label>
                    <div className="select">
                    <input type="email" class="form-select" id="exampleInputEmail1" aria-describedby="emailHelp"></input>
                    </div>
                </div>
                <div class="form-group">
                    <label for="exampleInputEmail1">性別:</label>
                    <div className="select">
                    <input type="email" class="form-select" id="exampleInputEmail1" aria-describedby="emailHelp"></input>
                    </div>
                </div>
                <div class="form-group">
                    <label for="exampleInputEmail1">身分證字號:</label>
                    <div className="select">
                    <input type="email" class="form-select" id="exampleInputEmail1" aria-describedby="emailHelp"></input>
                    </div>
                </div>
                <div class="form-group">
                    <label for="exampleInputEmail1">電話:</label>
                    <div className="select">
                    <input type="email" class="form-select" id="exampleInputEmail1" aria-describedby="emailHelp"></input>
                    </div>
                </div>
                <div class="form-group">
                    <label for="exampleInputEmail1">Email:</label>
                    <div className="select">
                    <input type="email" class="form-select" id="exampleInputEmail1" aria-describedby="emailHelp"></input>
                    </div>
                </div>
                <div class="form-group">
                    <label for="exampleInputEmail1">地址:</label>
                    <div className="select">
                    <input type="email" class="form-select" id="exampleInputEmail1" aria-describedby="emailHelp"></input>
                    </div>
                </div>
                <div class="form-group">
                  <label for="exampleInputEmail1">課程:</label>
                  <div className="form_btn">
                    <button className="btn btn-outline-golden" type="button">PT</button>
                    <button className="btn btn-outline-golden" type="button">皮拉提斯</button>
                    <button className="btn btn-outline-golden" type="button">團課</button>
                  </div>
                </div>    
                <div class="form-group">
                    <label for="exampleInputEmail1">堂薪:</label>
                    <div className="select">
                    <input type="email" class="form-select" id="exampleInputEmail1" aria-describedby="emailHelp"></input>
                    </div>
                </div>
                <div class="form-group">
                    <label for="exampleInputEmail1">帳戶:</label>
                    <div className="select">
                    <input type="email" class="form-select" id="exampleInputEmail1" aria-describedby="emailHelp"></input>
                    </div>
                </div>
                <div class="form-group">
                    <label for="exampleInputEmail1">緊急連絡人姓名:</label>
                    <div className="select">
                    <input type="email" class="form-select" id="exampleInputEmail1" aria-describedby="emailHelp"></input>
                    </div>
                </div>
                <div class="form-group">
                    <label for="exampleInputEmail1">您與他的關係:</label>
                    <div className="select">
                    <input type="email" class="form-select" id="exampleInputEmail1" aria-describedby="emailHelp"></input>
                    </div>
                </div>
                <div class="form-group">
                    <label for="exampleInputEmail1">緊急連絡人電話:</label>
                    <div className="select">
                    <input type="email" class="form-select" id="exampleInputEmail1" aria-describedby="emailHelp"></input>
                    </div>
                </div>
                <div class="form-group2">
                    <label for="exampleInputPassword1">備註:</label>
                    <div className="select">
                    <textarea class="form-select" id="exampleFormControlTextarea1" rows="3"></textarea>
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

export default CoachForm