import { Link } from 'react-router-dom'
import StudentsList from '../components/StudentsList'
import CoachTopBar from '../components/CoachTopBar'
//import { DatePicker, Space } from "antd";
import CoachDetailTable from '../components/CoachDetailTable'
import Navbar from '../components/Navbar'
//json
import testClass from '../json/test_class.json'


function CoachDetail({ classes }) {
//   const onChange = (date, dateString) => {
//     console.log(date, dateString)
//   }

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
                        {/* <p className="classCoachBox-item">教練：</p>
                        <p className="classCoachBox-item">教練名</p>
                        <p className="classCoachBox-item">學員：</p>
                        <p className="classCoachBox-item">學員名</p>
                        <p className="classCoachBox-item">9/10</p> */}
                        <p className="classCoachBox-item">教練：</p>
                        <p className="classCoachBox-item">性別：男</p>
                        <p className="classCoachBox-item">堂薪：600</p>
                    </div>

                    <div className="classcontainer">
                        <div className='col-3'>
                            <StudentsList />
                        </div>
                       
                        <div className="coachdetailright col-9">
                            <CoachTopBar coachValue={testClass} />
                            <div className="chooseDateBox">
                                
                                <div className="DatePicksTitle">
                                    {/*<DatePicker onChange={onChange} picker="month" />*/}
                                    {/* date picker here */}
                                    <input id="startDate" class="form-control" type="month" />
                                </div>
                                <div className="btnbox-item">
                                    <button type="button" className="btn btn-danger">
                                        刪除
                                    </button>
                                </div>
                            </div>

                            <div>
                            <CoachDetailTable classes={classes} />
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