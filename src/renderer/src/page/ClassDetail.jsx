import { Link, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import ReserveTime from '../components/ReserveTime'
import ClassDetailTable from '../components/ClassDetailTable'
import testClasses from '../json/test_class.json'

function ClassDetail() {

    const { id } = useParams();
    const testClass = testClasses.find(
       (x) => x.id === id
    );

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
                        {/* <p className="classCoachBox-item">教練：</p>
                        <p className="classCoachBox-item">教練名</p>
                        <p className="classCoachBox-item">學員：</p>
                        <p className="classCoachBox-item">學員名</p>
                        <p className="classCoachBox-item">9/10</p> */}
                        <p className="classCoachBox-item">教練：教練名</p>
                        <p className="classCoachBox-item">學員：學員名</p>
                        <p className="classCoachBox-item">9/10</p>
                    </div>

                    <div className="row">
                        <div className='col-9'>
                            <div className="tabletitlebox">
                                <h3>學員預約列表</h3>
                                <div className="btnbox">
                                    <div className="btnbox-item">
                                        <button type="button" className="btn btn-golden">
                                        編輯
                                        </button>
                                    </div>
                                    <div className="btnbox-item">
                                        <button type="button" className="btn btn-danger">
                                        刪除
                                        {testClasses[0].id}
                                        </button>
                                    </div>
                                </div>
                            
                            </div>
                            <ClassDetailTable testClass={testClass} /> 
                        </div>
                        <div className='col-3'>
                            <ReserveTime />
                            {testClass.id}
                        </div>
                    </div>

                </div>
            </div>
        
        </div>
    </div>
    
  )
}

export default ClassDetail