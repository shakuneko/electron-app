import { Link, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import ReserveTime from '../components/ReserveTime'
import ClassDetailTable from '../components/ClassDetailTable'
import testClasses from '../json/test_class.json'
import newJason from '../json/new_class.json'
import { splitData } from '../components/TableSelectOptions'

function ClassDetail() {

    const { id } = useParams();
    const Class = newJason[0].classDetail.find(
       (x) => x.classID === id
    );
                
    const coachNames = Class.coach.map((item) =>{
        const coachNameArray = []
        coachNameArray.push(item.coachName)
        return coachNameArray
    })

    const stuNames = Class.student.map((item) =>{
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
                    <div className="classCoachBox">
                        {/* <button onClick={()=> console.log(Class)}>ppp</button> */}
                        <p className="classCoachBox-item">教練：{splitData(coachNames)}</p>
                        <p className="classCoachBox-item">學員：{splitData(stuNames)}</p>
                        <p className="classCoachBox-item">{Class.courseLeft} / {Class.coursesAll}</p>
                    </div>

                    <div className="row">
                        <div className='col-9'>
                            <div className="tabletitlebox">
                                <h3>學員預約列表</h3>
                                <div className="btnbox">
                                    {/* <div className="btnbox-item">
                                        <button type="button" className="btn btn-golden">
                                        編輯
                                        </button>
                                    </div> */}
                                    {/* <div className="btnbox-item">
                                        <button type="button" className="btn btn-danger">
                                        刪除
                                        </button>
                                    </div> */}
                                </div>
                            
                            </div>
                            <ClassDetailTable classes={Class} /> 
                        </div>
                        <div className='col-3'>
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