import React, { Component } from "react";
import Navbar from "../components/Navbar";
// import { useState } from "react";

class StudentForm extends Component  { 
    handleSubmit = (e) => {
      e.preventDefault();
      console.log('Submitted!');
      // props.setFormDone(true);
  }
  // const [StuForm, setStuForm] = useState({
  //   name: "",
  //   gender: "",
  //   tel: "",
  //   email: "",
  //   address: "",
  //   contact: "",
  //   relation:"",
  //   contact_tel:"",
  //   note:"",
  // });
  // const changeValue = (e) => {
  //   const name = e.target.name;
  //   console.log( e.target.name)
  
  //   setStuForm((state) => ({
  //     ...state,
  //     [name]: e.target.value
  //   }));
  // };
  start = {
    stu:{
      name: "",
      gender: "",
      tel: "",
      email: "",
      address: "",
      contact: "",
      relation:"",
      contact_tel:"",
      note:"",
    }
  }
  classstu(e,props){
    var stu = this.start.stu
    stu[props] = e.target.value
  }
  send(){
    console.log(this.start.stu);
  }
  render(){
  return (
    <div className="container-fluid">
      <div className="row form_class row-no-gutters">
        <div className="nav col-2">
          <Navbar /> 
        </div>
        <div className="col-10 new_class">
          <div className="title_word">
            <p>新增學員</p>
          </div>
            <form className="form" onSubmit={this.handleSubmit}>
                <div class="form-group">
                    <label for="exampleInputEmail1">姓名:</label>
                    <div className="select">
                    <input 
                      id="name" 
                      type="text" 
                      class="form-select" 
                      onChange={(e)=>this.classstu(e,'name')}
                      // value={StuForm}
                      // onChange={(e) => setStuForm(e.target.value)} value={StuForm}
                      // onChange={changeValue}
                    ></input>
                    </div>
                </div>
                <div class="form-group">
                    <label for="exampleInputEmail1">性別:</label>
                    <div className="select">
                    <input 
                      id="gender"
                      type="text" 
                      class="form-select" 
                      onChange={(e)=>this.classstu(e,'gender')}
                    ></input>
                    </div>
                </div>
                <div class="form-group">
                    <label for="exampleInputEmail1">電話:</label>
                    <div className="select">
                    <input 
                      id="tel" 
                      type="text" 
                      class="form-select" 
                      onChange={(e)=>this.classstu(e,'tel')}
                    ></input>
                    </div>
                </div>
                <div class="form-group">
                    <label for="exampleInputEmail1">Email:</label>
                    <div className="select">
                    <input 
                      id="email"
                      type="email" 
                      class="form-select" 
                      onChange={(e)=>this.classstu(e,'email')} 
                    ></input>
                    </div>
                </div>
                <div class="form-group">
                    <label for="exampleInputEmail1">地址:</label>
                    <div className="select">
                    <input 
                      id="address" 
                      type="text" 
                      class="form-select"  
                      onChange={(e)=>this.classstu(e,'address')} 
                    ></input>
                    </div>
                </div>
                <div class="form-group">
                    <label for="exampleInputEmail1">緊急連絡人姓名:</label>
                    <div className="select">
                    <input 
                      id="contact" 
                      type="text" 
                      class="form-select" 
                      onChange={(e)=>this.classstu(e,'contact')}
                    ></input>
                    </div>
                </div>
                <div class="form-group">
                    <label for="exampleInputEmail1">您與他的關係:</label>
                    <div className="select">
                    <input 
                      id="relation" 
                      type="text" 
                      class="form-select" 
                      onChange={(e)=>this.classstu(e,'relation')}
                    ></input>
                    </div>
                </div>
                <div class="form-group">
                    <label for="exampleInputEmail1">緊急連絡人電話:</label>
                    <div className="select">
                    <input 
                      id="contact_tel" 
                      type="text" 
                      class="form-select" 
                      onChange={(e)=>this.classstu(e,'contact_tel')}
                    ></input>
                    </div>
                </div>
                <div class="form-group2">
                    <label for="exampleInputPassword1">備註:</label>
                    <div className="select">
                    <textarea 
                      id="note" 
                      class="form-select" 
                      rows="3"
                      onChange={(e)=>this.classstu(e,'note')}
                    ></textarea>
                    </div>  
                </div>
                <div class="form-group3">
                <button type="submit" value="submit" class="btn btn-golden" onClick={()=>this.send()} >新增</button>
                
                </div>
            </form>
        </div>
      </div>
    </div>
  )
}
}
export default StudentForm