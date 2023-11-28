import React from "react";
import Navbar from "../components/Navbar";
import { useParams } from 'react-router-dom';

function RevenueCourseType({classes}) {
    const { courseID } = useParams();
    // let courseData = !!classes && classes[0].classDetail.find(
    //    (x) => x.classID === courseID
    // ) || {};

    return (
        <div className="container-fluid">
            <div className="row form_class row-no-gutters">
                <div className="nav col-2">
                    <Navbar /> 
                </div>
                <div className='col-10 container margin-left-right'>  
                    <div className='table-container'>
                        <h1 className='title'>{courseID}</h1>

                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default RevenueCourseType