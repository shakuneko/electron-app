import React from "react";
import Navbar from "../components/Navbar";
import ClassTableDetail from "../components/ClassTableDetail";
import testClasses from '../json/test_class.json'

function ClassTable() {

  return (
    <div className="container-fluid">
        <div className="row form_class row-no-gutters">
            <div className="nav col-2">
                <Navbar /> 
            </div>
            <div className='col-10 container margin-left-right'>  
                <div className='table-container'>
                    <h1 className='title'>課程管理</h1>
                    {/* <button onClick={()=> console.log(testClasses)}>pp</button> */}
                    <ClassTableDetail classes={testClasses}/>
                </div>
            </div>
            
        </div>
    </div>
  )
}

export default ClassTable