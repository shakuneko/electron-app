import React from "react";
import Navbar from "../components/Navbar";
import { useParams } from 'react-router-dom';
import RevenueCoachDetail from '../components/RevenueCoachDetail'
import GoBackBTN from '../components/GoBackBTN'
import { columnsTotal, columnsFin, columnsLeft } from '../components/RevenueCoachColumns'
import { DateTime } from 'luxon'
import { CoachExportPDF } from '../components/ExportPdf'
import '../font/JhengHei-bold.js'
function RevenueCoach({classes}) {
    const { courseID, coachID, month } = useParams();
    console.log('courseID in revenueCoach', courseID, coachID,month)//course name - PT1v1 何軒 02月
    let coachAllData = !!classes && classes.find(
        (x) => x.courseType === courseID
    ) || {};

    let coachData = !!coachAllData && coachAllData.coaches.find(
        (x) => x.coachName === coachID
    ) || {};
    const totalData = coachData.total
    const finData = coachData.fin
    const leftData = coachData.left

    //console.log('courseData data', courseID, coachID, coachData,coachAllData, totalData, finData, leftData)
    
    console.log('selectedMonthValue in revenueCoach', month)

    //month
    const monthValue = month



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
                        <div className="mb-5">
                            <div className="title_word2 mb-3" style={{justifyContent:'space-between'}}> 
                                <div className="title_word2">
                                    <span className="money-title">{monthValue}簽約</span>
                                    <span className="money-title2 ml-5">簽約金額：$ 138,000</span>
                                </div>
                                <button
                                    type="button"
                                    className="btn btn-golden revenue-btn-mr0"
                                    onClick={() => CoachExportPDF(totalData, "X月簽約", ['購買日期','學員','堂數','金額','發票號碼'])}
                                >
                                    匯出 PDF
                                </button>
                            </div>
                            <RevenueCoachDetail classes={classes} data={totalData} columns={columnsTotal}/>
                        </div>
                        <div className="mb-5">
                            <div className="title_word2 mb-3" style={{justifyContent:'space-between'}}> 
                                <div className="title_word2">
                                    <span className="money-title">{monthValue}已核銷</span>
                                    <span className="money-title2 ml-5">核銷金額：$ 138,000 / 堂薪：$ 169.000 / 堂數：100堂</span>
                                </div>
                                <button
                                    type="button"
                                    className="btn btn-golden revenue-btn-mr0"
                                    onClick={() => CoachExportPDF(finData, "X月已核銷", ['上課日期','學員','堂數','金額','堂薪'])}
                                >
                                    匯出 PDF
                                </button>
                            </div>
                            <RevenueCoachDetail classes={classes} data={finData} columns={columnsFin}/>
                        </div>
                        <div className="mb-5">
                            <div className="title_word2 mb-3" style={{justifyContent:'space-between'}}> 
                                <div className="title_word2">
                                    <span className="money-title">{monthValue}未核銷</span>
                                </div>
                                <button
                                    type="button"
                                    className="btn btn-golden revenue-btn-mr0"
                                    onClick={() => CoachExportPDF(leftData, "X月未核銷", ['購買日期','學員','購買堂數','已核銷堂數','未核銷堂數'])}
                                >
                                    匯出 PDF
                                </button>
                            </div>
                            <RevenueCoachDetail classes={classes} data={leftData} columns={columnsLeft}/>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default RevenueCoach