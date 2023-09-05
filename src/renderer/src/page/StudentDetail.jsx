import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import ReserveTime from '../components/ReserveTime'
import StudentsDetailTable from '../components/StudentsDetailTable'
import DoneClasses from '../components/DoneClasses'
function StudentDetail({ classes }) {
  return (
    <div className="container-fluid">
      <div className="row form_class row-no-gutters">
        <div className="nav col-2">
          <Navbar />
        </div>
        <div className="col-10 new_class">
          <h1 className="title">學員</h1>

          <div className="classCoachBox">
            <p className="classCoachBox-item">姓名：</p>
            <p className="classCoachBox-item">aaa</p>
            <p className="classCoachBox-item">性別：</p>
            <p className="classCoachBox-item">男</p>
            <p className="classCoachBox-item">剩餘堂數：</p>
            <p className="classCoachBox-item">9</p>
          </div>
          <div>
            <DoneClasses />
          </div>
          <div className="classcontainer">
            <div className="tabletitlebox">
              <div>
                <StudentsDetailTable classes={classes} />
              </div>
            </div>

            <div>
              <ReserveTime />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentDetail
