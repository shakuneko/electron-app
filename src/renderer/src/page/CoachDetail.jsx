import { Link } from 'react-router-dom'
import StudentsList from '../components/StudentsList'
import CoachTopBar from '../components/CoachTopBar'
//import { DatePicker, Space } from "antd";
import CoachDetailTable from '../components/CoachDetailTable'
import Navbar from '../components/Navbar'
//json
//import testClass from '../json/test_class.json'
import { useParams } from 'react-router-dom';

function CoachDetail({ classes }) {
//   const onChange = (date, dateString) => {
//     console.log(date, dateString)
//   }
const { id } = useParams();
console.log("aaa:",id)
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
                        <p className="classCoachBox-item">教練：{classes[id].coach.coachName}</p>
                        <p className="classCoachBox-item">性別：{classes[id].coach.coachGender}</p>
                        <p className="classCoachBox-item">堂薪：{classes[id].coach.salary}</p>
                    </div>

                    <div className="classcontainer">
                        <div className='col-3'>
                            {/* use map to show students */}
                            <StudentsList students={classes[id]}/>
                        </div>
                       
                        <div className="coachdetailright col-9">
                            <CoachTopBar coachValue={classes} />
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
                            <CoachDetailTable classes={classes[id]} />
                            
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