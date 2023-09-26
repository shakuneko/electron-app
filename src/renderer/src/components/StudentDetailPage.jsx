import { Link } from 'react-router-dom'
import Navbar from './Navbar'
import StudentsDetailTable from './StudentsDetailTable'
import DoneClasses from './DoneClasses'
import Collapse from 'react-bootstrap/Collapse';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import StudentDetailCollapse from './StudentDetailCollapse';
function StudentDetailPage({ stuData }) {

  const [open, setOpen] = useState(false);

  let courseLeftSum = 0

  for (let i = 0; i < stuData.buyDetail.length; i++) {
    if (i == 0) {
        courseLeftSum = stuData.buyDetail[i].courseLeft *1
    }
    else {
        courseLeftSum += stuData.buyDetail[i].courseLeft *1
    }
  }

  const stuBuyDetailData = stuData.buyDetail

  return (

      <div className="row form_class row-no-gutters">
        <div >
          <h1 className="title">學員</h1>
          <div className="classCoachBox">
            <p className="classCoachBox-item">姓名：{stuData.stuName}</p>
            <p className="classCoachBox-item">性別：{stuData.stuGender}</p>
            <p className="classCoachBox-item">剩餘堂數：{courseLeftSum}</p>
          </div>
          
        
          <>
      <Button
      className='btn btn-golden'
        onClick={() => setOpen(!open)}
        aria-controls="example-collapse-text"
        aria-expanded={open}
      >
        詳細資料
      </Button>
      <Collapse in={open}>
        <div id="example-collapse-text">
       <span> <StudentDetailCollapse stuData={stuData}/></span>
        </div>
      </Collapse>
    </>





          <div>
            {/* <button onClick={()=> console.log(stuData)}>pp</button> */}
            <DoneClasses stuData={stuData}/>
          </div>
          <StudentsDetailTable stuBuyDetailData={stuBuyDetailData} />
        </div>
      </div>

  )
}

export default StudentDetailPage