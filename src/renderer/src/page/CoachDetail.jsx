import { Link } from 'react-router-dom'
import StudentsList from '../components/StudentsList'
import CoachTopBar from '../components/CoachTopBar'
import CoachDetailTable from '../components/CoachDetailTable'
import Navbar from '../components/Navbar'
//json
//import testClass from '../json/test_class.json'
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateTableData } from '../redux/Actions/saveActions';

function CoachDetail({ classes }) {
//   const onChange = (date, dateString) => {
//     console.log(date, dateString)
//   }
    const { coachID } = useParams();
    let coachDetail = !!classes && classes[2].coachDetail
    console.log("aaa:",coachID)

    const coachData = coachDetail.find(
        (x) => x.coachID === coachID
    );

    // 獲取教練所教授的課程的 classID
    const teachClassIDs = !!coachData && coachData.teachClass.map(students => students.classID);

    //使用 classID 在 classDetail 中找到相對應的課程資料
    const classDetailData = classes.find(item => item.category === "class").classDetail.filter(classData => teachClassIDs.includes(classData.classID));
    console.log(classDetailData);
  
    // 將預約資料放進去
    let reserveData = []
    classDetailData.forEach(item => {
        for (let i = 0; i < item.reserveDetail.length; i++) {
          reserveData.push(item.reserveDetail[i])
        }
    })
    console.log('預約資料:', reserveData)
    
    
    const dispatch = useDispatch();
    
    const [_tableData, setTableData] = useState(() => coachData);
    const { tableData } = useSelector((state) => state.root.table);

    useEffect(() => {
        dispatch(updateTableData(reserveData));
    }, [])
    console.log("tableData",tableData)

    return (
        <div className="container-fluid" >
            <div className="row form_class row-no-gutters">
                <div className="nav col-2">
                    <Navbar /> 
                </div>
                <div className='col-10 container margin-left-right'>  
                    <div className='table-container'>
                        <h1 className="title">教練</h1>
                        <div className="classCoachBox">
                            <p className="classCoachBox-item">教練：{coachData.coachName}</p>
                            <p className="classCoachBox-item">性別：{coachData.coachGender}</p>
                            {/* <p className="classCoachBox-item">堂薪：{coachData.salary}</p> */}
                        </div>

                        <div className="classcontainer">
                            {/* <div className='col-3'> */}
                                {/* use map to show students */}
                                {/* <StudentsList coachData={coachData}/> */}
                            {/* </div> */}
                        
                            <div className="coachdetailright">
                                <CoachTopBar 
                                    coachValue={coachData} 
                                    classes={classes}
                                />
                                <div className="chooseDateBox">
                                    
                                    <div className="DatePicksTitle">
                                        {/*<DatePicker onChange={onChange} picker="month" />*/}
                                        {/* date picker here */}
                                        <input id="startDate" class="form-control" type="month" />
                                    </div>
                                </div>

                                <div>
                                <CoachDetailTable 
                                    classes={coachData}
                                    tableData={tableData}
                                    setTableData={setTableData}
                                />
                                
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            
            </div>
        </div>
    )
}

export default CoachDetail