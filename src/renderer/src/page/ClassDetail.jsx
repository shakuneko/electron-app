import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import ReserveTime from '../components/ReserveTime'
import CoachDetailTable from '../components/CoachDetailTable'

function ClassDetail({ classes }) {
  return (
    <div className="container-fluid">
      <div className="row form_class row-no-gutters">
        <div className="colSet">
          <div className="nav col-2">
            <Navbar />
          </div>
          <div className="col-10 new_class">
            <h1 className='title'>課程</h1>

            <div className="classCoachBox">
              <p className="classCoachBox-item">教練：</p>
              <p className="classCoachBox-item">教練名</p>
              <p className="classCoachBox-item">學員：</p>
              <p className="classCoachBox-item">學員名</p>
              <p className="classCoachBox-item">9/10</p>
            </div>
            <div className="classcontainer">
              <div className="tabletitlebox">
                
                <div>
                  <CoachDetailTable classes={classes} />
                </div>
              </div>

              <div>
                <ReserveTime />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClassDetail
