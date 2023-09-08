import Navbar from '../components/Navbar'
import StudentTableDetail from '../components/StudentTableDetail';

function StudentTable({ classes }) {
    
    return (
        <div className="container-fluid" style={{backgroundColor:"white"}}>
        <div className="row form_class row-no-gutters">
            <div className="nav col-2">
                <Navbar /> 
            </div>
            <div className='col-10 container margin-left-right'>  
                <div className='table-container'>
                    <h1 className='title'>學員管理</h1>
                    <StudentTableDetail classes={classes}/>
                </div>
            </div>
            
        </div>
    </div>
    )
  }
  
  export default StudentTable