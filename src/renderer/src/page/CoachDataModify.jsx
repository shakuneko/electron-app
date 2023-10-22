import React from "react";
import Navbar from '../components/Navbar'

function CoachDataModify() {
    return (
        <div className="container-fluid">
            <div className="row form_class row-no-gutters">
                <div className="nav col-2">
                    <Navbar /> 
                </div>
                <div className='col-10 container margin-left-right'>  
                    <div className='table-container'>
                        <h1 className='title'>教練資料修改</h1>
                        {/* <button onClick={()=> console.log(classes)}>pp</button> */}

                    </div>
                </div>
                
            </div>
        </div>    
    )
}

export default CoachDataModify