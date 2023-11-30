import React from "react";
import Navbar from "../components/Navbar";
import { useParams } from 'react-router-dom';
import RevenueCourseDetail from '../components/RevenueCourseDetail'
import GoBackBTN from '../components/GoBackBTN'

function RevenueCourseType({classes}) {
    const { courseID } = useParams();
    let courseAllData = !!classes && classes.find(
       (x) => x.courseType === courseID
    ) || {};

    let courseData = courseAllData.coaches
    console.log('courseData data', courseData, courseAllData)
    
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
                                <h1 className='title'>{courseID}</h1>
                            </div>
                  
                        {/* <h1 className='title'>{courseID}</h1> */}
                        <RevenueCourseDetail classes={classes} courseData={courseData}/>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default RevenueCourseType