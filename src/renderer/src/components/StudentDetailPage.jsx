import { Link } from 'react-router-dom'
import Navbar from './Navbar'
import ReserveTime from './ReserveTime'
import StudentsDetailTable from './StudentsDetailTable'
import DoneClasses from './DoneClasses'
function StudentDetailPage({ classes }) {
  return (

      <div className="row form_class row-no-gutters">
        {/* <div className="nav col-2">
          <Navbar />
        </div> */}
        <div >
          <h1 className="title">學員</h1>

          <div className="classCoachBox">
            {/* <p className="classCoachBox-item">姓名：</p>
            <p className="classCoachBox-item">田晴軒</p>
            <p className="classCoachBox-item">性別：</p>
            <p className="classCoachBox-item">男</p>
            <p className="classCoachBox-item">剩餘堂數：</p>
            <p className="classCoachBox-item">9</p> */}
            <p className="classCoachBox-item">姓名：田晴軒</p>
            <p className="classCoachBox-item">性別：男</p>
            <p className="classCoachBox-item">剩餘堂數：9</p>
          </div>
          <div>
            <DoneClasses />
          </div>
          <StudentsDetailTable classes={classes} />
          {/* <div className="classcontainer">

            <StudentsDetailTable classes={classes} />


            <div>
              <ReserveTime />
            </div>
          </div> */}
        </div>
      </div>

  )
}

export default StudentDetailPage