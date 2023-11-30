import React from "react";
import Navbar from "../components/Navbar";
import { useParams } from 'react-router-dom';
import GoBackBTN from '../components/GoBackBTN'

function RevenueCoach({classes}) {
    const { courseID, coachID } = useParams();
    let coachAllData = !!classes && classes.find(
        (x) => x.courseType === courseID
     ) || {};

    return (
        <div className="container-fluid">
            <div className="row form_class row-no-gutters">
                <div className="nav col-2">
                    <Navbar /> 
                </div>
                <div className='col-10 container margin-left-right'>  
                    <div className='table-container'>
                        <div className="title_word2"> 
                            <GoBackBTN/>
                            <h1 className='title'>{coachID}</h1>
                        </div>

                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default RevenueCoach