import { Link, useParams } from 'react-router-dom'
import React, {  useState, useEffect } from 'react';
import Navbar from '../components/Navbar'
import { useDispatch, useSelector } from 'react-redux';
import ReserveTime from '../components/ReserveTime'
import ClassDetailTable from '../components/ClassDetailTable'
// import newJason from '../json/new_class.json'
import { splitData } from '../components/TableSelectOptions'
import { updateTableData, updateClassCourseData, updateStuCourseData } from '../redux/Actions/saveActions';

function ClassDetail({classes}) {
    console.log('ClassDetail', classes)
    const { id } = useParams();

    let Class = !!classes && classes[0].classDetail.find(
       (x) => x.classID === id
    ) || {};

    const dispatch = useDispatch();

    let detailData = []
    if (Class.reserveDetail !== undefined)
    for (let i = 0; i < Class.reserveDetail.length; i++) {
        detailData.push(Class.reserveDetail[i])

    }

    const [_tableData, setTableData] = useState(() => detailData);
    const { tableData } = useSelector((state) => state.root.table);

    const [_classCourse, setClassCourse] = useState(() => Class);
    const { classCourse } = useSelector((state) => state.root.classCourse);
    
    const [courseLeft, setCourseLeft] = useState(Class.courseLeft);


    useEffect ( () => {
        console.log("table update data", tableData)
    }, [tableData])

    useEffect ( () => {
        console.log("class courses update", classCourse)
    }, [classCourse])

    useEffect(() => {
        dispatch(updateTableData(detailData));
      }, [])

    useEffect(() => {
        dispatch(updateClassCourseData(Class));
    }, [])

    // useEffect(() => {
    //     dispatch(updateStuCourseData(filteredStudents));
    // }, [])


    let coachNames = []
    if(Class.coach !== undefined)
     coachNames = Class.coach.map((item) =>{
        const coachNameArray = []
        coachNameArray.push(item.coachName)
        return coachNameArray
    })

    let stuNames = []
    if(Class.student !== undefined)
    stuNames = Class.student.map((item) =>{
        const coachNameArray = []
        coachNameArray.push(item.stuName)
        return coachNameArray
    })

  return (
    <div className="container-fluid" >
        <div className="row form_class row-no-gutters">
            <div className="nav col-2">
                <Navbar />
            </div>
            <div className='col-10 container margin-left-right'>
                <div className='table-container'>
                    <h1 className="title">課程</h1>
                    <div className="classCoachBox">
                        <p className="classCoachBox-item">教練：{splitData(coachNames)}</p>
                        <p className="classCoachBox-item">學員：{splitData(stuNames)}</p>
                        <p className="classCoachBox-item">{Class.courseLeft} / {Class.coursesAll}</p>
                        {/* <button onClick={()=> console.log(classes)}>pp</button> */}
                    </div>

                    <div className="row">
                        <div className='col-9'>
                            <div className="tabletitlebox">
                                <h3>學員預約列表</h3>
                            </div>
                            <ClassDetailTable
                                // stuCourse={stuCourse}
                                classCourse={classCourse}
                                classes={classes}
                                courseLeft={courseLeft}
                                setCourseLeft={setCourseLeft}
                                tableData={tableData}
                                setTableData={setTableData}
                                setClassCourse={setClassCourse}

                                 />

                        </div>
                        <div className='col-3'>
                            <ReserveTime
                            classes={Class}
                            tableData={tableData}
                            setTableData={setTableData}
                            />
                        </div>
                    </div>

                </div>
            </div>

        </div>
    </div>

  )
}

export default ClassDetail