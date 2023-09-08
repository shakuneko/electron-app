import React from "react";
import Navbar from "../components/Navbar";
import TableDetail from "../components/TableDetail";

function Table({classes}) {
  return (
    <div className="container-fluid" style={{backgroundColor:"white"}}>
        <div className="row form_class row-no-gutters">
            <div className="nav col-2">
                <Navbar /> 
            </div>
            <div className='col-10 container margin-left-right'>  
                <div className='table-container'>
                    <h1 className='title'>課程管理</h1>
                    <TableDetail classes={classes}/>
                </div>
            </div>
            
        </div>
    </div>
  )
}

export default Table