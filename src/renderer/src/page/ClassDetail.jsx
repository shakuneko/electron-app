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

    let stuDetailData = classes.find(item => item.category === "student").stuDetail
    console.log("stuDetailData",stuDetailData);

    const stuItem = [] //找到這一row的stuID
    if (Class.student !== undefined)
    for (let i = 0; i < Class.student.length; i++) {
        stuItem.push(Class.student[i].stuID)
    }

    console.log("stuItem",stuItem)

    const results = [];
    stuItem.forEach((stuID) => {
        // 使用 stuID 在 stuDetailData 中查找相应的学生数据
        const studentData = stuDetailData.find((student) => student.stuID === stuID);
      
        if (studentData) {
          // 使用 classID 在学生数据中的 buyDetail 数组中查找相符的购买数据
          const buyDetail = studentData.buyDetail.find((detail) => detail.classID === id);
      
          if (buyDetail) {
            // 记录学生的 stuName、courseLeft 和 courseFIN
            const stuName = studentData.stuName;
            const courseLeft = buyDetail.courseLeft;
            const coursesAll = buyDetail.coursesAll;
      
            // 将结果存储在数组中
            results.push({ name:stuName, left:courseLeft, all:coursesAll });
          }
        }
    });

    console.log("results",results)


    const [_tableData, setTableData] = useState(() => detailData);
    const { tableData } = useSelector((state) => state.root.table);

    const [_classCourse, setClassCourse] = useState(() => Class);
    const { classCourse } = useSelector((state) => state.root.classCourse);

    const [_stuCourse, setStuCourse] = useState(() => stuDetailData);
    const { stuCourse } = useSelector((state) => state.root.stuCourse);
    
    const [courseLeft, setCourseLeft] = useState(Class.courseLeft);

    useEffect ( () => {
        console.log("table update data", tableData)
    }, [tableData])

    useEffect ( () => {
        console.log("class courses update", classCourse)
    }, [classCourse])

    useEffect ( () => {
        console.log("stu courses update", stuCourse)
    }, [stuCourse])

    useEffect(() => {
        dispatch(updateTableData(detailData));
      }, [])

    useEffect(() => {
        dispatch(updateClassCourseData(Class));
    }, [])

    useEffect(() => {
        dispatch(updateStuCourseData(stuDetailData));
    }, [])


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
                    <div className="classStuBox" style={{marginBottom:"10px"}}>
                        <p className="classCoachBox-item">教練：{splitData(coachNames)}</p>
                        {results.map((result, index) => (
                            <div key={index} className="classStuBox" >
                                {Class.courseType !== "團課" && (
                                <>
                                    <p className="classCoachBox-item">學員：{result.name}</p>
                                    <p className="classCoachBox-item">{result.left} / {result.all}</p>
                                </>
                                )}
                            </div>
                        ))}
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
                                stuCourse={stuCourse}
                                setStuCourse={setStuCourse}
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