import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import StudentDetailPage from '../components/StudentDetailPage'
function StudentDetail({ classes }) {
  return (
    <div className="container-fluid" >
        <div className="row form_class row-no-gutters">
            <div className="nav col-2">
                <Navbar /> 
            </div>
            <div className='col-10 container margin-left-right'>  
                <div className='table-container'>
                    <StudentDetailPage classes={classes} />
                </div>
            </div>
            
        </div>
    </div>
  )
}

export default StudentDetail