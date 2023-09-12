import { Link } from 'react-router-dom'
import Navbar from './Navbar'
import StudentsDetailTable from './StudentsDetailTable'
import DoneClasses from './DoneClasses'
function StudentDetailPage({ classes }) {
  return (

      <div className="row form_class row-no-gutters">
        <div >
          <h1 className="title">學員</h1>
          <div className="classCoachBox">
            <p className="classCoachBox-item">姓名：{classes.student.stuName}</p>
            <p className="classCoachBox-item">性別：{classes.student.stuGender}</p>
            <p className="classCoachBox-item">剩餘堂數：{classes.student.courseLeft}</p>
          </div>
          <div>
            <DoneClasses />
          </div>
          {/* <StudentsDetailTable classes={classes} /> */}
        </div>
      </div>

  )
}

export default StudentDetailPage