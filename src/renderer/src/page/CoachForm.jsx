import React from "react";
import Navbar from "../components/Navbar";
import { useForm } from "react-hook-form";

 
function CoachForm() {
  
   // useForm
   const {register,handleSubmit, reset} = useForm();
   const submit = (data, e)=>{
     console.log(data);
     e.target.reset();
 }

  return (
    <div className="container-fluid">
      <div className="row form_class row-no-gutters">
        <div className="nav col-2">
          <Navbar /> 
        </div>
        <div className="col-10 new_class2">
          <div className="title_word">
            <p>新增教練</p>
          </div>
            <form className="form"  onSubmit={handleSubmit(submit)}>
                <div class="form-group">
                    <label for="exampleInputEmail1">姓名:</label>
                    <div className="select">
                    <input type="text" class="form-select" id="exampleInputEmail1" {...register("name", { required: true })}></input>
                    </div>
                </div>
                <div class="form-group">
                    <label for="exampleInputEmail1">性別:</label>
                    <div className="select">
                    <input type="text" class="form-select" id="exampleInputEmail1"{...register("gender", { required: true })}></input>
                    </div>
                </div>
                <div class="form-group">
                    <label for="exampleInputEmail1">身分證字號:</label>
                    <div className="select">
                    <input type="text" class="form-select" id="exampleInputEmail1" {...register("num", { required: true })}></input>
                    </div>
                </div>
                <div class="form-group">
                    <label for="exampleInputEmail1">電話:</label>
                    <div className="select">
                    <input type="text" class="form-select" id="exampleInputEmail1" {...register("tel", { required: true })}></input>
                    </div>
                </div>
                <div class="form-group">
                    <label for="exampleInputEmail1">Email:</label>
                    <div className="select">
                    <input type="text" class="form-select" id="exampleInputEmail1" {...register("email", { required: true })}></input>
                    </div>
                </div>
                <div class="form-group">
                    <label for="exampleInputEmail1">地址:</label>
                    <div className="select">
                    <input type="text" class="form-select" id="exampleInputEmail1" {...register("address", { required: true })}></input>
                    </div>
                </div>
                <div class="form-group">
                  <label for="exampleInputEmail1">課程:</label>
                  <div className="form_btn2">
                    <button className="btn btn-outline-golden" type="button" >PT</button>
                    <button className="btn btn-outline-golden" type="button">皮拉提斯</button>
                    <button className="btn btn-outline-golden" type="button">團課</button>
                  </div>
                </div>    
                <div class="form-group">
                    <label for="exampleInputEmail1">堂薪:</label>
                    <div className="select">
                    <input type="text" class="form-select" id="exampleInputEmail1" {...register("salary", { required: true })}></input>
                    </div>
                </div>
                <div class="form-group">
                    <label for="exampleInputEmail1">帳戶:</label>
                    <div className="select">
                    <input type="text" class="form-select" id="exampleInputEmail1" {...register("account", { required: true })}></input>
                    </div>
                </div>
                <div class="form-group">
                    <label for="exampleInputEmail1">緊急連絡人姓名:</label>
                    <div className="select">
                    <input type="text" class="form-select" id="exampleInputEmail1" {...register("contactname", { required: true })}></input>
                    </div>
                </div>
                <div class="form-group">
                    <label for="exampleInputEmail1">您與他的關係:</label>
                    <div className="select">
                    <input type="text" class="form-select" id="exampleInputEmail1" {...register("contact", { required: true })}></input>
                    </div>
                </div>
                <div class="form-group">
                    <label for="exampleInputEmail1">緊急連絡人電話:</label>
                    <div className="select">
                    <input type="text" class="form-select" id="exampleInputEmail1" {...register("contacttel", { required: true })}></input>
                    </div>
                </div>
                <div class="form-group2">
                    <label for="exampleInputPassword1">備註:</label>
                    <div className="select">
                    <textarea class="form-select" id="exampleFormControlTextarea1" rows="3"{...register("note", { required: true })}></textarea>
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