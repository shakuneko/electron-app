import React from "react";
import Navbar from "../components/Navbar";
import { useParams } from 'react-router-dom';
import RevenueCourseDetail from '../components/RevenueCourseDetail'
import GoBackBTN from '../components/GoBackBTN'
import { CourseTyprExportPDF } from '../components/ExportPdf'
import '../font/JhengHei-bold.js'
function RevenueCourseType({classes}) {
    const { courseID, month } = useParams();
    let courseAllData = !!classes && classes.find(
       (x) => x.courseType === courseID
    ) || {};
    
    let monthValue = month
    console.log('selectedMonthValue', monthValue) 

    let courseData = courseAllData.coaches
    
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
                        <div className='revenue-export-btn' style={{display:"flex", padding:"0px"}}>
                        <button
                            type="button"
                            className="btn btn-golden revenue-btn-mr0"
                            onClick={() => CourseTyprExportPDF(courseData, `${courseID}`,monthValue)}
                        >
                            匯出 PDF
                        </button>
                            {/* <button type="button" className="btn btn-golden revenue-btn-mr0">匯出 PDF</button>  */}
                        </div>
                        {/* <h1 className='title'>{courseID}</h1> */}
                        <RevenueCourseDetail classes={classes} courseData={courseData} courseID={courseID} monthValue={monthValue}/>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default RevenueCourseType