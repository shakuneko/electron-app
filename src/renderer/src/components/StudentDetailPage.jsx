import { Link } from 'react-router-dom'
import Navbar from './Navbar'
import StudentsDetailTable from './StudentsDetailTable'
import DoneClasses from './DoneClasses'
import Collapse from 'react-bootstrap/Collapse'
import Button from 'react-bootstrap/Button'
import { useState } from 'react'
import StudentDetailCollapse from './StudentDetailCollapse'
function StudentDetailPage({ stuData }) {
  const [open, setOpen] = useState(false)

  let ptCourseLeftSum = 0
  let pilaCourseLeftSum = 0
  let groupCourseLeftSum = 0
  let massageCourseLeftSum = 0
  let rentCourseLeftSum = 0
  let proPilaCourseLeftSum = 0
  let exCourseLeftSum = 0

  for (let i = 0; i < stuData.buyDetail.length; i++) {
    if (stuData.buyDetail[i].exCourse == '是') {
      exCourseLeftSum += stuData.buyDetail[i].courseLeft * 1
    }
    if (stuData.buyDetail[i].courseType == 'PT') {
      ptCourseLeftSum += stuData.buyDetail[i].courseLeft * 1
    }
    else if (stuData.buyDetail[i].courseType == '皮拉提斯') {
      pilaCourseLeftSum += stuData.buyDetail[i].courseLeft * 1
    }
    // else if (stuData.buyDetail[i].courseType == '基皮') {
    //   pilaCourseLeftSum += stuData.buyDetail[i].courseLeft * 1
    // }
    // else if (stuData.buyDetail[i].courseType == '高皮') {
    //   proPilaCourseLeftSum += stuData.buyDetail[i].courseLeft * 1
    // }
    else if (stuData.buyDetail[i].courseType == '團課') {
      groupCourseLeftSum += stuData.buyDetail[i].courseLeft * 1
    }
    else if (stuData.buyDetail[i].courseType == '運動按摩') {
      massageCourseLeftSum += stuData.buyDetail[i].courseLeft * 1
    }
    // else if (stuData.buyDetail[i].courseType.substring(0, 3) == '體驗課') {
    //   exCourseLeftSum += stuData.buyDetail[i].courseLeft * 1
    // }
    else if (stuData.buyDetail[i].courseType == '場地租借') {
      rentCourseLeftSum += stuData.buyDetail[i].courseLeft * 1
    }
  }

  const stuBuyDetailData = stuData.buyDetail

  return (
    <div className="row form_class row-no-gutters">
      <div>
        <h1 className="title">學員</h1>
        <div className="classCoachBox">
          <div className="classCoachBox">
            <p className="classCoachBox-item">姓名：{stuData.stuName}</p>
            <p className="classCoachBox-item">性別：{stuData.stuGender}</p>
            {ptCourseLeftSum != 0 ? (
               <p className="classCoachBox-item">PT 剩餘堂數：{ptCourseLeftSum}</p>
            ) : null}
            {pilaCourseLeftSum != 0 ? (
               <p className="classCoachBox-item">皮拉提斯剩餘堂數：{pilaCourseLeftSum}</p>
            ) : null}
            {/* {pilaCourseLeftSum != 0 ? (
               <p className="classCoachBox-item">基皮剩餘堂數：{pilaCourseLeftSum}</p>
            ) : null}
            {proPilaCourseLeftSum != 0 ? (
               <p className="classCoachBox-item">高皮剩餘堂數：{proPilaCourseLeftSum}</p>
            ) : null} */}
            {groupCourseLeftSum != 0 ? (
               <p className="classCoachBox-item">團課剩餘堂數：{groupCourseLeftSum}</p>
            ) : null}
            {massageCourseLeftSum != 0 ? (
               <p className="classCoachBox-item">運動按摩剩餘堂數：{massageCourseLeftSum}</p>
            ) : null}
            {exCourseLeftSum != 0 ? (
               <p className="classCoachBox-item">體驗課剩餘堂數：{exCourseLeftSum}</p>
            ) : null}
            {rentCourseLeftSum != 0 ? (
               <p className="classCoachBox-item">場地租借剩餘堂數：{rentCourseLeftSum}</p>
            ) : null}
            {rentCourseLeftSum == 0 
              && ptCourseLeftSum == 0 
              && pilaCourseLeftSum == 0 
              && groupCourseLeftSum == 0 
              && massageCourseLeftSum == 0
              && exCourseLeftSum == 0 ? (
               <p className="classCoachBox-item">尚未購買課程</p>
            ) : null}
          </div>
          <div
            style={{
              marginLeft: 'auto',
              display: 'flex',
              alignItems: 'space-between'
            }}
          >
            <Button
              className="btn btn-golden"
              onClick={() => setOpen(!open)}
              aria-controls="example-stu-collapse-text"
              aria-expanded={open}
            >
              詳細資料
            </Button>
          </div>
        </div>
        <Collapse in={open}>
          <div id="example-stu-collapse-text">
            <span>
              {' '}
              <StudentDetailCollapse stuData={stuData} />
            </span>
          </div>
        </Collapse>

        <div>
          {/* <button onClick={()=> console.log(stuData)}>pp</button> */}
          <DoneClasses stuData={stuData} />
        </div>
        <StudentsDetailTable stuBuyDetailData={stuBuyDetailData} />
      </div>
    </div>
  )
}

export default StudentDetailPage
