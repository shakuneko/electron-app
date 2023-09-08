import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import ReserveTime from '../components/ReserveTime'
import ClassDetailTable from '../components/ClassDetailTable'

function ClassDetail({ classes }) {
  return (
    <div className="container-fluid">
      <div className="row form_class row-no-gutters">
       
          <div className="nav col-2">
            <Navbar />
          </div>
          <div className="col-10 container margin-left-right">
            <div className='detailboxright'>
            <h1 className="title">課程</h1>

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
                  <div className="tabletitlebox">
                    <h3>學員預約列表</h3>
                    <div className="btnbox">
                      <div className="btnbox-item">
                        <button type="button" className="btn btn-golden">
                          編輯
                        </button>
                      </div>
                      <div className="btnbox-item">
                        <button type="button" className="btn btn-secondary">
                          刪除
                        </button>
                      </div>
                    </div>
                  </div>

                  <ClassDetailTable classes={classes} />
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
