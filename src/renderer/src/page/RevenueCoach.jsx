import React from "react";
import Navbar from "../components/Navbar";
import { useParams } from 'react-router-dom';

function RevenueCoach({classes}) {
    const { coachID } = useParams();
    // let courseData = !!classes && classes[0].classDetail.find(
    //    (x) => x.classID === coachID
    // ) || {};

    return (
        <div className="container-fluid">
            <div className="row form_class row-no-gutters">
                <div className="nav col-2">
                    <Navbar /> 
                </div>
                <div className='col-10 container margin-left-right'>  
                    <div className='table-container'>
                        <h1 className='title'>{coachID}</h1>

                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default RevenueCoach