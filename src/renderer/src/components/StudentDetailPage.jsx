import { Link } from 'react-router-dom'
import Navbar from './Navbar'
import StudentsDetailTable from './StudentsDetailTable'
import DoneClasses from './DoneClasses'
function StudentDetailPage({ classes }) {

  let courseLeftSum = 0

  for (let i = 0; i < classes.length; i++) {
    if (i == 0) {
        courseLeftSum = classes[i].student.courseLeft *1
    }
    else {
        courseLeftSum += classes[i].student.courseLeft *1
    }
}

  return (

      <div className="row form_class row-no-gutters">
        <div >
          <h1 className="title">學員</h1>
          <div className="classCoachBox">
            <p className="classCoachBox-item">姓名：{classes[0].student.stuName}</p>
            <p className="classCoachBox-item">性別：{classes[0].student.stuGender}</p>
            <p className="classCoachBox-item">剩餘堂數：{courseLeftSum}</p>
          </div>
          <div>
            {/* <button onClick={()=> console.log(luluArray)}>pp</button>
            {mergedList[3]} */}
            <DoneClasses />
          </div>
          <StudentsDetailTable classes={classes} />
        </div>
      </div>

  )
}

export default StudentDetailPage