import React from "react";
import Navbar from "../components/Navbar";
import ClassTableDetail from "../components/ClassTableDetail";
import testClasses from '../json/test_class.json'
import newJason from '../json/new_class.json'

function ClassTable() {

    const classDetail = newJason[0].classDetail

    return (
        <div className="container-fluid">
            <div className="row form_class row-no-gutters">
                <div className="nav col-2">
                    <Navbar /> 
                </div>
                <div className='col-10 container margin-left-right'>  
                    <div className='table-container'>
                        <h1 className='title'>課程管理</h1>
                        {/* <button onClick={()=> console.log(classDetail)}>pp</button> */}
                        <ClassTableDetail classes={classDetail} newJason={newJason}/>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default ClassTable